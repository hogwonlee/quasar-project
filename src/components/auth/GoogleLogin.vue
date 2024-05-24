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
      };
    },
    mounted() {
      this.googleLogin();
    },
    methods: {
      googleLogin() {
        const url = new URLSearchParams(window.location.hash.substring(1));
        this.accessToken = url.get('access_token');
        console.log('accessToken: ' + this.accessToken);

        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${this.accessToken}`,
          )
          .then(function (response) {
            console.log('get요청: ' + response + JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log('url: ' + url + '' + 'get요청: ' + error);
          });
      },
    },
  });
</script>
