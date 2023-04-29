<template>
  <q-page class="q-pa-md">
    <section v-if="user_status">
      <!-- <div class="text-h3">내 정보</div> -->
      <q-card class="row bg-teal-2" flat>
        <q-input
          :model-value="selected_local.myinfo"
          readonly
          class="col-12"
        ></q-input>
        <q-input
          :model-value="user.USER_NAME"
          :label="selected_local.name"
          readonly
          class="q-pl-lg col-6"
        ></q-input>
        <q-input
          :model-value="user.USER_PHONE"
          :label="selected_local.tel"
          readonly
          class="col-6"
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
            } else if (res.msg == 'error') {
              alert.confirm(
                this.selected_local.notice,
                this.selected_local.wrongpw,
              );
            }
          })

          .catch(res => {
            console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
          });
      },
    },
  });
</script>
