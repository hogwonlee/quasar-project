토스 개발자 사이트 - 결제 연동 예시 페이지
https://docs.tosspayments.com/guides/payment-widget/integration

# Quasar App (quasar-project)

A Quasar Project

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
npm run dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

# 실행 시 환경 변수 적용

BACKEND_SERVER=https://{backend_server}

linux:
`
exports BACKEND_SERVER=https://{backend_server}

`

# REDIS 설치

`docker run -p 6379:6379 -it redis/redis-stack-server:latest`

# 빌드 중 오류 대처

중간에 오류 발생해서 아래와 같이 코멘드 실행.
npm audit fix --force
중간에 오류 발생해서 아래와 같이 패키지 설치함.
npm install compare-func
npm install shelljs

# 버전 체크

cordova 9.1.0 (npm uninstall -g cordova npm install -g cordova@9.1.0)
gradle 4.10.3
jdk 8 => 1.8

# 명령어

quasar mode add cordova
cd src-cordova
cordova platform add android
cordova requirements
quasar dev -m cordova -T android -warning-mode=all
