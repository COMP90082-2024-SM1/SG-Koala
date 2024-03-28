from django.conf import settings
from django.http import HttpResponse,HttpResponseBadRequest,JsonResponse

from db_connection import connect_mongodb
from .serializers import TestSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

import json 



@api_view(['POST'])
def create_booking(request):
    db = connect_mongodb()
    collection = db['test']
    if request.method == 'POST':
        serializer = TestSerializer(data=request.data)
        if serializer.is_valid():
            # Insert data into MongoDB
            new_data = serializer.validated_data
            result = collection.insert_one(new_data)
            # Optionally add the MongoDB ID to the response
            new_data['_id'] = str(result.inserted_id)
            # response_data = json.dumps(new_data, default=str)
            return Response(new_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
    
# Assuming 'documents' is a list of MongoDB documents
@api_view(['GET'])
def get_bookings(request):
    db = connect_mongodb()
    collection = db['test']
    if request.method == 'GET':
        # Query all documents in the MongoDB collection
        documents = list(collection.find().limit(10))
        serializer = TestSerializer(documents, many=True)
        return Response(serializer.data)

"""         

def booking(request):
    collection = connect_mongodb()['booking']

    # Parse the request body to dict
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponseBadRequest("Invalid JSON")

    # Insert the record
    result = collection.insert_one(data)
    
    # Return the id of the inserted document
    return JsonResponse({'_id': str(result.inserted_id)}, status=201) """


 
def get_one_booking(request):
    
    return HttpResponse("",content_type='application/json')

 
def update_booking(request):
    
    return HttpResponse("",content_type='application/json')

 
def delete_booking(request):
    
    return HttpResponse("",content_type='application/json')






