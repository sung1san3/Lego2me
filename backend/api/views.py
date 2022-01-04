from django.shortcuts import render
from rest_framework import views, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ImgSerializer
from .models import img_fileuplaod
#from backend.api import serializers

"""import os

@api_view(['POST'])
def file_upload(request):
    	if request.method == 'POST':
            img_file = request.files['file']
            filename = secure_filename(img_file.filename)"""

class imgContentView(viewsets.ModelViewSet):
        serializers_class = ImgSerializer
        queryset = img_fileuplaod.objects.all()