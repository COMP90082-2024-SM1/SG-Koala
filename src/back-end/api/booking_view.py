
from django.views import View
from django.http import *
from bson import ObjectId
from datetime import datetime
from db_connection import connect_mongodb
import json 

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)  # Convert ObjectId to string
        if isinstance(o, datetime):
            return o.isoformat()  # Convert datetime to ISO 8601 string
        return json.JSONEncoder.default(self, o)

class BookingView(View):
    def get(self, request, *args, **kwargs):
        db = connect_mongodb()
        # Perform some MongoDB operations, e.g., find one document
        collection = db['booking']
        documents = list(collection.find())
        json_data = json.dumps(documents, cls=JSONEncoder, indent=4)
        return HttpResponse(json_data,content_type='application/json')
    
    def post(self, request, *args, **kwargs):
        collection = connect_mongodb()['booking']
        # Parse the request body to dict
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return HttpResponseBadRequest("Invalid JSON")
        result = collection.insert_one(data)
        return JsonResponse({'_id': str(result.inserted_id)}, status=201)

class BookingViewID(View):
    def get(self, request, *args, **kwargs):
        if 'id' not in kwargs:
            return HttpResponseNotAllowed('PUT method expects an id') 
        db = connect_mongodb()
        collection = db['booking']
        document = collection.find_one({'_id': ObjectId(kwargs['id'])})
        if document:
            json_data = json.dumps(document, cls=JSONEncoder, indent=4)
            return HttpResponse(json_data, content_type='application/json')
        else:
            return JsonResponse({'error': 'Booking not found'}, status=404)
    
    def put(self, request, *args, **kwargs):
        if 'id' not in kwargs:
            return HttpResponseNotAllowed('PUT method expects an id')

        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        db = connect_mongodb()
        collection = db['booking']
        update_result = collection.update_one({'_id': ObjectId(kwargs['id'])}, {'$set': data})

        if update_result.matched_count == 0:
            return HttpResponseNotFound('No record found with the specified ID')

        return JsonResponse({'status': 'success', 'id': kwargs['id'], 'updated': update_result.modified_count})
    
    def delete(self, request, *args, **kwargs):
        if 'id' not in kwargs:
            return HttpResponseNotAllowed('DELETE method expects an id')

        db = connect_mongodb()
        collection = db['booking']
        delete_result = collection.delete_one({'_id': ObjectId(kwargs['id'])})

        if delete_result.deleted_count == 0:
            return HttpResponseNotFound('No record found with the specified ID')

        return JsonResponse({'status': 'success', 'id': kwargs['id']})

