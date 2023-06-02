<template>
  <div>
    <!-- <q-dialog persistent transition-show="scale" transition-hide="scale"> -->
    <q-card class="bg-teal text-black">
      <q-card-section>
        <div class="text-h6">{{ selected_local.signup }}</div>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="userId"
          :label="selected_local.identity"
          :hint="selected_local.idhint"
          lazy-rules
          :rules="[val => (val && val.length > 0) || hint]"
        />

        <q-input
          filled
          v-model="userNickname"
          :label="selected_local.name"
          :hint="selected_local.namehint"
          lazy-rules
          :rules="[val => (val && val.length > 0) || hint]"
        />

        <q-input
          filled
          v-model="userPhone"
          :label="selected_local.tel"
          :hint="selected_local.telhint"
          mask="(###)####-####"
          lazy-rules
          :rules="[val => (val && val.length > 0) || hint]"
        />

        <!-- <q-toggle v-model="accept" :label="selected_local.licenseterms" /> -->

        <q-input
          filled
          v-model="userPw"
          :type="ispwd ? 'password' : 'text'"
          :label="selected_local.password"
          :hint="selected_local.passwordhint"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || hint,
            val => (val && val.length > 0) || hint,
            val => (val && val.length > 0) || hint,
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
          :rules="[this.value == this.userPw || hint]"
        >
          <template v-slot:append>
            <q-icon
              :name="ispwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="ispwd = !ispwd"
            />
          </template>
        </q-input>

        <div class="row justify-center q-gutter-sm">
          <q-btn
            :label="selected_local.signup"
            class="col-5"
            type="submit"
            color="primary"
            v-close-popup
            :disable="
              this.userPw != this.userPwCheck ||
              this.userId == '' ||
              this.userPw == '' ||
              this.userNickname == '' ||
              this.userPhone == ''
            "
          />
          <q-btn
            :label="selected_local.cancel"
            class="col-5"
            color="primary"
            v-close-popup
          />
          <!-- <q-btn
            label="다시 입력"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          /> -->
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
          url: 'http://localhost:3001/register',
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
                '중복 아이디가 있어서 다른 아이디로 생성 바랍니다.',
              );
            }
          })
          .catch(res => console.log('에러: ' + res));
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
