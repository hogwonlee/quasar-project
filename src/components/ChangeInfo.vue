<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card class="bg-white text-black" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-black">{{ selected_local.changemyinfo }}</div>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset">
        <q-input
          filled
          readonly
          disable
          v-model="userId"
          :label="selected_local.identity"
        />

        <q-input
          filled
          v-model="userNickname"
          :label="selected_local.name"
          label-color="black"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '']"
        />

        <q-input
          filled
          v-model="userPhone"
          :label="selected_local.tel"
          label-color="black"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '']"
        />

        <div class="q-gutter-sm q-py-sm">
          <q-btn
            :label="selected_local.confirm"
            type="submit"
            color="primary"
            v-close-popup
          />
          <q-btn :label="selected_local.cancel" color="primary" v-close-popup />
          <q-btn :label="selected_local.reinput" type="reset" color="primary" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import axios from 'axios';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import alert from 'src/util/modules/alert';

  export default {
    data() {
      return {
        userId: '',
        userNickname: '',
        userPhone: '',
        changePasswordWindow: ref(false),
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
          user_name: this.userNickname,
          user_phone: this.userPhone,
        };

        //회원가입 등록 요청 보내기
        axios({
          url: 'http://localhost:3001/changeuserinfo',
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
              this.$store.dispatch('user/updateAction', userData);
              alert.confirm(
                this.selected_local.notice,
                this.selected_local.changemyinfosuccess,
              );
            } else {
              alert.confirm(
                this.selected_local.err,
                this.selected_local.err + ': ' + res.data.content,
              );
            }
          })
          .catch(res => console.log('에러: ' + res));
      },

      onReset() {
        this.userId = this.user.USER_ID;
        this.userNickname = this.user.USER_NAME;
        this.userPhone = this.user.USER_PHONE;
      },
    },
  };
</script>
