<template>
  <div class="q-pa-xs q-gutter-sm">
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
        ></q-checkbox>

        <div class="q-gutter-xs q-py-xs">
          <q-btn
            :label="selected_local.login"
            color="primary"
            @click="serverLogin"
          />
          <q-btn
            :label="selected_local.forgetpw"
            color="primary"
            @click="show_forget_pw"
          />
          <q-btn
            :label="selected_local.signup"
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
  import {defineComponent, ref} from 'vue';
  import SignUpPage from 'components/SignUpPage.vue';
  import axios from 'axios';
  import {mapActions, mapMutations, mapState} from 'vuex';
  // import check from 'src/util/modules/check';
  import alert from 'src/util/modules/alert';
  import configs from 'src/configs/';
  // import https from 'https';
  // import security from 'src/util/modules/security';

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
            this.selected_local.identity +
              ': ' +
              userData.user_id +
              '\n' +
              this.selected_local.password +
              ': ' +
              userData.user_pw +
              '\n' +
              this.selected_local.wrongpw,
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
