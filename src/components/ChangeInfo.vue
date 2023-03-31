<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">정보 변경</div>
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
          filled
          v-model="userNickname"
          label="이름"
          hint="사용자의 이름을 입력하세요"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || '사용자의 이름을 입력하세요',
          ]"
        />

        <q-input
          filled
          v-model="userPhone"
          label="전화번호"
          hint="전화번호를 입력하세요"
          lazy-rules
          :rules="[val => (val && val.length > 0) || hint]"
        />

        <div>
          <q-btn label="변경하기" type="submit" color="primary" v-close-popup />
          <q-btn label="취소" color="primary" v-close-popup />
          <q-btn label="다시 입력" type="reset" color="primary" />
          <q-btn
            label="비밀번호 변경"
            color="primary"
            v-close-popup
            @click="this.changePasswordWindow = true"
          ></q-btn>
        </div>
      </q-form>
    </q-card>
    <q-dialog
      v-model="changePasswordWindow"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><ChangePassword
    /></q-dialog>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import user from 'src/store/user/userInfo';
  import ChangePassword from './ChangePassword.vue';

  export default {
    components: {
      ChangePassword,
    },
    setup() {
      var userId = ref(null);
      var userNickname = ref(null);
      var userPhone = ref(null);
      var changePasswordWindow = ref(false);

      return {
        userId: user.getters.getMyId,
        userNickname: user.getters.getMyName,
        userPhone: user.getters.getMyPhone,
        changePasswordWindow,

        onSubmit() {
          const userData = {
            user_id: userId.value,
            user_name: userNickname.value,
            user_phone: userPhone.value,
          };

          //회원가입 등록 요청 보내기
          axios({
            url: 'http://localhost:3001/changeuserinfo',
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: user.state.USER_TOKEN,
            },

            data: userData,
          })
            .then(alert.confirm('알림', '정보 변경 완료했습니다.'))
            .catch(res => console.log('에러: ' + res));
        },

        onReset() {
          userNickname.value = null;
          userPhone.value = null;
        },
      };
    },
  };
</script>
