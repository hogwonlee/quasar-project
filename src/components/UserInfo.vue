<template>
  <q-page class="q-pa-md">
    <section v-if="user_status">
      <!-- <div class="text-h3">내 정보</div> -->
      <q-card class="row q-pl-lg bg-teal-4">
        <q-input
          :model-value="user.USER_NAME"
          :label="selected_local.name"
          readonly
          class="col-3"
        ></q-input>
        <q-input
          :model-value="user.USER_PHONE"
          :label="selected_local.tel"
          readonly
          class="col-9"
        ></q-input>

        <div class="absolute-top-right q-gutter-sm q-pt-sm q-pr-sm">
          <q-btn
            color="primary"
            :label="selected_local.changemyinfo"
            @click="this.checkPasswordDialog = true"
          ></q-btn>
          <q-btn
            color="primary"
            :label="selected_local.changepassword"
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
          <div class="text-h6">{{ selected_local.confirmpassword }}</div>
        </q-card-section>

        <q-form @submit="checkpw" @reset="onReset" class="q-gutter-md">
          <q-input
            readonly
            disable
            v-model="user.USER_ID"
            :label="selected_local.identity"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || selected_local.essential,
            ]"
          />

          <q-input
            filled
            v-model="userPw"
            :label="selected_local.password"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || selected_local.essential,
            ]"
          />

          <div>
            <q-btn
              :label="selected_local.confirm"
              type="submit"
              color="primary"
              v-close-popup
            />
            <q-btn
              :label="selected_local.cancel"
              color="primary"
              v-close-popup
            />
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
      ...mapState({
        user_status: state => state.user.status,
        user: state => state.user.USER,
        selected_local: state => state.ui_local.status,
      }),
    },
    watch: {},

    methods: {
      checkpw() {
        const userData = {
          user_id: this.user.USER_ID,
          user_pw: this.userPw,
        };

        axios({
          url: 'http://localhost:3001/checkpw',
          method: 'POST',
          data: userData,
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
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
                this.selected_local.err,
                this.selected_local.errpassword,
              );
            }
          });
      },
    },
  });
</script>
