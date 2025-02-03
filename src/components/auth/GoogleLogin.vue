<template>
  <div>
    <h3>구글 로그인 인증 리다이렉트</h3>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'GoogleLogin.vue',
    data() {
      return {
        accessToken: 'avc',
        params: {},
      };
    },
    mounted() {
      this.googleLogin();
    },
    methods: {
      googleLogin() {
        const url = new URLSearchParams(window.location.hash.substring(1));
        this.accessToken = url.get('code');
        console.log('code: ' + this.accessToken);
        /*
        code : 클라이언트 페이지에서 얻은 인가 코드를 사용 하기 때문에 "code"로 고정.
        client_id : 구글 개발자센터에서 발급 받은 Client ID
        client_secret : 구글 개발자센터에서 발급 받은 Client Secret
        redirect_uri : 구글 개발자센터에서 등록한 redirect_uri
        grant_type: 'authorization_code' 로 고정 (인가코드를 통한 로그인 방식)
        */
        axios
          .get(
            'https://oauth2.googleapis.com/',
            (params = {
              code: this.accessToken,
              client_id: '',
              client_secret: '',
              redirect_uri: 'http://localhost:9000/',
              grant_type: 'authorization_code',
            }),
          )
          .then(data => console.log('get요청: ' + JSON.stringify(data)))
          .catch(err => {
            console.log('오류 출력: ' + err);
          });
      },
    },
  });
</script>
