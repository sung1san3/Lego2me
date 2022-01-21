from distutils.command.upload import upload
from django.db import models
from djongo import models
from .uuid import get_file_path
# Create your models here.
#from django.contrib.auth.models import User
#from django.db.models.signals import post_save
#from django.dispatch import receiver

class Image_data(models.Model):
    id_top = models.CharField(primary_key=True, max_length=200)
    id_bottom = models.CharField (max_length=200)
    image_url_top = models.CharField(max_length=200)
    image_url_bottom = models.CharField(max_length=200)


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
    