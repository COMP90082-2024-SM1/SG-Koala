from django.http import HttpResponse,HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound

from db_connection import connect_mongodb
from api.serializers.checklist_serializer import ChecklistSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from bson.objectid import ObjectId



class ChecklistView(APIView):
    def get(self, request, *args, **kwargs):
        db = connect_mongodb()
        # Perform some MongoDB operations, e.g., find one document
        collection = db['checklists']
         # Query all documents in the MongoDB collection
        documents = list(collection.find())
        serializer = ChecklistSerializer(documents, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        collection = connect_mongodb()['checklists']
        # Parse the request body to dict
        serializer = ChecklistSerializer(data=request.data)
        if serializer.is_valid():
            # Insert data into MongoDB
            new_data = serializer.validated_data
            result = collection.insert_one(new_data)
            # Optionally add the MongoDB ID to the response
            new_data['_id'] = str(result.inserted_id)
            # response_data = json.dumps(new_data, default=str)
            return Response(new_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ChecklistViewID(APIView):
    def get_object(self, id):
        # Retrieve the item from MongoDB by its ID
        try:
            db = connect_mongodb()
            collection = db['checklists']
            item = collection.find_one({'_id': ObjectId(id)})
            return item
        except:
            return None
        
    def get(self, request, id):
        if 'id' not in self.kwargs:
            return HttpResponseNotAllowed('GET method expects an id')
        db = connect_mongodb()
       
        #object_id = self.kwargs['id']
        document = self.get_object(id)
        
        if document:
            serializer = ChecklistSerializer(document)
            return Response(serializer.data)
        else:
            return HttpResponseNotFound('Checklist not found')
    
    def put(self, request, id):
        if 'id' not in self.kwargs:
            return HttpResponseNotAllowed('PUT method expects an id')
        
        db = connect_mongodb()
        collection = db['checklists']
        #object_id = self.kwargs['id']
        document = self.get_object(id)
        # no matching document in mongodb
        if not document:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ChecklistSerializer(document, data=request.data)
        if serializer.is_valid():
            # Insert data into MongoDB
            new_data = serializer.validated_data
            object_id = self.kwargs['id']
       
            collection.update_one({'_id': ObjectId(id)}, {'$set': new_data})
            
            new_data['_id'] = object_id
            # response_data = json.dumps(new_data, default=str)
            return Response(new_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
       
    
    def delete(self, request, id):

        db = connect_mongodb()
        collection = db['checklists']
        #object_id = self.kwargs['id']
        document = self.get_object(id)        
        if not document:
            return Response(status=status.HTTP_404_NOT_FOUND)
        # Delete the item from MongoDB
        collection.delete_one({'_id': ObjectId(id)})
        return Response(status=status.HTTP_204_NO_CONTENT)
        
