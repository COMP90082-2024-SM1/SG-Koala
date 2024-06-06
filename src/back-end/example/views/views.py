# example/views.py
from datetime import datetime
import json
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login,authenticate,logout
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from db_connection import connect_mongodb
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password

def index(request):
    now = datetime.now()
    html = f'''
    <html>
        <body>
            <h1>Hello from Vercel!</h1>
            <p>The current time is { now }.</p>
        </body>
    </html>
    '''
    return HttpResponse(html)


@csrf_exempt
def login_method(request):
    if request.method == "POST":
        body_unicode = request.body.decode('utf-8')
        print("Received body:", body_unicode)  # Log the body to debug

        try:
            body = json.loads(body_unicode)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        username = body.get('username')
        password = body.get('password')
        
        if not username or not password:
            return JsonResponse({'error': 'Missing username or password'}, status=400)
        db = connect_mongodb()
        users_collection = db['user']
        user = users_collection.find_one({"username": username})

        if user and check_password(password, user['password']):
            # Django's login requires a Django user object, you need to create a Django user if it doesn't exist
            from django.contrib.auth import get_user_model
            User = get_user_model()

            try:
                django_user = User.objects.get(username=username)
            except User.DoesNotExist:
                django_user = User(username=username)
                django_user.save()

            login(request, django_user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def register_method(request):
    if request.method == "POST":
        # Decode the request body
        body_unicode = request.body.decode('utf-8')
        print("Received body:", body_unicode)  # Log the body to debug

        try:
            # Parse JSON body
            body = json.loads(body_unicode)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        # Extract username and password
        username = body.get('username')
        password = body.get('password')

        if not username or not password:
            return JsonResponse({'error': 'Missing username or password'}, status=400)

        # Connect to MongoDB
        db = connect_mongodb()
        users_collection = db['user']

        # Hash the password
        hashed_password = make_password(password)
        user = {"username": username, "password": hashed_password}

        # Insert user into MongoDB
        users_collection.insert_one(user)

        return JsonResponse({'message': 'Registration successful'}, status=201)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)