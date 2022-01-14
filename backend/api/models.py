from django.db import models
#from djongo import models
# Create your models here.
#from django.contrib.auth.models import User
#from django.db.models.signals import post_save
#from django.dispatch import receiver

class Image_data(models.Model):
    id = models.CharField(primary_key=True,max_length=100)
    image_uri = models.CharField(max_length=100)

class Img_upload(models.Model):
    img = models.ImageField()
    img_title = models.CharField(max_length=100)