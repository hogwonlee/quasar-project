<template>
  <div>
    <q-card class="bg-white text-black">
      <q-card-section>
        <div class="text-h6">{{ selected_local.signup }}</div>
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          for="user_id"
          filled
          v-model="userId"
          :label="selected_local.identity"
          :hint="selected_local.idhint"
          lazy-rules
          :rules="[
            val =>
              (!!val && val.length >= 6 && val.length <= 12) ||
              selected_local.idhint,
          ]"
        />
        <q-input
          for="user_name"
          filled
          v-model="userNickname"
          :label="selected_local.name"
          :hint="selected_local.namehint"
          lazy-rules
          :rules="[val => (!!val && val.length > 0) || selected_local.namehint]"
        />
        <q-input
          filled
          v-model="userPhone"
          :label="selected_local.tel"
          :hint="selected_local.telhint"
          type="tel"
          mask="(###)####-####"
          lazy-rules
          :rules="[
            val =>
              (!!val && val.length >= 13 && val.length <= 15) ||
              selected_local.telhint,
          ]"
        />
        <q-input
          filled
          v-model="userPw"
          :type="ispwd ? 'password' : 'text'"
          :label="selected_local.password"
          :hint="selected_local.passwordhint"
          lazy-rules
          :rules="[
            val =>
              (!!val && val.length >= 8 && val.length <= 16) ||
              selected_local.passwordhint,
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="ispwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="ispwd = !ispwd"
            />
          </template>
        </q-input>

        <q-input
          filled
          v-model="userPwCheck"
          :type="ispwd ? 'password' : 'text'"
          :label="selected_local.matchpassword"
          :hint="selected_local.matchpasswordhint"
          lazy-rules
          :rules="[
            val =>
              (!!val && val == this.userPw) || selected_local.matchpasswordhint,
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="ispwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="ispwd = !ispwd"
            />
          </template>
        </q-input>
        <div class="row justify-center q-gutter-sm q-py-sm">
          <q-btn
            :label="selected_local.signup"
            class="col-5"
            type="submit"
            color="primary"
            v-close-popup
            :disable="
              userPw != userPwCheck ||
              userId == null ||
              userPw == null ||
              userNickname == null ||
              userPhone == null ||
              userPwCheck == null ||
              userId.length < 6 ||
              userId.length > 12 ||
              userPhone.length < 13 ||
              userPhone.length > 15 ||
              userPw.length < 8 ||
              userPw.length > 16
            "
          />
          <q-btn
            :label="selected_local.cancel"
            class="col-5"
            color="primary"
            v-close-popup
          />
        </div>
      </q-form>
    </q-card>
    <!-- </q-dialog> -->
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';
  import {mapState} from 'vuex';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import configs from 'src/configs/';

  export default defineComponent({
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
    methods: {
      onSubmit() {
        const userData = {
          user_id: this.userId,
          user_pw: this.userPw,
          user_name: this.userNickname,
          user_phone: this.userPhone,
        };

        //회원가입 등록 요청 보내기
        axios({
          url: `${configs.server}/register`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
          },

          data: userData,
        })
          .then(res => {
            if (res.status == 200) {
              alert.confirm(
                this.selected_local.notice,
                this.selected_local.signupcomplete,
              );
            } else if (res.status == 400) {
              alert.confirm(
                this.selected_local.notice,
                this.selected_local.duplicate_id_warning,
              );
            }
          })
          .catch(res => {
            if (res.status == 400) {
              alert.confirm(
                this.selected_local.notice,
                this.selected_local.duplicate_id_warning,
              );
            }
          });
      },

      onReset() {
        this.userId = null;
        this.userPw = null;
      },
    },
    data: function () {
      return {
        userNickname: ref(null),
        userPw: ref(null),
        userPwCheck: ref(null),
        userId: ref(null),
        userPhone: ref(null),
        ispwd: ref(true),
      };
    },
  });
</script>
