from django.contrib.auth.models import Group, User
from rest_framework import serializers
from datetime import datetime






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
    contactFirstName = serializers.CharField(max_length=200)
    contactLastName = serializers.CharField(max_length=200)
    email = serializers.CharField(max_length=200)
    phone = serializers.CharField(max_length=200)




class TaskChecklistSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    link = serializers.URLField(max_length=200,allow_blank=True,default = "")
    status = serializers.IntegerField(default = 0)

class ChecklistSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=255)
    task = TaskChecklistSerializer(many=True)  

class TaskTemplateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    link = serializers.URLField(max_length=200,allow_blank=True,default = "")


class TemplateSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=255)
    task = TaskTemplateSerializer(many=True)  


class BookSerializer(serializers.Serializer):
    id = serializers.CharField(source='_id', read_only=True)
    name = serializers.CharField(max_length=200)
    event = serializers.CharField()  # Assuming it's a CharField, you may need a related serializer if it's a nested object.
    status = serializers.ChoiceField(choices=['Pending', 'Processing', 'Delivered', 'Canceled'])
    location = serializers.CharField()  # Or serializers.PrimaryKeyRelatedField if it's a relation to another entity.
    date = serializers.DateTimeField()
    checklist_id = serializers.CharField()  # Assuming it's a ForeignKey to another model.
    checklist = ChecklistSerializer(required=False)  # Assuming it's a ForeignKey to another model.
    startTime = serializers.DateTimeField()
    endTime = serializers.DateTimeField()
    # module_id = serializers.PrimaryKeyRelatedField(read_only=True)  # Assuming it's a ForeignKey to another model.
    school_id= serializers.CharField()  # Assuming it's a ForeignKey to another model.
    school= SchoolSerializer(required=False)  # Assuming it's a ForeignKey to another model.
    exibition = serializers.CharField()  # Assuming it's a ForeignKey to another model.
    note = serializers.CharField(max_length=200, allow_blank=True,required=False)  # Assuming this is optional and can be a blank string.
 