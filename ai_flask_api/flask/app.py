#-*- coding:utf-8 -*-

#인코딩 오류나서 1라인에 넣었습니다.)

from flask import Flask, render_template, redirect, request, url_for
from pymongo import MongoClient
app = Flask(__name__)
 
@app.route('/')
@app.route('/mongo',methods=['GET', 'POST'])
def mongoTest():
    client = MongoClient('mongodb://root:legolego@db:27017/')
    #mongodb://이름:비번@ db이름 (compose-up에 명시한 이름으로 해야합니다.) : 27017(포트)/

    db = client.newDatabase  #use newDatabase
    collection = db.mongoTest #db.createCollection("mongoTest")로 만들어서 , db.mongoTest.insert("{NAME:":"DATA1~~~"})

    results = collection.find()
    client.close()
    return render_template('mongo.html', data=results) #mongo.html을 만들고, 거기서 DB의 데이터를 가져오는 예제입니다.
 
if __name__ == '__main__':
    app.run(debug=True , host='0.0.0.0', port=5000) 
    #port번호 : 0 0 0 0 으로 설정해야 외부에서 접근 가능
    #port : 5000번으로 설정


