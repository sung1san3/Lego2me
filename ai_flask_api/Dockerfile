FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY ../ /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
RUN pip install Flask-PyMongo
CMD ["./flask/app.py"]

#구글 클라우드 
RUN pip install --upgrade google-api-python-client
RUN pip install --upgrade google-cloud-storage

#AI
#RUN pip install torch
#RUN pip install future
#RUN pip install --upgrade numpy
#RUN pip install --torchvision
#RUN cd RoIAlign.pytorch
#RUN python setup.py install
#AI쪽 모듈깔다가 오류 납니다. 향후 찾아봐야해요.
