# example/views.py
from datetime import datetime
import json
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login,authenticate,logout
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError


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
        print(body)
        if not username or not password:
            return JsonResponse({'error': 'Missing username or password'}, status=400)
        try:
            user = User.objects.get(username = username)
        except User.DoesNotExist:
            return JsonResponse({'error': "User does not exist"}, status=400)
        if user is None:
            return JsonResponse({'error': "User does not exist"}, status=400)
        if not user.check_password(password):
            raise JsonResponse({'error': 'Incorrect username or password'}, status=400)
        access_token = AccessToken.for_user(user)
        refresh_token =RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            "access_token" : access_token,
            "refresh_token" : refresh_token,
        }, status=200)

        """ user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401) """
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

from django.contrib.auth.models import User

@csrf_exempt
def register(request):
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
            return JsonResponse({'error': 'Missing username, password l'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already taken'}, status=400)

       
        try:
            user = User.objects.create_user(username=username, password=password)
            user.save()
            return JsonResponse({'message': 'User registered successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)