FROM ubuntu:18.04

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
COPY ../ /app
WORKDIR /app
RUN pip install -r requirements.txt
ENTRYPOINT ["python"]
CMD ["./flask/app.py"]

#구글 클라우드 
RUN pip install --upgrade google-api-python-client
RUN pip install --upgrade google-cloud-storage
