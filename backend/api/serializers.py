from django.db.models import fields
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Img_upload, Image_data
#from django.contrib.auth.models import User

class Img_upload_serializers(serializers.ModelSerializer):
    #image = serializers.FileField(use_url=False)

    class Meta:
        model = Img_upload
        fields = '__all__'

class Img_data_serializers(serializers.ModelSerializer):

    class Meta:
        model = Image_data
        fields = '__all__'