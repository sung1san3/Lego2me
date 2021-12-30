from django.db import models

# Create your models here.

from django.db import models

class WiseSaying(models.Model):
    text = models.TextField()

    def __str__(self):
        return self.text