from .bigquery import bigquery_score_save
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from .serializers import *
from .models import Img_upload
from rest_framework.response import Response
from rest_framework import status
from .models import *

import os.path
from .img_upload import *
import uuid

from .tasks import ai_model

# 이미지 업로드 및 ai 실행
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

        ai_model(newFileName_top, newFileName_bottoms, task_id).deley()
        
        task_dic = {}
        task_dic['task'] = task_id
        return Response(task_dic, status=status.HTTP_201_CREATED, headers=headers)

# ai 실행 결과
class Get_View(APIView):
    def get(self, request, slug, format=None):
        status = str(Task.objects.filter(id=slug).values('status')[0]['status'])
        if status == 'true':
            result = Task.objects.get(id=slug)
            serializer = Task_serializers(result)
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        

# bicquery에 점수 저장
class Post_Score_View(APIView):
    def post(self, request):
        data = request.data
        id = data.__getitem__('id')
        print(id)
        score = data.__getitem__('score')
        print(score)
        serializer = Starscore_serializers(data=request.data)
        if serializer.is_valid():
            # bigquery 저장
            bigquery_score_save(id, score)
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
