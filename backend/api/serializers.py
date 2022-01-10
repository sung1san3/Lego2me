from django.db.models import fields
from rest_framework import serializers
from .models import img_fileuplaod

"""class Clothes_info(serializers.ModelSerializer):
    class Meta:
    """

class ImgSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = img_fileuplaod
        fields = '__all__'