from django.db import models

# Create your models here.
class test(models.Model):
    title = models.CharField(max_length=20)
    name = models.CharField(max_length=20)