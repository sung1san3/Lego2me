from __future__ import absolute_import, unicode_literals

from celery import shared_task

import json, os, sys

sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from ai import ai

@shared_task
def ai_model_top(newFileName_top, newFileName_bottoms):
    dic_top = ['Red_Shrits','Orange_Shrits','Yellow_Shrits','Green_Shrits','Blue_Shrits','Purple_Shrits','Brown_Shrits','Grey_Shrits','Black_Shrits','White_Shrits']
    dic_bottoms = ['Red_Pants','Orange_Pants','Yellow_Pants','Green_Pants','Blue_Pants','Purple_Pants','Brown_Pants','Grey_Pants','Black_Pants','White_Pants']

    result_value_top = ai.ai_model(newFileName_top, dic_top)
    result_value_bottom = ai.ai_model(newFileName_bottoms, dic_bottoms)
    
    result_sting = {}
    result_sting["top"] == result_value_top
    result_sting["bottem"] == result_value_bottom

    json_string = json.dumps(result_sting)
    print(json_string)
    
    return json_string
