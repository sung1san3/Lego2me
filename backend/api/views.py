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
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        posts_serializer = Img_upload_serializers(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            return Response(posts_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)