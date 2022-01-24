import imp
from pyexpat import model
from urllib import request
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.decorators import parser_classes
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import Img_upload
from rest_framework.response import Response
from rest_framework import status
from .models import Task
import sys
import os, os.path
from .img_upload import upload_blob, db_delete
from .img_upload import *
import uuid

#sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
#from ai import ai

from .tasks import ai_model

class PostViewSet(viewsets.ModelViewSet):

    queryset = Img_upload.objects.all()
    serializer_class = Img_upload_serializers

    def create(self, request, *args, **kwargs):
        data = request.data
        filename = data.__getitem__('img_title')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        newFileName_top = str(Img_upload.objects.filter(img_title=filename).values('img_top')[0]['img_top'])
        newFileName_bottoms = str(Img_upload.objects.filter(img_title=filename).values('img_bottoms')[0]['img_bottoms'])
        print(newFileName_top+' // '+newFileName_bottoms)


        db_delete(newFileName_top)
        
        bucket = "lego2me__image"

        # 구글 스토리지 업로드
        upload_blob(newFileName_top, bucket)
        upload_blob(newFileName_bottoms, bucket)
        
        task_id = str(uuid.uuid4())
        print(task_id + 'task_ id 생성')

        # db 저장
        task = Task()
        task.id = task_id
        task.status = 'false'
        task.save()

        ai_model(newFileName_top, newFileName_bottoms, task_id)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers, task = task.id)

class Get_View(APIView):
    def get(self, request, slug, format=None):
        result = self.get_object(slug)
        print(slug)
        type(result)
        seriallizer = Task_serializers(result)
        return Response(serializers.data)

#         # GET repeat http://localhost:8000/api/posts/tasks/<task_id>
#         return result ## status = PENDING -> COMPLETED => result ={ top: res.data.top ,bottom: res.data.bottom}
    #print(serializer_class)
    #id = Img_upload.objects.order_by('-id')
    #id 가져오기 (아마 파일명으로)
    #filename = Img_upload.objects.filter('img_title')
    #print('filename')
    
    #Viewset으로 해볼려고 했으나 계속 오류남
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