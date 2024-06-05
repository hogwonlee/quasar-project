<template>
  <div class="q-pa-xs q-gutter-sm">
    <div
      id="g_id_onload"
      data-client_id="309960454694-47es81c2o8919hstmgaog7dngsmogfrh.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="redirect"
      data-login_uri="https://cfomarket.store"
      data-itp_support="true"
    ></div>

    <div
      class="g_id_signin"
      data-type="standard"
      data-shape="rectangular"
      data-theme="outline"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
    ></div>
    <!-- <q-dialog persistent transition-show="scale" transition-hide="scale"> -->
    <q-card class="bg-white text-black">
      <q-card-section>
        <div class="text-h6">{{ selected_local.login }}</div>
      </q-card-section>

      <q-form @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="userId" :label="selected_local.identity" />
        <!-- lazy-rules
          :rules="[val => (val && val.length > 0) || '필수 입력']" -->

        <q-input
          filled
          v-model="userPw"
          :label="selected_local.password"
          :type="isPwd ? 'password' : 'text'"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-checkbox
          v-model="auto_login"
          :label="selected_local.auto_login"
          color="positive"
        ></q-checkbox>

        <div class="q-gutter-xs q-py-xs">
          <q-btn
            :label="selected_local.login"
            color="positive"
            outline
            @click="serverLogin"
          />
          <q-btn
            :label="selected_local.forgetpw"
            color="positive"
            outline
            @click="show_forget_pw"
          />
          <q-btn
            :label="selected_local.signup"
            @click="this.signUpWindow = true"
            color="positive"
            outline
          />
        </div>
        <q-btn
          label="구글 로그인"
          @click="googleLogin"
          color="positive"
          outline
        ></q-btn>
        <q-btn
          label="구글 로그아웃"
          @click="logout"
          color="negative"
          outline
        ></q-btn>
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

<script type="module">
  import {defineComponent, ref} from 'vue';
  import SignUpPage from 'components/SignUpPage.vue';
  import axios from 'axios';
  import {mapActions, mapMutations, mapState} from 'vuex';
  // import check from 'src/util/modules/check';
  import alert from 'src/util/modules/alert';
  import configs from 'src/configs/';

  export default defineComponent({
    components: {
      SignUpPage,
    },
    data() {
      return {
        userPw: '',
        userId: '',
      };
    },
    computed: {
      ...mapState({
        user: state => state.user.USER,
        address: state => state.address.items.all,
        selected_local: state => state.ui_local.status,
      }),
    },
    methods: {
      show_forget_pw() {
        alert.confirm(
          this.selected_local.forget_pw_title,
          this.selected_local.forget_pw_body,
        );
      },

      async serverLogin() {
        // debugger;
        // if (!check.check_login()) {
        const userData = {
          user_id: this.userId,
          user_pw: this.userPw,
        };
        // console.log(JSON.stringify(userData));
        let response = await axios({
          url: `${configs.server}/login`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
          },
          data: userData,
        }).catch(response => {
          console.log(JSON.stringify(response));
          alert.confirm(
            this.selected_local.notice,
            this.selected_local.wrongpw +
              ': [' +
              this.selected_local.identity +
              ': ' +
              userData.user_id +
              '] [' +
              this.selected_local.password +
              ': ' +
              userData.user_pw +
              ']',
          );
        });

        // .then(response => {
        //   console.log(JSON.stringify(response));
        //   if (response.status == 200) {
        var json = response.data;

        if (this.auto_login) {
          json.user_pw = userData.user_pw;
        } else {
          json.user_pw = '';
        }
        this.$store.dispatch('user/loginAction', {
          data: json,
          that: this,
        });
        // this.$store.dispatch('address/emptyAddressAction');
        // json.results.forEach(addr => {
        //   if (addr.address_active == 1)
        //     this.$store.dispatch('address/addAddressAction', addr);
        // });
        // } else {
        //   console.log('what error');
        // }
        // })
        // .catch(ex => {
        //   //expected error
        //   if (ex.response && ex.response.status == 400) {
        //     alert.confirm(
        //       this.selected_local.notice,
        //       this.user.USER_ID + this.selected_local.wrongpw,
        //     );
        //   } else {
        //     //unexpected
        //     console.log('로그인 중 예상치 못한 오류가 발생했습니다.');
        //   }
        // });
        // } else {
        //   var alert_msg = this.user.USER_NAME + selected_local.loginnotice;
        //   alert.confirm(selected_local.notice, alert_msg);
        // }
      },
      onReset() {
        userId.value = null;
        userPw.value = null;
        accept.value = false;
      },
      googleLogin() {
        window.location.href = 'https://cfomarket.store:3000/auth/google';
        // window.location.href =
        //   'https://accounts.google.com/o/oauth2/auth?' +
        //   'client_id=309960454694-47es81c2o8919hstmgaog7dngsmogfrh.apps.googleusercontent.com&' +
        //   'redirect_uri=https://cfomarket.store/__/auth/handler&' +
        //   'response_type=token&' +
        //   'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
      },
      fetchUser() {
        axios
          .get('http://cfomarket.store:3000/user', {withCredentials: true})
          .then(response => {
            this.user = response.data;
            console.log(
              '구글로그인정보: ' + this.user + JSON.stringify(this.user),
            );
          })
          .catch(() => {
            this.user = null;
          });
      },
      logout() {
        axios
          .get('http://cfomarket.store:3000/logout', {withCredentials: true})
          .then(() => {
            this.user = null;
          });
      },
    },
    created() {
      this.fetchUser();
    },

    setup() {
      const accept = ref(false);
      return {
        accept,
        isPwd: ref(true),
        signUpWindow: ref(false),
        auto_login: ref(true),
      };
    },
  });
</script>
