import sys
import os, os.path

from google.cloud import storage
import glob

bucket_name = "lego_example"
#버킷 이름
source_file_name = "img"
#업로드 할 파일의 경로 (img/001.jpg , 002.jpg ... ->  img)
destination_blob_name = "temp"
#버킷 내부의 저장소 폴더 이름 (특정 폴더내에 이미지를 넣음.)
#(예를들어 temp라고 지정했다면 , 구글 스토리지에는 temp폴더안에 이미지들이 들어감)

# --------------[START storage_upload_file]
def upload_blob(bucket_name, source_file_name, destination_blob_name):
    """Uploads a file to the bucket."""
    
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)

    blob.upload_from_filename(source_file_name)

    print(
        "파일 {} 이 /{} 저장소에 업로드 되었습니다.".format(
            source_file_name, destination_blob_name
        )
    )


# 환경변수 추가
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="lego2me-image-d0a54bb93c41.json"
#os.environ["GOOGLE_APPLICATION_CREDENTIALS"]= 키 생성하면 나오는 json파일의 경로 작성


names = glob.glob1(source_file_name,"*")
#지정한 경로내의 모든 파일(이미지 파일만 있어야함)의 파일명 list 

for imgName in names:
    if __name__ == "__main__":
         upload_blob(
                    bucket_name ,
                    source_file_name+"/"+imgName ,
                    destination_blob_name+"/"+imgName 
             )



# [END storage_upload_file]