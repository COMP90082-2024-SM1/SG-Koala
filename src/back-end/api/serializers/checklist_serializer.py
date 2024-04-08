from rest_framework import serializers
from datetime import datetime

class checklistSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    checklist_name = serializers.CharField(max_length=200)
    tasks = serializers.ListField(child=serializers.CharField(min_length=0, max_length=200))
    updatetime = serializers.DateTimeField(default=datetime.now)
   