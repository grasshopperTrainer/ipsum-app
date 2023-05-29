# 구성
웹페이지와 api 서버로 이루어져 있음
# 구조
웹페이지의 경우 빌드된 static 파일의 nginx 를 통해 제공함
api 의 경우 nginx reverse proxy - gunicorn - flask 를 통해 제공됨

# 빌드
## 개발 run dev
환경 격리와 실시간 업데이트를 동시에 사용하기 위해 docker 내부에서 `npm run dev` 후 로컬 src 를 컨테이너에 마운팅하도록 함.
- 빌드 변수:
  - APP_PHASE=run_dev
- 빌드/실행:
```bash
docker-compose -f compose.run_dev.yml up --build
```

## 테스트 dev
배포 환경을 로컬에서 테스트하기 위한 빌드. 모든 구성 요소는 배포한 상태와 같이 작동하는 중에 localhost 를 통해 접근하기 위함
- 빌드 변수:
  - APP_PHASE=test_dev
- 빌드/실행:  
```bash
docker build \
  --build-arg APP_PHASE=dev \
  --build-arg GUNICORN_DOMAIN=localhost \
  --build-arg GUNICORN_PORT=8000 \
  -t stayout_campground_dev .
# -d: detached, terminal 을 점유하지 않고 뒤에서 실행
docker run -d -p 80:80 stayout_campground_dev
```

## 배포 prod
배포에 사용하기 위한 빌드
- 빌드 변수:
  - APP_PHASE=prod

# 배포