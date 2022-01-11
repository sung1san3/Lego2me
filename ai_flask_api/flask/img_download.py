# -*- coding: utf-8 -*- 
import sys
import os, os.path
from google.cloud import storage
import glob

bucket_name = "lego_example"
#버킷 이름
destination_file_name = "temp/001.jpg"
#다운로드 받을 파일의 경로
source_blob_name = "img/001.jpg"
#다운받아 저장 할 컨테이너의 경로




def download_blob(bucket_name, source_blob_name, destination_file_name):
    """Downloads a blob from the bucket."""
    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(destination_file_name)

    print(
        "클라우드 내의 {}파일을 현재 컨테이너의 {} 경로에 저장하였습니다..".format(
            source_blob_name, destination_file_name
        )
    )
# 환경변수 추가
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="lego2me-image-d0a54bb93c41.json"
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"]= 키 생성하면 나오는 json파일의 경로 작성

if __name__ == "__main__":
        download_blob(
                    bucket_name ,
                    destination_file_name ,
                    source_blob_name 
             )

# [END storage_download_file]