import os
import glob
from google.cloud import bigquery
import uuid
import pandas
import pytz
import datetime

def bigquery_save(newFileName_top, newFileName_bottoms, id, top_label, bottom_label):
    credential_path = "/backend/api/json_key/bigquery-339204-ae0dfd4ee5d8.json"  #json파일 경로
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path #환경변수 세팅

    #구글 클라우드 스토리지 URL만들기
    bucket = "lego2me__image"

    topimguri = "https://storage.googleapis.com/" + bucket + "/" + newFileName_top
    bottomimguri = "https://storage.googleapis.com/"+ bucket + "/" + newFileName_bottoms


    client = bigquery.Client()


    table_id= "test.temp" #bigquery에 생성한 dataset_name.tableName 작성 (해당 테이블에 데이터 삽입)
    cur_time = data=datetime.datetime.now()
    records = [{}]
    records[0]['id'] = id
    records[0]['img_url_top'] = topimguri
    records[0]['img_url_bottom'] = bottomimguri
    records[0]['top_label'] = top_label
    records[0]['buttom_label'] = bottom_label
    records[0]['upload_date'] = cur_time

    dataframe = pandas.DataFrame(
        records,
        columns=[ #테이블의 스키마명시
            "id",
            "img_url_top",
            "img_url_buttom",
            "top_label",
            "buttom_label",
            "upload_date",
        ],
        #인덱스는 다음과 같이 표현 가능
        # index=pandas.Index(
        #     [u"Q24980", u"Q25043"], name="id"
        # ),
    )
    job_config = bigquery.LoadJobConfig(

        schema=[
            # 각 스키마의 타입을 지정 (자동으로 해주기도하지만, object객체로 나오는 등 애매한 경우도 있어 다음과 같이 명시함으로 확실하게 데이터 타입 정의)
            bigquery.SchemaField("img_url_top", bigquery.enums.SqlTypeNames.STRING),
            bigquery.SchemaField("img_url_buttom", bigquery.enums.SqlTypeNames.STRING),
            bigquery.SchemaField("top_label", bigquery.enums.SqlTypeNames.STRING),
            bigquery.SchemaField("buttom_label", bigquery.enums.SqlTypeNames.STRING),
        
        ],
        #만약 데이터 덮어쓰기 하고 싶으면 다음과 같은 환경변수 정의(기존꺼 날라감)
        #write_disposition="WRITE_TRUNCATE",
    )

    job = client.load_table_from_dataframe(
        dataframe, table_id, job_config=job_config
    )  # Make an API request.
    job.result()  # Wait for the job to complete.

    table = client.get_table(table_id)  # Make an API request. - bigquery테이블에 데이터 삽입
    print(
        "정상적으로 {} 개의 row 가  {}에 저장되었습니다.".format(
            table.num_rows, table_id
        )
    )