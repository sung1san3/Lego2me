from rest_framework import serializers 
from .models import Movie 
class MovieSerializer(serializers.ModelSerializer): 
    class Meta: 
        model = Movie # 모델 설정 
        fields = ('id','top','bottom') # 필드 설정