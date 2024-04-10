from django.contrib.auth.models import Group, User
from rest_framework import serializers
from datetime import datetime

class BookSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=200)
 



class SchoolSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=200)
    studentYear = serializers.IntegerField()
    numStudentAttended = serializers.IntegerField()
    numStudentRegistered = serializers.IntegerField()
    hourRegistered = serializers.IntegerField()
    hourAttended = serializers.IntegerField()
    lowSES = serializers.BooleanField()
    allergy = serializers.CharField(max_length=200)
    contactFirstNmae = serializers.CharField(max_length=200)
    contactLastNmae = serializers.CharField(max_length=200)
    email = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=200)




class TaskChecklistSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    link = serializers.URLField(max_length=200,allow_blank=True)
    order = serializers.IntegerField()
    status = serializers.IntegerField(default = 0)

class ChecklistSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=255)
    task = TaskChecklistSerializer(many=True)  

class TaskTemplateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    link = serializers.URLField(max_length=200,allow_blank=True)
    order = serializers.IntegerField()

class TemplateSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=255)
    task = TaskTemplateSerializer(many=True)  