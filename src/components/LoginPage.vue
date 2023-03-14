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
  // import {data} from 'browserslist';
  // import {url} from 'inspector';

  export default {
    components: {
      SignUpPage,
    },
    data() {
      return {
        userData: [],
      };
    },
    methods: {
      serverLogin() {
        this.userData.id = this.userId;
        this.userData.userPassword = this.userPw;
        axios
          .post('http://127.0.0.1:3001/login', {
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
            },
            data: {
              id: 1323,
              password: 'aslfsdlkfjeo',
            },
          })
          .then()
          .catch(res => console.log('에러: ' + res));
      },
    },
    setup() {
      const $q = useQuasar();

      const userId = ref(null);
      const userPw = ref(null);
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

        onReset() {
          userId.value = null;
          userPw.value = null;
          accept.value = false;
        },
      };
    },
  };
</script>
