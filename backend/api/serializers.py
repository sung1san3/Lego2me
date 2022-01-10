from django.db.models import fields
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Img_upload
#from django.contrib.auth.models import User

class Img_upload_serializers(serializers.ModelSerializer):
    #image = serializers.FileField(use_url=False)

    class Meta:
        model = Img_upload
        fields = '__all__'