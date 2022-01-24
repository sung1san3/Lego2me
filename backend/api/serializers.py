from django.db.models import fields
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import *
#from django.contrib.auth.models import User

# 사용 ++++++++++++++++++++++++++++++++++++++++
class Img_upload_serializers(serializers.ModelSerializer):
    #image = serializers.ImageField(use_url=True)

    class Meta:
        model = Img_upload
        fields = ['img_top', 'img_bottoms', 'img_title','_id']

    # def __str__(self):
    #     return self._id

class Task_serializers(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'