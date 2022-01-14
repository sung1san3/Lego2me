import imp
from pyexpat import model
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
from rest_framework import viewsets

#from api.img_upload import db_save
from rest_framework.viewsets import ModelViewSet
from .serializers import Img_upload_serializers
from .models import Img_upload
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .forms import Img_uploadform

import sys
import os, os.path
from .img_upload import upload_blob, db_save
import glob

class PostViewSet(viewsets.ModelViewSet):
    queryset = Img_upload.objects.all()
    serializer_class = Img_upload_serializers
    if serializer_class.is_valid():
        print(serializer_class)
    #id = Img_upload.objects.order_by('-id')
    #id 가져오기 (아마 파일명으로)
    #filename = Img_upload.objects.filter('img_title')
    #print('filename')
    # data = json.loads(request.body)
    
    #Viewset으로 해볼려고 했으나 계속 오류남 ;;
    # def get(self, request, format=None):
    #     snippets = Img_upload.objects.all()
    #     serializer = Img_upload_serializers(snippets, many=True)
    #     return Response(serializer.data)

    # def post(self, request, format=None):
    #     queryset = Img_upload.objects.all()
    #     serializer = Img_upload(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #def get_queryset(self):
    # path = './media'
    # os.rename(path+filename, id)

    # upload_blob(id)

    # #파일 삭제
    # if os.path.exists(file_path):
    #     for file in os.scandir(file_path):
    #         os.remove(file_path)

    # #구글 클라우드 스토리지 URL만들기
    # bucket = "lego_example"
    # imguri = "https://storage.googleapis.com/"+bucket+"/"+"names"
    # db_save(names[0], imguri)
    # return Response(img_upload_serializers.data, status=status.HTTP_201_CREATED)

#         else:
#             print('error', img_upload_serializers.errors)
#             return Response(img_upload_serializers.errors, status=status.HTTP_400_BAD_REQUEST)