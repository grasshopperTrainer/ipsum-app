ARG APP_PHASE=dev
FROM nginx:stable as nginx-base
# 첫 ARG 는 아래 FROM 절에서 쓰이고 두번째 ARG 는 ENV 에서 쓰임
# 아래 FROM 절은 두번째 ARG 보다도 뒤에 위치하지만
#   첫 FROM 절 이전에 ARG 가 있어야 이후의 모든 FROM 절에서 사용할 수 있는 듯 함
ARG APP_PHASE
ARG GUNICORN_DOMAIN
ARG GUNICORN_PORT
ARG VUE_DOMAIN
ARG VUE_PORT
ENV APP_PHASE=${APP_PHASE}
ENV GUNICORN_DOMAIN=${GUNICORN_DOMAIN}
ENV GUNICORN_PORT=${GUNICORN_PORT}
ENV VUE_DOMAIN=${VUE_DOMAIN}
ENV VUE_PORT=${VUE_PORT}
ENV BASE_DIR=/root
# install linux common
RUN apt update \
    && apt install xz-utils
# configure base
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
# gunicorn 설치
RUN pip install gunicorn[eventlet]
# entrypoint
WORKDIR ${BASE_DIR}
COPY entrypoint.sh .
RUN envsubst < entrypoint.sh > /entrypoint.sh \
    && chmod 777 /entrypoint.sh

FROM nginx-base as dev
# web, dist 디렉토리로 빌드
#   chmod: nginx 가 접근할 수 있게
COPY web web
WORKDIR ${BASE_DIR}/web
RUN npm install \
    && npm run build \
    && chmod -R 777 /root
# nginx 셋팅
WORKDIR ${BASE_DIR}
COPY server_conf server_conf
RUN envsubst < server_conf/nginx_${APP_PHASE}.conf > /etc/nginx/conf.d/default.conf


FROM nginx-base as run_dev
WORKDIR ${BASE_DIR}
# vue
COPY web web
RUN npm install --prefix ${BASE_DIR}/web \
    && chmod -R 777 /root
# flask
COPY api api
RUN pip install -r api/requirements.txt
# nginx
COPY server_conf server_conf
RUN envsubst < server_conf/nginx_${APP_PHASE}.conf > /etc/nginx/conf.d/default.conf
# bind flask with gunicorn
ENTRYPOINT [ "/entrypoint.sh" ]


FROM ${APP_PHASE} AS final
