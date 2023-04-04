<template>
  <q-page class="q-pa-xl">
    <section v-if="check_login()">
      <div class="text-h3">내 정보</div>
      <q-btn label="내 정보 변경" @click="this.changeInfoDialog = true"></q-btn>
      <div class="text-h6">이름: {{ user_name_get }}</div>
      <div class="text-h6">전화번호: {{ user_phone_get }}</div>
      <AddressList />
    </section>
    <section v-else>
      로그인 정보가 없습니다. 로그인 해주세요.
      <q-btn
        style="background: slateblue; color: white"
        @click="this.persistent = true"
        label="로그인"
      ></q-btn>
    </section>
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><LoginPage
    /></q-dialog>
    <q-dialog
      v-model="checkPasswordDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">비밀번호 확인</div>
        </q-card-section>

        <q-form @submit="checkpw" @reset="onReset" class="q-gutter-md">
          <q-input
            readonly
            disable
            v-model="user_id_get"
            label="아이디"
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

          <div>
            <q-btn label="확인" type="submit" color="primary" v-close-popup />
            <q-btn label="취소" color="primary" v-close-popup />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="changeInfoDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><ChangeInfo
    /></q-dialog>
  </q-page>
</template>

<script>
  import {defineComponent, ref} from 'vue';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import user from 'src/store/user/userInfo';
  import LoginPage from 'components/LoginPage.vue';
  import AddressList from 'components/AddressList.vue';
  import ChangeInfo from 'components/ChangeInfo.vue';
  import check from 'src/util/modules/check';
  import axios from 'axios';

  export default defineComponent({
    name: 'UserInfo',
    components: {
      LoginPage,
      AddressList,

      ChangeInfo,
    },
    data: function () {
      return {
        userPw: '',
        persistent: ref(false),
        checkPasswordDialog: ref(false),
        changeInfoDialog: ref(false),
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
    watch: {
      user_name_get: function (val) {
        console.log(val);
      },
      user_phone_get: function (val) {
        console.log(val);
      },
    },
    setup() {
      return {};
    },
    methods: {
      check_login() {
        return check.check_login();
      },
      showDialog() {
        console.log('열려라!');
      },
      checkpw() {
        const userData = {
          user_id: this.user_id_get,
          user_pw: this.userPw,
        };

        axios({
          url: 'http://localhost:3001/checkpw',
          method: 'POST',
          data: userData,
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: user.state.USER.USER_TOKEN,
          },
        })
          .then(res => {
            // console.log(JSON.stringify(res.status));
            if (res.status == 200) {
              // 정보변경창(ChangeInfo.vue)을 열어줘야 함.
              this.changeInfoDialog = true;
            } else {
              alert.confirm('오류', '비밀번호가 틀렸습니다.');
            }
          })
          .catch(res => console.log('에러: ' + res));
      },
    },
  });
</script>
