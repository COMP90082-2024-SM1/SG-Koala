from django.contrib.auth.models import Group, User
from rest_framework import serializers
from datetime import datetime

class TestSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=200)
    text = serializers.CharField(max_length=200)
    datetime = serializers.DateTimeField(default=datetime.now)
   