FROM nginx:stable

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