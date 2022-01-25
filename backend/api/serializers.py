from django.db.models import fields
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import *

class Img_upload_serializers(serializers.ModelSerializer):

    class Meta:
        model = Img_upload
        fields = ['img_top', 'img_bottoms', 'img_title','_id']

class Task_serializers(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'

class Starscore_serializers(serializers.ModelSerializer):
    class Meta:
        model = star_score
        fields = '__all__'