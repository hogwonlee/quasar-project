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
  import {mapGetters, mapState, mapActions} from 'vuex';
  import alert from 'src/util/modules/alert';
  import user from 'src/store/user/userInfo';
  import ChangePassword from './ChangePassword.vue';

  export default {
    components: {
      ChangePassword,
    },
    data() {
      return {
        userId: '',
        userNickname: '',
        userPhone: '',
        changePasswordWindow: ref(false),
      };
    },
    computed: {
      ...mapState({
        user: state => state.all,
      }),
      user_id_get: user.getters.getMyId,
      user_name_get: user.getters.getMyName,
      user_phone_get: user.getters.getMyPhone,
    },
    mounted() {
      this.onReset();
    },
    methods: {
      onSubmit() {
        const userData = {
          user_id: this.userId,
          user_name: this.userNickname,
          user_phone: this.userPhone,
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
          .then(res => {
            // user vuex 내용 변경
            console.log(JSON.stringify(res));
            user.dispatch('updateAction', userData);
            alert.confirm('알림', '정보 변경 완료했습니다.');
          })
          .catch(res => console.log('에러: ' + res));
      },

      onReset() {
        this.userId = this.user_id_get;
        this.userNickname = this.user_name_get;
        this.userPhone = this.user_phone_get;
      },
    },
  };
</script>
