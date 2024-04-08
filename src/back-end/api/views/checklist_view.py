from django.http import HttpResponse,HttpResponseBadRequest,JsonResponse

from db_connection import connect_mongodb
from api.serializers.checklist_serializer import checklistSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView



@api_view(['POST'])
def create_checklist_template(request):
    db = connect_mongodb()

    collection = db['checklists']
   
    serializer = checklistSerializer(data=request.data)
    if serializer.is_valid():
        # Insert data into MongoDB
        new_data = serializer.validated_data
        result = collection.insert_one(new_data)
        # Optionally add the MongoDB ID to the response
        new_data['_id'] = str(result.inserted_id)
        # response_data = json.dumps(new_data, default=str)
        return Response(new_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChecklistView(APIView):
    def get(self, request, *args, **kwargs):
        db = connect_mongodb()
        # Perform some MongoDB operations, e.g., find one document
        collection = db['checklists']
         # Query all documents in the MongoDB collection
        documents = list(collection.find().limit(10))
        serializer = checklistSerializer(documents, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        collection = connect_mongodb()['checklists']
        # Parse the request body to dict
        serializer = checklistSerializer(data=request.data)
        if serializer.is_valid():
            # Insert data into MongoDB
            new_data = serializer.validated_data
            result = collection.insert_one(new_data)
            # Optionally add the MongoDB ID to the response
            new_data['_id'] = str(result.inserted_id)
            # response_data = json.dumps(new_data, default=str)
            return Response(new_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)