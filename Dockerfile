ARG APP_ENV=dev
FROM nginx:stable as nginx-base
# 첫 ARG 는 아래 FROM 절에서 쓰이고 두번째 ARG 는 ENV 에서 쓰임
# 아래 FROM 절은 두번째 ARG 보다도 뒤에 위치하지만
#   첫 FROM 절 이전에 ARG 가 있어야 이후의 모든 FROM 절에서 사용할 수 있는 듯 함
ARG APP_ENV

ENV BASE_DIR=/root
RUN apt update \
    && apt install xz-utils

WORKDIR /root
# node 설치
#   -L follow redirection
#   -o output as
# tar
#   -x extract
#   -f with file
RUN curl -Lo node.tar.xz https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.xz \
    && tar -xf node.tar.xz \
    && rm node.tar.xz \
    && echo "export PATH=\$PATH:/root/node-v18.16.0-linux-x64/bin" >>.bashrc
ENV PATH=$PATH:/root/node-v18.16.0-linux-x64/bin
# python 설치
#   간단히 버전을 명기하는 방법은 없는것 같음
#   버전을 지정하려고 직업 build 하는 것은 시간이 너무 오래 결림
#   23.05 3.9.2 설치
RUN apt install pip python3 -y \
    && python3 -m pip install --upgrade pip



FROM nginx-base as dev
# web, dist 디렉토리로 빌드
#   chmod: nginx 가 접근할 수 있게
COPY ipsum-app-web ipsum-app-web
WORKDIR ${BASE_DIR}/ipsum-app-web
RUN npm install \
    && npm run build \
    && chmod -R 777 /root
# nginx 셋팅
WORKDIR ${BASE_DIR}
COPY server_conf server_conf
RUN cp server_conf/nginx.conf /etc/nginx/conf.d/default.conf
# use nginx default ENTRYPOINT


FROM nginx-base as run_dev
WORKDIR ${BASE_DIR}
# vue
COPY ipsum-app-web ipsum-app-web
RUN npm install --prefix ${BASE_DIR}/ipsum-app-web \
    && chmod -R 777 /root
# flask
COPY ipsum-app-api ipsum-app-api
RUN pip install -r ipsum-app-api/requirements.txt

WORKDIR ${BASE_DIR}
ENTRYPOINT [ "/bin/bash", "-c", "npm run dev --prefix ipsum-app-web -- --port 3000 --host & python3 ipsum-app-api/app.py" ]


FROM ${APP_ENV} AS final
ENV APP_ENV=${APP_ENV}
