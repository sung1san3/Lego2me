import os

from celery import Celery

# Celery 모듈을 위한 Django 기본세팅
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

app = Celery('config')


# 여기서 문자열을 사용하는것은 작업자가가 자식 프로세스 직렬화 구성을 하지 않는것을 의미합니다.
# -namespace='CELERY' 의 의미는 셀러리와 관련된 모든 설정은 CELERY_ 라는 prefix로 시작함을 의미
app.config_from_object('django.conf:settings', namespace='CELERY')

# Django 에 등록된 모든 task 모듈을 로드합니다.
app.autodiscover_tasks()


@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')