# FROM node:14.16.0
# USER root

# WORKDIR /frontend
# COPY . /frontend

# # Make variable API_URL to put uri into url
# # uri 변수 형태로 받아서 url에 넣어 작동하도록 함
# ARG API_URL
# ENV REACT_APP_HOST_IP_ADDRESS $API_URL

# RUN npm install
# COPY . ./

# # build file을 개발용에서는 불러오지 않기 때문에 개발용에서는 npm start 가능
# RUN npm run build
#-----------
FROM node:14.16.0

# 이미지 생성 과정에서 실행할 명령어
RUN npm install
RUN npm install -g http-server 

# 이미지 내에서 명령어를 실행할(현 위치로 잡을) 디렉토리 설정
 WORKDIR /frontend

# 컨테이너 실행시 실행할 명령어
CMD ["http-server", "-p", "8000", "./public"]


