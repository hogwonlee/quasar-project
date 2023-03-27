<template>
  <q-page class="q-pa-xl">
    <section v-if="check_login(loginData.user_id)">
      <div class="text-h3">내 정보</div>
      <div class="text-h6">이름: {{ loginData.user_name }}</div>
      <div class="text-h6">전화번호: {{ loginData.user_phone }}</div>
      <AddressList />
    </section>
    <section v-if="!check_login(loginData.user_id)">
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
    </section>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import user from 'src/store/user/userInfo';
  import LoginPage from 'components/LoginPage.vue';
  import AddressList from 'components/AddressList.vue';
  import validation from 'src/util/data/validation';

  export default defineComponent({
    name: 'UserInfo',
    components: {
      LoginPage,
      AddressList,
    },
    data: function () {
      return {
        is_logged_in: false,
        persistent: false,
        myAddress: '1',
        myName: '',
        myPhone: '',
        loginData: {
          user_id: user.state.USER_ID,
          user_name: user.state.USER_NAME,
          user_phone: user.state.USER_PHONE,
        },
      };
    },
    computed: {
      ...mapState({
        user: state => state.all,
      }),
    },
    watch: {
      loginData: function (val) {},
      is_logged_in: function (val) {},
    },
    setup() {
      return {};
    },
    methods: {
      check_login(login_id) {
        return validation.isNull(login_id);
      },
    },
  });
</script>
