<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- <q-dialog persistent transition-show="scale" transition-hide="scale"> -->
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="userId"
          label="아이디"
          hint="아이디를 입력하세요"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '필수 입력']"
        />

        <q-input
          filled
          v-model="userPw"
          label="비밀번호"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '필수 입력']"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn
            label="로그인"
            type="submit"
            color="primary"
            v-close-popup
            @click="serverLogin"
          />
          <q-btn
            label="다시 입력"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn
            label="회원가입"
            @click="this.signUpWindow = true"
            color="primary"
          />
        </div>
      </q-form>
    </q-card>
    <q-dialog
      v-model="signUpWindow"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><SignUpPage
    /></q-dialog>
    <!-- </q-dialog> -->
  </div>
</template>

<script>
  import {useQuasar} from 'quasar';
  import {ref} from 'vue';
  import SignUpPage from 'components/SignUpPage.vue';
  import axios from 'axios';
  import {mapActions, mapMutations, mapState} from 'vuex';
  import user from 'src/store/user/userInfo';

  // import {data} from 'browserslist';
  // import {url} from 'inspector';

  export default {
    components: {
      SignUpPage,
    },
    data() {
      return {};
    },
    computed: {
      ...mapState({
        user: state => state.all,
      }),
    },
    methods: {},

    setup() {
      var userId = ref(null);
      var userPw = ref(null);

      const $q = useQuasar();
      const accept = ref(false);

      return {
        userId,
        userPw,
        accept,

        signUpWindow: ref(false),

        onSubmit() {
          if (accept.value !== true) {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'You need to accept the license and terms first',
            });
          } else {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted',
            });
          }
        },
        serverLogin() {
          // console.log(mapState('user', ['USER_ID']));
          if (user.state.USER_ID == '') {
            const userData = {
              user_id: userId.value,
              user_pw: userPw.value,
            };

            //로그인 요청 보내기 (axios)
            // axios({
            //   url: 'http://localhost:3001/login',
            //   method: 'POST',
            //   headers: {
            //     'Access-Control-Allow-Headers': '*',
            //     'Content-Type': 'application/json',
            //   },

            //   data: userData,
            // })
            axios
              .post('http://localhost:3001/login', userData)
              .then(async response => {
                // console.log('응답 타입' + typeof response.data.content);
                // console.log('최초 응답 접근' + response.data.content.user_id);
                // var stringJson = JSON.stringify(response.data.content);
                // console.log('string 실 데이터' + stringJson);
                // var json = JSON.parse(stringJson);
                // console.log('json 실 데이터' + json);
                // console.log('json 실 데이터 접근' + json.user_id);
                console.log('json 실 데이터' + response.data);
                console.log('응답 데이터' + response.data.results);
                console.log('토큰 데이터' + response.data.token);
                var json = response.data;
                // console.log(response.data.results[0]);
                user.dispatch('loginAction', json);

                // this.$router.go(-1); // 한단계 전단계로 이동
                // console.log(mapState('user', ['USER_ID']) + '맵스테이트접근');
                // console.log('직접접근:' + user.state.USER_ID);
              })
              .catch(response => console.log('에러: ' + response));
          } else {
            alert(user.state.USER_NAME + '님, 이미 로그인 되어 있습니다.');
          }
        },
        onReset() {
          userId.value = null;
          userPw.value = null;
          accept.value = false;
        },
      };
    },
  };
</script>
