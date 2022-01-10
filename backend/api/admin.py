from django.contrib import admin
from django.db import router
from .models import test,img_upload
# Register your models here.
admin.site.register(test)
admin.site.register(img_upload)