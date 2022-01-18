from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np

def ai_model(filename, dic):
    # Load the model
    model = load_model('keras_model.h5') #학습시킨 model 파일의 경로

    # Create the array of the right shape to feed into the keras model
    # The 'length' or number of images you can put into the array is
    # determined by the first position in the shape tuple, in this case 1.
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)
    # Replace this with the path to your image
    image = Image.open("/backend/ai/image/"+filename) #이미지 경로
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


    topCount = 10 #상의 라벨의 개수
    btCount = 10  #하의 라벨의 개수

    topIndex = 0 #가장 확률이 높은 상의라벨의 인덱스
    buttomIndex = topCount #가장 확률이 높은 하의라벨의 인덱스



    for i in range(1,topCount):  #상의 라벨 인덱스 구하기
    
        if(dataArr[topIndex]<dataArr[i]) :
            topIndex=i
    

    for i in range(topCount+1,topCount+btCount): #하의 라벨 인덱스 구하기
    
        if(dataArr[buttomIndex]<dataArr[i]) :
            buttomIndex=i

    resultData = [] #최종 두 개의 가능성이 높은 라벨값 [상의색 , 하의색]
    resultData.append(dic[topIndex])
    resultData.append(dic[buttomIndex])
    print(resultData)
    
    return resultData