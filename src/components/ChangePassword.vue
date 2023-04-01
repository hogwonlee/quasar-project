<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">비밀번호 변경</div>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          readonly
          disable
          v-model="userId"
          label="아이디"
          lazy-rules
          :rules="[val => (val && val.length > 0) || hint]"
        />

        <q-input
          readonly
          disable
          v-model="userNickname"
          label="이름"
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

        <div>
          <q-btn
            label="비밀번호 변경하기"
            type="submit"
            color="primary"
            v-close-popup
            :disable="this.userPw != this.userPwCheck"
          />
          <q-btn label="취소" color="primary" v-close-popup />
          <q-btn label="다시 입력" type="reset" color="primary" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import user from 'src/store/user/userInfo';

  export default {
    setup() {
      var userId = ref(null);
      var userNickname = ref(null);
      var userPw = ref(null);
      var userPwCheck = ref(null);

      return {
        userId: user.getters.getMyId,
        userNickname: user.getters.getMyName,
        userPw,
        userPwCheck,

        onSubmit() {
          const userData = {
            user_id: userId.value,
            user_pw: userPw.value,
          };

          //회원가입 등록 요청 보내기
          axios({
            url: 'http://localhost:3001/changepw',
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: user.state.USER_TOKEN,
            },

            data: userData,
          })
            .then(alert.confirm('알림', '비밀번호 변경 완료했습니다.'))
            .catch(res => console.log('에러: ' + res));
        },

        onReset() {
          userPw.value = null;
          userPwCheck.value = null;
        },
      };
    },
  };
</script>
