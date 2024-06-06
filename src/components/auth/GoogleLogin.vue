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
          .then(function (response_google) {
            console.log(
              'get요청: ' +
                response_google +
                JSON.stringify(response_google.data),
            );

            const googleUserData = {
              user_id: response_google.data.email,
              user_pw: this.accessToken,
              user_name: response_google.data.user_name,
              user_token: this.accessToken,
            };
            // console.log(JSON.stringify(userData));
            let response = axios({
              url: `${configs.server}/google_login`,
              method: 'POST',
              headers: {
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
              },
              data: googleUserData,
            }).catch(response => {
              // console.log(JSON.stringify(response));
              console.log('구글에서 토큰을 잘못 받은듯합니다.');
              // alert.confirm(
              //   this.selected_local.notice,
              //   this.selected_local.wrongpw +
              //     ': [' +
              //     this.selected_local.identity +
              //     ': ' +
              //     googleUserData.user_id +
              //     '] [' +
              //     this.selected_local.password +
              //     ': ' +
              //     googleUserData.user_pw +
              //     ']',
              // );
            });

            var json = response.data;
            json.user_pw = '';
            this.$store.dispatch('user/loginAction', {
              data: json,
              that: this,
            });
            // window.location.href = 'https://cfomarket.store/UserInfo';
          })
          .catch(function (error) {
            console.log('url: ' + url + '' + 'get요청: ' + error);
          });
      },
    },
  });
</script>
