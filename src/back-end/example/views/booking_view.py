
from django.http import *
from bson import ObjectId
from datetime import datetime
from ..serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from db_connection import connect_mongodb
from api.utils import send_booking_ref_to_client
import json 

# booking rest api
class BookingView(APIView):
    def get(self, request, *args, **kwargs):
        db = connect_mongodb()
        booking_collection = db['booking']
        checklist_collection = db['checklist']
        school_collection = db['school']
        #send_booking_ref_to_client("123", ['leonali0329@gmail.com'])
        
        # Fetch all booking documents
        booking_documents = list(booking_collection.find())
        
        # Enrich each booking document with checklist and school details
        enriched_bookings = []
        for booking in booking_documents:
            # If checklist_id exists, fetch the checklist document
            if 'checklist_id' in booking and booking['checklist_id']:
                checklist_id = ObjectId(booking['checklist_id'])
                checklist_document = checklist_collection.find_one({'_id': checklist_id})
                if checklist_document:
                    # Include the checklist details directly in the booking document
                    booking['checklist'] = checklist_document
            
            # If school_id exists, fetch the school document
            if 'school_id' in booking and booking['school_id']:
                school_id = ObjectId(booking['school_id'])
                school_document = school_collection.find_one({'_id': school_id})
                if school_document:
                    # Include the school details directly in the booking document
                    booking['school'] = school_document
            
            enriched_bookings.append(booking)
        
        # Serialize the enriched booking documents
        serializer = BookSerializer(enriched_bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        db = connect_mongodb()
        booking_collection = db['booking']
        checklist_collection = db['checklist']
        school_collection = db['school']
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            # Insert data into MongoDB
            new_data = serializer.validated_data
            if 'checklist_id' in request.data:
                checklist_id = ObjectId(request.data['checklist_id'])
                new_data['checklist_id'] = checklist_id
                checklist_document = checklist_collection.find_one({'_id': checklist_id})
                if not checklist_document:
                    return Response({"error":"checklist not found"}, status=status.HTTP_404_NOT_FOUND)
            if 'school_id' in request.data:
                school_id = ObjectId(request.data['school_id'])
                new_data['school_id'] = school_id
                school_document = school_collection.find_one({'_id': school_id})
                if not school_document:
                    return Response({"error":"school not found"}, status=status.HTTP_404_NOT_FOUND)

            result = booking_collection.insert_one(new_data)
            # print(result)
            # Optionally add the MongoDB ID to the response
            new_data['_id'] = str(result.inserted_id)
            response_data = {**new_data, '_id': str(result.inserted_id)}
            # Convert ObjectIds to strings for JSON serialization
            if 'school_id' in response_data:
                response_data['checklist_id'] = str(response_data['checklist_id'])
            if 'school_id' in response_data:
                response_data['school_id'] = str(response_data['school_id'])
            if booking_collection.find_one({'_id': result.inserted_id}):
                school_id = ObjectId(request.data['school_id'])
                school_email = school_collection.find_one({'_id': school_id})['email']
                # change to school email
                send_booking_ref_to_client(str(result.inserted_id), [school_email], 
                                           "We have received your booking request. You will recive a new email when the team confirms the booking.",
                                           "Science Gallery Received Booking Request")

            # response_data = json.dumps(new_data, default=str)
            return Response(response_data, status=status.HTTP_201_CREATED)
        print("Validation Failed:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingViewID(APIView):
    print("????")
    def get(self, request, *args, **kwargs):
        if 'id' not in kwargs:
            return Response({'error': 'PUT method expects an id'},status=status.HTTP_405_METHOD_NOT_ALLOWED)
        db = connect_mongodb()
        booking_collection = db['booking']
        checklist_collection = db['checklist']
        school_collection = db['school']
        
        # Find the booking document by _id
        booking_id = ObjectId(kwargs['id'])
        booking_document = booking_collection.find_one({'_id': booking_id})
        
        if booking_document:
            # If checklist_id exists, fetch the checklist document
            if 'checklist_id' in booking_document:
                checklist_id = ObjectId(booking_document['checklist_id'])
                checklist_document = checklist_collection.find_one({'_id': checklist_id})
                booking_document['checklist'] = checklist_document  # Embed the checklist document
            
            # If school_id exists, fetch the school document
            if 'school_id' in booking_document:
                school_id = ObjectId(booking_document['school_id'])
                school_document = school_collection.find_one({'_id': school_id})
                booking_document['school'] = school_document  # Embed the school document
            
            # Serialize the enriched booking document
            serializer = BookSerializer(booking_document)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # If the booking document doesn't exist, return an error
        return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, *args, **kwargs):
        if 'id' not in kwargs:
            return Response({'error': 'PUT method expects an id'},status=status.HTTP_405_METHOD_NOT_ALLOWED)
        db = connect_mongodb()
        collection = db['booking']
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            # Insert data into MongoDB
            new_data = serializer.validated_data
            booking_document = collection.find_one({'_id': ObjectId(kwargs['id'])})

            update_result = collection.update_one({'_id': ObjectId(kwargs['id'])}, {'$set': new_data})
            if update_result.matched_count == 0:
                return Response({'error': 'No record found with the specified ID'},status=status.HTTP_404_NOT_FOUND)
            # send confirmation email to client
            
            school_collection = db['school']
           
            if booking_document['status'] != new_data['status'] and new_data['status'] == 'Processing' and  booking_document['status'] == 'Pending':
                school_id = ObjectId(request.data['school_id'])
                school_email = school_collection.find_one({'_id': school_id})['email']
                # change to school email
                send_booking_ref_to_client(kwargs['id'], [school_email], 
                                           "Thank you for your patience. We have confirmed your booking.",
                                           "Science Gallery Booking Confirmation")
        
            return Response({'status': 'success', 'id': kwargs['id'], 'updated': update_result.modified_count}, status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        if 'id' not in kwargs:
            return Response({'error': 'DELETE method expects an id'},status=status.HTTP_405_METHOD_NOT_ALLOWED)

        db = connect_mongodb()
        collection = db['booking']
        booking_document = collection.find_one({'_id': ObjectId(kwargs['id'])})

        if booking_document:
            school_id = booking_document['school_id']
            school_collection = db['school']
            school_email = school_collection.find_one({'_id': ObjectId(school_id)})['email']
            

        delete_result = collection.delete_one({'_id': ObjectId(kwargs['id'])})

        if delete_result.deleted_count == 0:
            return Response({'error': 'No record found with the specified ID'},status=status.HTTP_404_NOT_FOUND)
        else:
            send_booking_ref_to_client(kwargs['id'], [school_email], 
                                           "Your booking has beeen canceled, please contact Science Gallery team if you have any questions.",
                                           "Science Gallery Booking Cancellation")
        return Response({'status': 'success', 'id': kwargs['id']}, status=status.HTTP_200_OK)


