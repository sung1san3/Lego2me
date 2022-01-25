from __future__ import absolute_import, unicode_literals
from django.conf import settings
from celery import shared_task
from celery import Celery
from .models import Task
import json, os, sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from ai import ai

brokers = [f'amqp://{settings.RABBITMQ_USER}:{settings.RABBITMQ_PASSWORD}@{host}//' 
		for host in settings.RABBITMQ_HOSTS]

app = Celery('puddlr', broker=brokers, 
		broker_transport_options={'confirm_publish': True})

@shared_task
def ai_model(newFileName_top, newFileName_bottoms, id):
    # 상, 하의 구별을 위한 인텍스 값
    index = 0

    #상의
    result_value_top = ai.ai_model(newFileName_top, index)
    #하의
    result_value_bottom = ai.ai_model(newFileName_bottoms, index+10) #하의 인덱스는 10부터 시작
    
    # #상, 하의 결과값 딕셔너리
    # result_sting = {}
    # result_sting["top"] = result_value_top
    # result_sting["bottom"] = result_value_bottom

    # # 결과값 json 변환
    # json_string = json.dumps(result_sting)
    # print(json_string)
    
    task = Task.objects.get(id = id)
    task.top = result_value_top
    task.bottom = result_value_bottom
    task.status = 'true'
    task.save()

    return id