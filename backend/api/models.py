from django.db import models

class img_fileuplaod(models.Model):
    photo = models.ImageField(upload_to="api/img_file")