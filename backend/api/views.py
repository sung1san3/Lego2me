from django.shortcuts import render
from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt
# from django.views.decorators.http import require_POST
# from rest_framework.decorators import api_view
from rest_framework import viewsets
from .serializers import Img_upload_serializers
from .models import Img_upload
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

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
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        posts = Img_upload.objects.all()
        serializer = Img_upload_serializers(posts, many=True)
        # bucket_name = "lego_example"
        # source_file_name = "img"
        # destination_blob_name = "temp"
        # # --------------[START storage_upload_file]
        # def upload_blob(bucket_name, source_file_name, destination_blob_name):
        #     """Uploads a file to the bucket."""
            
        #     storage_client = storage.Client()
        #     bucket = storage_client.bucket(bucket_name)
        #     blob = bucket.blob(destination_blob_name)

        #     blob.upload_from_filename(source_file_name)

        #     print(
        #         "파일 {} 이 /{} 저장소에 업로드 되었습니다.".format(
        #             source_file_name, destination_blob_name
        #         )
        #     )


        # # 환경변수 추가
        # os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="lego2me-image-d0a54bb93c41.json"
        # #os.environ["GOOGLE_APPLICATION_CREDENTIALS"]= 키 생성하면 나오는 json파일의 경로 작성


        # names = glob.glob1(source_file_name,"*")
        # #지정한 경로내의 모든 파일(이미지 파일만 있어야함)의 파일명 list 

        # for imgName in names:
        #     if __name__ == "__main__":
        #         upload_blob(
        #                     bucket_name ,
        #                     source_file_name+"/"+imgName ,
        #                     destination_blob_name+"/"+imgName 
        #             )
        # #파일 삭제
        # file_path = "./media"
        # if os.path.exists(file_path):
        #     for file in os.scandir(file_path):
        #         os.remove(file_path)
        
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = Img_upload_serializers(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    