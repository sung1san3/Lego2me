FROM python:3.7

ADD . /app/
WORKDIR /app/
RUN pip install celery

CMD ["echo", "hello"]