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

# 빌드 버전 매칭

cordova 9.1.0 (npm uninstall -g cordova npm install -g cordova@9.0.0)
gradle 4.10.3
jdk 8 (jdk-1.8)

# 빌드 명령어

quasar mode add cordova
cd src-cordova
cordova platform add android
--> 새로 생성시 cordova가 12버전으로 생성됨. package.json에서 버전 9.0.0으로 수정후, cordova 삭제하고 다시 9버전으로 설치.
cordova requirements
quasar dev -m cordova -T android -warning-mode=all

cordova plugin rm org.apache.cordova.console --save
cordova build --release android

# 키 생성

PS C:\Users\82108\quasar-project\src-cordova> keytool -genkey -v -keystore cfomarket-mobileapps.keystore -alias cfomarketmobileapps -keyalg RSA -keysize 2048 -validity 10000
키 저장소 비밀번호 입력: lhq880326G
새 비밀번호 다시 입력: lhq880326G
이름과 성을 입력하십시오.
[Unknown]: hogwon lee
조직 단위 이름을 입력하십시오.
[Unknown]: hogwon lee
조직 이름을 입력하십시오.
[Unknown]: hogwon lee
구/군/시 이름을 입력하십시오?
[Unknown]: 서울시 구로구 천왕로 56
시/도 이름을 입력하십시오.
[Unknown]: 서울시
이 조직의 두 자리 국가 코드를 입력하십시오.
[Unknown]: KR
CN=hogwon lee, OU=hogwon lee, O=hogwon lee, L=서울시 구로구 천왕로 56, ST=서울시, C=KR이(가) 맞습니까?
[아니오]: Y

다음에 대해 유효 기간이 10,000일인 2,048비트 RSA 키 쌍 및 자체 서명된 인증서(SHA256withRSA)를 생성하는 중
: CN=hogwon lee, OU=hogwon lee, O=hogwon lee, L=서울시 구로구 천왕로 56, ST=서울시, C=KR
<cfomarketmobileapps>에 대한 키 비밀번호를 입력하십시오.
(키 저장소 비밀번호와 동일한 경우 Enter 키를 누름):
[cfomarket-mobileapps.keystore을(를) 저장하는 중]

Warning:
JKS 키 저장소는 고유 형식을 사용합니다. "keytool -importkeystore -srckeystore cfomarket-mobileapps.keystore -destkeystore cfomarket-mobileapps.keystore -deststoretype pkcs12"를 사용하는 산업 표준 형식인 PKCS12로 이전하는 것이 좋습니다.

# 아이콘 생성

icongenie generate -m cordova -i ./public/icons/cfomarket.png -b ./public/icons/bg.png

# 사이닝

APK 파일을 생성된 키스토어와 같은 폴더에 위치시켜야 한다. (src-cordova 폴더에 키스토어 생성되었다. cfomarket-mobileapps.keystore)
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore [원하는네임]-mobileapps.keystore app-release-unsigned.apk [원하는네임]mobileapps
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cfomarket-mobileapps.keystore app-release-unsigned.apk cfomarketmobileapps
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cfomarket-mobileapps.keystore app-release.aab cfomarketmobileapps

# zipalign 로 apk 최적화

zipalign.exe 파일을 apk, keystore 파일들과 같은 폴더에 위치시킨다. (android studio의 build-tools\33.0.0 폴더에서 복사해서 src-cordova에 붙여넣기함.)
그리고 cmd 명령어 창에서 위 3개 파일이 위치한 폴더로 이동한 다음 아래 명령어 실행.
zipalign -v 4 app-release-unsigned.apk [원하는네임].apk

---

# 빌드 명령어

quasar mode add cordova
cd src-cordova
cordova platform add android
--> 새로 생성시 cordova가 12버전으로 생성됨. package.json에서 버전 9.0.0으로 수정후, cordova 삭제하고 다시 9버전으로 설치.
cordova requirements
quasar dev -m cordova -T android -warning-mode=all

cordova plugin rm org.apache.cordova.console --save
cordova build --release android

# 서버 node -v 16 이상

```
apt install curl
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs
```

인증

```
node -v
```

# 서버에서 백엔드 서비스 실행

pm2 라는 백엔드 노드 프로세스 관리자 설치

```
yarn add global pm2
```

서비스 디렉토리에서

```
pm2 start server_2.js --name server
```

## 서비스 확인

pm2 list

## 서비스 재시작

pm2 restart [순번 (예: 0), 혹은 명칭(예: server)]

pm2 restart 0
pm2 restart server

# QA앱 실행

quasar 설치

```
yarn global add @quasar/cli
cd /server/quasar-web
git checkout qa
git pull
//pm2 start "quasar dev" --daemon --name qaapp
pm2 start "quasar dev" --daemon --name webapp
```

상태확인

```
pm2 list
```

접속 확인

```
http://175.119.224.213:9000
```

# 웹앱 실행

quasar 설치

```
yarn global add @quasar/cli
cd /server/quasar-project
git checkout master
git pull
pm2 start "quasar dev" --daemon --name webapp
```

# 웹앱 서비스가 443 으로 시작 않될 때

```
#netstat -nltp | grep 443
```

있는 지 확인. 만일 apache 가 실행되고 있다면

```
/etc/init.d/apache2 stop
```

실행후 443 포트 셧다운후 재시작
