<template>
  <q-page class="q-pa-xl">
    <section v-if="check_login()">
      <div class="text-h3">내 정보</div>
      <q-btn
        label="내 정보 변경"
        @click="this.CheckPasswordDialog = true"
      ></q-btn>
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
      <q-dialog
        v-model="persistent"
        persistent
        transition-show="scale"
        transition-hide="scale"
        ><LoginPage
      /></q-dialog>
      <q-dialog
        v-model="CheckPasswordDialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
        ><CheckPassword
      /></q-dialog>
    </section>
  </q-page>
</template>

<script>
  import {defineComponent, ref} from 'vue';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import user from 'src/store/user/userInfo';
  import LoginPage from 'components/LoginPage.vue';
  import AddressList from 'components/AddressList.vue';
  import CheckPassword from 'components/CheckPassword.vue';
  import check from 'src/util/modules/check';

  export default defineComponent({
    name: 'UserInfo',
    components: {
      LoginPage,
      AddressList,
      CheckPassword,
    },
    data: function () {
      return {
        persistent: ref(false),
        CheckPasswordDialog: ref(false),
      };
    },
    computed: {
      ...mapState({
        user: state => state.all,
      }),

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
    },
  });
</script>
