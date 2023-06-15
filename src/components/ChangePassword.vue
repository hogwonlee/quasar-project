<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card class="bg-white text-black" style="width: 300px">
      <q-card-section>
        <div class="text-h6">{{ selected_local.changepw }}</div>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset">
        <q-input
          filled
          readonly
          disable
          v-model="userId"
          :label="selected_local.identity"
          hint="자동입력"
        />

        <q-input
          filled
          readonly
          disable
          v-model="userNickname"
          :label="selected_local.name"
          hint="자동입력"
        />

        <q-input
          filled
          v-model="userPw"
          :label="selected_local.oldpw"
          :hint="selected_local.inputoldpw"
          label-color="black"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || selected_local.passwordhint,
          ]"
        />

        <q-input
          filled
          v-model="newPw"
          :label="selected_local.password"
          :hint="selected_local.inputnewpw"
          label-color="black"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || selected_local.passwordhint,
          ]"
        />

        <q-input
          filled
          v-model="newPwCheck"
          :label="selected_local.matchpassword"
          :hint="selected_local.matchpasswordhint"
          label-color="black"
          lazy-rules
          :rules="[this.value == this.newPw || selected_local.passwordhint]"
        />

        <div class="q-gutter-sm q-py-sm">
          <q-btn
            :label="selected_local.changepw"
            type="submit"
            color="primary"
            v-close-popup
            :disable="this.newPw != this.newPwCheck"
          />
          <q-btn :label="selected_local.cancel" color="primary" v-close-popup />
          <q-btn :label="selected_local.reinput" type="reset" color="primary" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import configs from '/src/configs'

  export default defineComponent({
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
        user: state => state.user.USER,
        selected_local: state => state.ui_local.status,
      }),
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
          url: `${configs.server}/changepw`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },

          data: userData,
        })
          .then(res => {
            if (res.status == 200) {
              alert.confirm(
                this.selected_local.notice,
                this.selected_local.changepwsuccess,
              );
            } else {
              alert.confirm(
                this.selected_local.err,
                this.selected_local.errpassword,
              );
            }
          })
          .catch(res => {
            console.log(res);
          });
      },

      onReset() {
        this.userId = this.user.USER_ID;
        this.userNickname = this.user.USER_NAME;
        this.userPw = null;
        this.newPw = null;
        this.newPwCheck = null;
      },
    },
    setup() {
      return {};
    },
  });
</script>
