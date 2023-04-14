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
          label="기존 비밀번호"
          hint="(필수)기존 비밀번호를 입력하세요"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || '(필수)비밀번호를 입력하세요',
          ]"
        />

        <q-input
          filled
          v-model="newPw"
          label="비밀번호"
          hint="(필수)비밀번호를 입력하세요"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || '(필수)비밀번호를 입력하세요',
          ]"
        />

        <q-input
          filled
          v-model="newPwCheck"
          label="비밀번호 일치확인"
          hint="(필수)비밀번호를 다시 한번 입력하세요"
          lazy-rules
          :rules="[this.value == this.newPw || hint]"
        />

        <div>
          <q-btn
            label="비밀번호 변경하기"
            type="submit"
            color="primary"
            v-close-popup
            :disable="this.newPw != this.newPwCheck"
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
  import {mapGetters, mapState, mapActions} from 'vuex';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import user from 'src/store/user/userInfo';

  export default {
    data() {
      return {
        userId: '',
        userNickname: '',
        userPw: '',
        newPw: '',
        newPwCheck: '',
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
          user_pw: this.userPw,
          newPw: this.newPw,
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
          .then(res => {
            if (res.status == 200) {
              alert.confirm('알림', '비밀번호 변경 완료했습니다.');
            }
          })
          .catch(res => {
            if (res.status != 200) {
              alert.confirm(
                '오류 / 错误',
                '비밀번호가 올바르지 않습니다. / 密码错误',
              );
            }
          });
      },

      onReset() {
        this.userId = this.user_id_get;
        this.userNickname = this.user_name_get;
        this.userPw = null;
        this.newPw = null;
        this.newPwCheck = null;
      },
    },
    setup() {
      return {};
    },
  };
</script>
