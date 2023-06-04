#! /bin/sh
npm run dev -- --host ${VUE_DOMAIN} --port ${VUE_PORT} \
& gunicorn --bind ${GUNICORN_DOMAIN}:${GUNICORN_PORT} --chdir /root/api "app:app" \
& nginx -g 'daemon off;'