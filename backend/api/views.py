from django.shortcuts import render
from rest_framework import viewsets
from .serializers import WiseSayingSerializer
from .models import WiseSaying


class WiseSayingView(viewsets.ModelViewSet):
    serializer_class = WiseSayingSerializer
    queryset = WiseSaying.objects.all()