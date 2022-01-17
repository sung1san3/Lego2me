import os
from celery import Celery
 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lego2me.settings')
 
app = Celery('lego2me')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()