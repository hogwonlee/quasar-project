<template>
  <q-page class="q-pa-md">
    <section v-if="user_status">
      <!-- <div class="text-h3">내 정보</div> -->
      <q-card class="row q-pl-lg bg-teal-4">
        <q-input
          :model-value="user_name_get"
          label="이름: "
          readonly
          class="col-3"
        ></q-input>
        <q-input
          :model-value="user_phone_get"
          label="전화번호: "
          readonly
          class="col-9"
        ></q-input>

        <div class="absolute-top-right q-gutter-sm q-pt-sm q-pr-sm">
          <q-btn
            color="primary"
            label="내 정보 변경"
            @click="this.checkPasswordDialog = true"
          ></q-btn>
          <q-btn
            color="primary"
            label="비밀번호 변경"
            @click="this.changePasswordDialog = true"
          ></q-btn>
        </div>
      </q-card>
      <!-- <div class="text-h6">이름: {{ user_name_get }}</div>
      <div class="text-h6">전화번호: {{ user_phone_get }}</div> -->

      <AddressList />
    </section>
    <section v-else class="row justify-center vertical-center">
      <LoginPage />
      <q-btn @click="check_login" label="로그인 상태 확인"> </q-btn>
      <q-btn @click="check_name" label="로그인 이름 확인"> </q-btn>
      {{ user_status }}
    </section>
    <!-- <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><LoginPage
    /></q-dialog> -->
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
    <q-dialog
      v-model="changePasswordDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><ChangePassword
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
  import ChangePassword from 'components/ChangePassword.vue';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';

  export default defineComponent({
    name: 'UserInfo',
    components: {
      LoginPage,
      AddressList,
      ChangeInfo,
      ChangePassword,
    },
    data: function () {
      return {
        userPw: '',
        persistent: ref(false),
        checkPasswordDialog: ref(false),
        changeInfoDialog: ref(false),
        changePasswordDialog: ref(false),
      };
    },
    computed: {
      user_status() {
        return user.state.status;
      },
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

    methods: {
      check_login() {
        console.log(user.state.status);
      },
      check_name() {
        console.log(user.state.USER.USER_NAME);
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
    },
  });
</script>
