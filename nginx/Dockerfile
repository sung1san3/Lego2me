FROM nginx:latest

# Delete nginx default configuration file in virtual directory
# 가상 공간의 nginx 기본 설정파일 삭제 후 작성한 설정파일로 대체
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY nginx.conf /etc/nginx/conf.d

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]