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
        
        task_dic = {}
        task_dic['task'] = task_id
        return Response(task_dic, status=status.HTTP_201_CREATED, headers=headers)

class Get_View(APIView):
    def get(self, request, slug, format=None):
        result = Task.objects.get(id=slug)
        print(slug)
        serializer = Task_serializers(result)
        return Response(serializer.data)