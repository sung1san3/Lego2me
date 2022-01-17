from django.db.models import fields
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
<<<<<<< HEAD
from .models import Img_upload
#from django.contrib.auth.models import User

class Img_upload_serializers(serializers.ModelSerializer):
    #image = serializers.FileField(use_url=False)

    class Meta:
        model = Img_upload
        fields = '__all__'
=======
from .models import Img_upload,Image_data
#from django.contrib.auth.models import User

# 사용 ++++++++++++++++++++++++++++++++++++++++
class Img_upload_serializers(serializers.ModelSerializer):
    #image = serializers.ImageField(use_url=True)

    class Meta:
        model = Img_upload
        fields = ['img', 'img_title']

    def __str__(self):
        return self._id
>>>>>>> docker

class Img_data_serializers(serializers.ModelSerializer):

    class Meta:
        model = Image_data
        fields = '__all__'