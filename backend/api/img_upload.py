import sys
import os, os.path

from google.cloud import storage
import glob
from .serializers import Img_data_serializers
from .models import Image_data

def upload_blob(filename):
    bucket_name = "lego_example"
    source_file_name = "img/"+filename[0]
    destination_blob_name = "temp/"+filename[0]

    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="lego2me-image-d0a54bb93c41.json"

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print("파일 {} 이 /{} 저장소에 업로드 되었습니다.".format(source_file_name, destination_blob_name))

def db_save(filename, imguri):
    img_data = Image_data()

    img_data.name = filename
    img_data.image_uri = imguri
    img_data.save()