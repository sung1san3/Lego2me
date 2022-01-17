from django import forms
from django.db.models import fields
from django.db.models.base import Model
from .models import Img_upload

<<<<<<< HEAD
=======
# 보류 +++++++++++++++++++++++++++++++++
>>>>>>> docker
class Img_uploadform(forms.ModelForm):
    class Meta:
        model = Img_upload
        fields = '__all__'