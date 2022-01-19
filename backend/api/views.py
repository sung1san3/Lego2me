import imp
from pyexpat import model
from urllib import request
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
from rest_framework.response import Response
from rest_framework import status

import sys
import os, os.path
from .img_upload import upload_blob


sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from ai import ai


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
        #os.environ["GOOGLE_APPLICATION_CREDENTIALS"]='lego2me-1e9632c03309.json'

        #구글 클라우드 스토리지 URL만들기
        bucket = "lego2me_image"
        #imguri = "https://storage.googleapis.com/"+bucket+"/"+newFileName
        # db 저장
        #db_save(newFileName, imguri)
        # 구글 스토리지 업로드
        upload_blob(newFileName_top, bucket)
        upload_blob(newFileName_bottoms, bucket)

        dic_top = ['Red_Shrits','Orange_Shrits','Yellow_Shrits','Green_Shrits','Blue_Shrits','Purple_Shrits','Brown_Shrits','Grey_Shrits','Black_Shrits','White_Shrits']
        dic_bottoms = ['Red_Pants','Orange_Pants','Yellow_Pants','Green_Pants','Blue_Pants','Purple_Pants','Brown_Pants','Grey_Pants','Black_Pants','White_Pants']
    
        # result_value_top = ai.ai_model(newFileName_top, dic_top)
        # result_value_bottom = ai.ai_model(newFileName_bottoms, dic_bottoms)

        # print(result_value_top, result_value_bottom)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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