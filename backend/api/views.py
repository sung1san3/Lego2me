from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
from rest_framework import viewsets

from backend.api.img_upload import db_save
from .serializers import Img_upload_serializers
from .models import Img_upload
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .forms import Img_uploadform

import sys
import os, os.path

# from google.cloud import storage
# import glob
#from .. import FileManager as fm
#from backend.api import serializers
# Create your views here.

#@api_view(['POST'])
# class Img_upload_view(viewsets.ModelViewSet):
#     serializer = Img_upload_serializers
#     queryset = Img_upload.objects.all()

class PostView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    # def get(self, request, *args, **kwargs):
    #     posts = Img_upload.objects.all()
    #     serializer = Img_upload_serializers(posts, many=True)
    #     return Response(serializer.data)
    def post(self, request, format=None):
        imguploadform = Img_uploadform(request.POST, request.FILES)
        if imguploadform.is_valid():
            imguploadform.save()
            return Response(imguploadform.data, status=status.HTTP_201_CREATED)
        else:
            print('error', imguploadform.errors)
            return Response(imguploadform.errors, status=status.HTTP_400_BAD_REQUEST)