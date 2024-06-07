from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.contrib.auth.models import User
from django.http import JsonResponse
import json

@api_view(["POST"])
@permission_classes([AllowAny])
def login_method(request):
    
    body_unicode = request.body.decode("utf-8")
    print("Received body:", body_unicode)  # Log the body to debug

    try:
        body = json.loads(body_unicode)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    username = body.get("username")
    password = body.get("password")

    if not username or not password:
        return JsonResponse({"error": "Missing username or password"}, status=400)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"error": "User does not exist"}, status=400)

    if not user.check_password(password):
        return JsonResponse({"error": "Incorrect username or password"}, status=400)

    # Issue tokens
    try:
        access_token = AccessToken.for_user(user)
        refresh_token = RefreshToken.for_user(user)
        return Response(
            {
                "message": "Login successful",
                "access_token": str(access_token),
                "refresh_token": str(refresh_token),
            },
            status=200,
        )
    except Exception as e:
        return JsonResponse({"error": "Error issuing tokens"}, status=500)

