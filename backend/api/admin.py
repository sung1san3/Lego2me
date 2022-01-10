from django.contrib import admin
from django.db import router
from .models import Image_data,Img_upload
# Register your models here.
admin.site.register(Img_upload)
admin.site.register(Image_data)