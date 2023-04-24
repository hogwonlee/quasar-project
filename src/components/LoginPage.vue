<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- <q-dialog persistent transition-show="scale" transition-hide="scale"> -->
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-form @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="userId"
          label="아이디"
          hint="아이디를 입력하세요"
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

        <div class="q-gutter-sm q-pa-sm">
          <q-btn
            label="로그인"
            type="submit"
            color="primary"
            v-close-popup
            @click="serverLogin"
          />
          <q-btn label="다시 입력" type="reset" color="primary" />
          <q-btn
            label="회원가입"
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
  import {ref} from 'vue';
  import SignUpPage from 'components/SignUpPage.vue';
  import axios from 'axios';
  import {mapActions, mapMutations, mapState} from 'vuex';
  import user from 'src/store/user/userInfo';
  import check from 'src/util/modules/check';
  import alert from 'src/util/modules/alert';

  export default {
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
      }),
    },
    methods: {
      serverLogin() {
        if (!check.check_login()) {
          const userData = {
            user_id: this.userId,
            user_pw: this.userPw,
          };

          axios
            .post('http://localhost:3001/login', userData)
            .then(response => {
              // console.log(JSON.stringify(response));
              var json = response.data;
              json.results.forEach(addr => {
                if (addr.address_active == 1)
                  this.$store.dispatch('address/addAddressAction', addr);

                // address.dispatch('addAddressAction', addr);
              });
              this.$store
                .dispatch('user/loginAction', json)
                // user
                //   .dispatch('loginAction', json)
                .then(
                  alert.confirm(
                    '알림',
                    user.state.status + '로그인 되었습니다.',
                  ),
                );
            })
            .catch(response => console.log('에러: ' + response));
        } else {
          var alert_msg =
            user.state.USER_NAME + '님, 이미 로그인 되어 있습니다.';
          alert.confirm('알림', alert_msg);
        }
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

        signUpWindow: ref(false),
      };
    },
  };
</script>
