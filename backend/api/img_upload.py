import sys
import os, os.path

from google.cloud import storage
import glob
#from .serializers import Img_data_serializers
from .models import Img_upload

# GSC에 사진 업로드
def upload_blob(filename, bucket_name):
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"]='/backend/api/json_key/lego2meproject-3eaf5d63b3b9.json'
    source_file_name = "/backend/media/"+filename
    destination_blob_name = "image/"+filename

    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print("파일 {} 이 버킷에 업로드 되었습니다.".format(source_file_name))
    # 버킷에 저장완료 후 로컬 이미지 파일 삭제
    if os.path.isfile(source_file_name):
        os.remove(source_file_name)
        print(filename+' <--- 로컬 이미지 삭제 완료')

# DB에 저장된 필드 삭제
def db_delete(filename):
    record = Img_upload.objects.get(img_top = filename)
    record.delete()
    print("이미지 db 삭제 완료")