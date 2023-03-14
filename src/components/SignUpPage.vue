<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- <q-dialog persistent transition-show="scale" transition-hide="scale"> -->
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Sign Up</div>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="userId"
          label="아이디"
          hint="사용할 아이디를 입력하세요"
          lazy-rules
          :rules="[val => (val && val.length > 0) || hint]"
        />

        <q-input
          filled
          v-model="userNickname"
          label="이름"
          hint="(필수)배송 받을 분의 이름을 입력하세요"
          lazy-rules
          :rules="[
            val =>
              (val && val.length > 0) ||
              '(필수)배송 받을 분의 이름을 입력하세요',
          ]"
        />

        <q-input
          filled
          v-model="userPw"
          label="비밀번호"
          hint="(필수)비밀번호를 입력하세요"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || '(필수)비밀번호를 입력하세요',
          ]"
        />

        <q-input
          filled
          v-model="userPwCheck"
          label="비밀번호 일치확인"
          hint="(필수)비밀번호를 다시 한번 입력하세요"
          lazy-rules
          :rules="[this.value == this.userPw || hint]"
        />

        <q-input
          filled
          v-model="userPhone"
          label="전화번호"
          hint="(필수)전화번호를 입력하세요"
          lazy-rules
          :rules="[val => (val && val.length > 0) || hint]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn
            label="가입하기"
            type="submit"
            color="primary"
            v-close-popup
            :disable="this.userPw != this.userPwCheck"
          />
          <q-btn label="취소" type="submit" color="primary" v-close-popup />
          <q-btn
            label="다시 입력"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </q-card>
    <!-- </q-dialog> -->
  </div>
</template>

<script>
  import {useQuasar} from 'quasar';
  import {ref} from 'vue';
  import axios from 'axios';
  import {data} from 'browserslist';

  export default {
    setup() {
      const $q = useQuasar();

      var userNickname = ref(null);
      var userPw = ref(null);
      var userPwCheck = ref(null);
      const accept = ref(false);
      var userId = ref(null);
      var userPhone = ref(null);

      return {
        userId,
        userNickname,
        userPw,
        accept,
        userPwCheck,
        userPhone,
        // onSubmit() {
        //   console.log(userId.value + userNickname.value);
        // },
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
            const userData = {
              user_id: userId.value,
              user_pw: userPw.value,
              user_name: userNickname.value,
              user_phone: userPhone.value,
            };

            //회원가입 등록 요청 보내기
            axios({
              url: 'http://localhost:3001/register',
              method: 'POST',
              headers: {
                'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
              },

              data: userData,
            })
              .then()
              .catch(res => console.log('에러: ' + res));
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
