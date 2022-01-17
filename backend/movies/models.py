from django.db import models

# Create your models here.
class Movie(models.Model): 
    top = models.CharField(max_length=100) # 상의
    bottom = models.CharField(max_length=100) # 하의 

    def __str__(self): 
        return self.title

