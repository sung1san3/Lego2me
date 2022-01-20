FROM --platform=linux/x86_64 python:3.7

ADD . /backend
WORKDIR /backend
RUN pip3 install celery
RUN pip3 install -r ./backend/requirements.txt

CMD ["echo", "hello"]