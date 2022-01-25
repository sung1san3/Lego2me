from distutils.command.upload import upload
from django.db import models
from djongo import models
from .uuids import get_file_path
# Create your models here.
#from django.contrib.auth.models import User
#from django.db.models.signals import post_save
#from django.dispatch import receiver


# 이미지 업로드
class Img_upload(models.Model):
    _id = models.ObjectIdField()
    img_top = models.ImageField(upload_to=get_file_path,
                        null=True,
                        blank=True,
                        )
    img_bottoms = models.ImageField(upload_to=get_file_path,
                        null=True,
                        blank=True,
                        )
    img_title = models.CharField(max_length=100)
    
class Task(models.Model):
    id = models.TextField(primary_key=True)
    top_result = models.TextField()
    bottom_result = models.TextField()
    status = models.TextField()