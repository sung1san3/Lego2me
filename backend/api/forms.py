from django import forms
from django.db.models import fields
from django.db.models.base import Model
from .models import Img_upload

# 보류 +++++++++++++++++++++++++++++++++
class Img_uploadform(forms.ModelForm):
    class Meta:
        model = Img_upload
        fields = '__all__'