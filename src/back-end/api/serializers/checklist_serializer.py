from rest_framework import serializers
from datetime import datetime

class ChecklistTaskSerializer(serializers.Serializer):
    task_name = serializers.CharField(max_length=200)
    order = serializers.IntegerField()
    link = serializers.CharField(required=False, default=" ")
    status = serializers.IntegerField(default=0)

class TemplateTaskSerializer(serializers.Serializer):
    task_name = serializers.CharField(max_length=200)
    order = serializers.IntegerField()
    link = serializers.CharField(required=False, default=" ")

class ChecklistSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    checklist_name = serializers.CharField(max_length=200)
    tasks = serializers.ListField(child=ChecklistTaskSerializer())
    updatetime = serializers.DateTimeField(default=datetime.now)
   
class TemplateSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    template_name = serializers.CharField(max_length=200)
    tasks = serializers.ListField(child=TemplateTaskSerializer())
    updatetime = serializers.DateTimeField(default=datetime.now)
   