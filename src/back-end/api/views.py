from django.conf import settings
from pymongo import MongoClient
from django.http import HttpResponse,HttpResponseBadRequest,JsonResponse
from bson import ObjectId
from datetime import datetime
from db_connection import connect_mongodb
import json 
# def connect_mongodb():
#     config = settings.DMONGODB_DATABASES['default']
#     client = MongoClient(host=config['host'],
#                         #  username=config['username'],
#                         #  password=config['password'],
#                          )

#     db = client['sample_mflix']
#     return db


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)  # Convert ObjectId to string
        if isinstance(o, datetime):
            return o.isoformat()  # Convert datetime to ISO 8601 string
        return json.JSONEncoder.default(self, o)

# Assuming 'documents' is a list of MongoDB documents

def mongo_test(request):
    db = connect_mongodb()
    # Perform some MongoDB operations, e.g., find one document
    collection = db['booking']
    documents = list(collection.find().limit(10))

    json_data = json.dumps(documents, cls=JSONEncoder, indent=4)


    return HttpResponse(json_data,content_type='application/json')


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
    return JsonResponse({'_id': str(result.inserted_id)}, status=201)


 
def booking_find(request):
    
    return HttpResponse("",content_type='application/json')

 
def booking_update(request):
    
    return HttpResponse("",content_type='application/json')

 
def booking_delete(request):
    
    return HttpResponse("",content_type='application/json')


