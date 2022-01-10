from django.db import models
#from djongo import models
# Create your models here.
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class test(models.Model):
    name = models.CharField(max_length=100, default='')
    image_uri = models.CharField(max_length=100, default='')

class img_upload(models.Model):
    name = models.ImageField(upload_to="api", default='')