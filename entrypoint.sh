#! /bin/sh

cd web;
ionic serve --host ${VUE_DOMAIN} --port ${VUE_PORT} \
& cd ..;
gunicorn --bind ${GUNICORN_DOMAIN}:${GUNICORN_PORT} --chdir /root/api "app:app" \
& nginx -g 'daemon off;'