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
    mounted() {
      this.googleLogin();
    },
    methods: {
      googleLogin() {
        let url = new URL(window.location.href);
        const accessToken = url.searchParams.get('access_token');

        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
          )
          .then(function (response) {
            console.log('get요청: ' + response + JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log('get요청: ' + error);
          });
      },
    },
  });
</script>
