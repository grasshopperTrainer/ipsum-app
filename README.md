# 구성
웹페이지와 api 서버로 이루어져 있음
# 구조
웹페이지의 경우 빌드된 static 파일의 nginx 를 통해 제공함
api 의 경우 nginx reverse proxy - gunicorn - flask 를 통해 제공됨

# 빌드
## 개발 run dev
환경 격리와 실시간 업데이트를 동시에 사용하기 위해 docker 내부에서 `npm run dev` 후 로컬 src 를 컨테이너에 마운팅하도록 함.
- 빌드 변수:
  - APP_ENV=run_dev
- 빌드/실행:
```bash
docker build --build-arg APP_ENV=run_dev -t ipsum .
# 두번째 volume:
#   -v single argument: 해당 위치에 이름 없는(anonymous) 볼륨을 마운트 - 컨테이너가 삭제되어도 살아있는 데이터. 이미 이미지의 해당 위치에 데이터가 존재할 경우, 해당 데이터를 볼륨으로 그대로 감싸는 듯 함
#   이 경우: 특정 플렛폼에서 빌드(이 경우 도커 컨테이너의 리눅스에서의 빌드(Dockerfile 을 통해))된 js package 를 사용해야 정상 동작하므로, 앞선 첫번째 마운트에서 package 디렉토리만 제외하기 위해 사용
# 3000: vue
# 5000: flask
docker run \
  -v $(pwd)/ipsum-app-web:/root/ipsum-app-web \
  -v /root/ipsum-app-web/node_modules \
  -p 3000:3000 \
  -v $(pwd)/ipsum-app-api:/root/ipsum-app-api \
  -p 5000:5000 \
  ipsum
```

## 테스트 dev
배포 환경을 로컬에서 테스트하기 위한 빌드. 모든 구성 요소는 배포한 상태와 같이 작동하는 중에 localhost 를 통해 접근하기 위함
- 빌드 변수:
  - APP_ENV=test_dev
- 빌드/실행:  
```bash
docker build --build-arg APP_ENV=test_dev -t ipsum .
# -d: detached, terminal 을 점유하지 않고 뒤에서 실행
docker run -d -p 80:80 ipsum
```

## 배포 prod
배포에 사용하기 위한 빌드
- 빌드 변수:
  - APP_ENV=prod

# 배포