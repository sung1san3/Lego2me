from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
from . import gcs
import os

def ai_model(filename, index):
    # Load the model
    model = load_model('/backend/ai/keras_model.h5') #학습시킨 model 파일의 경로

    dic = ['Red_Shrits','Orange_Shrits','Yellow_Shrits','Green_Shrits','Blue_Shrits','Purple_Shrits','Brown_Shrits','Grey_Shrits','Black_Shrits','White_Shrits',
    'Red_Pants','Orange_Pants','Yellow_Pants','Green_Pants','Blue_Pants','Purple_Pants','Brown_Pants','Grey_Pants','Black_Pants','White_Pants']
    # Create the array of the right shape to feed into the keras model
    # The 'length' or number of images you can put into the array is
    # determined by the first position in the shape tuple, in this case 1.
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    # Replace this with the path to your image
    
    # GSC에서 해당 이미지 다운로드
    gcs.download_blob(filename)
    image_path = "/backend/ai/image/"+filename
    #image = Image.open(image_path) #이미지 경로
    image = Image.open(image_path).convert('RGB')
  
    #(x , x , 1 ) -> (x , x , 3)의 회색이미지에서 컬러로? 뭔가 그런 이미지 형태의 문제인 듯?
    #resize the image to a 224x224 with the same strategy as in TM2:
    #resizing the image to be at least 224x224 and then cropping from the center
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.ANTIALIAS)

    #turn the image into a numpy array
    image_array = np.asarray(image)
    # Normalize the image
    normalized_image_array = (image_array.astype(np.float32) / 127.0) - 1
    # Load the image into the array
    data[0] = normalized_image_array

    # run the inference
    prediction = model.predict(data)
    print(prediction)
    strValue = str(prediction[0])
    strValue  = strValue.replace("[","")
    strValue  = strValue.replace("]","")
    strValue  = strValue.replace("\n","")
    #기존의 prdiction[0] = [[a , b , c , d , e , f..를 문자열로 다루기 위해 다음과 같이 표현]]
    strArray = str(strValue).split(" ") 
    #하나의 문자열을 20개의 라벨에 대한 값으로 각각 나눔

    dataArr = []
    for i in range(20):
     dataArr.append(float(strArray[i]))
    #문자열로 나누어진 값을 실수형태의 리스트로 저장

    result = 0 #결과값 인덱스 

    for i in range(index, index+10):  #라벨 인덱스 구하기
    
        if(dataArr[index]<dataArr[i]) :
            result=i

    resultData = dic[result]
    
    print(resultData)
    
    if os.path.isfile(image_path):
        os.remove(image_path)
        print(filename+'<--- 삭제 완료')

    return resultData




    