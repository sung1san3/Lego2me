import sys
import os, os.path

from google.cloud import storage
import glob
#from .serializers import Img_data_serializers
from .models import Image_data, Img_upload

def upload_blob(filename, bucket_name):
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]='/backend/api/lego2meproject-3eaf5d63b3b9.json'
    source_file_name = "/backend/media/"+filename
    destination_blob_name = "image/"+filename

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print("파일 {} 이 /{} 저장소에 업로드 되었습니다.".format(source_file_name, destination_blob_name))

    if os.path.isfile(source_file_name):
        os.remove(source_file_name)
        db_delete(filename)
        print(filename+'<--- 삭제 완료')

def db_save(filename, imguri):
    img_data = Image_data()

    img_data.id = filename
    img_data.image_uri = imguri
    img_data.save()
    print('저장완료')

def db_delete(filename):
    record = Img_upload.objects.get(img = filename)
    record.delete()