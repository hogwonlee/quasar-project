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
          readonly
          disable
          v-model="userNickname"
          :label="selected_local.name"
        />

        <q-input
          filled
          v-model="userPhone"
          :label="selected_local.tel"
          label-color="black"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '']"
        />

        <div class="q-gutter-sm q-ma-sm">
          <q-btn
            :label="selected_local.confirm"
            type="submit"
            color="positive"
            outline
            v-close-popup
          />
          <q-btn
            :label="selected_local.cancel"
            color="negative"
            outline
            v-close-popup
          />
          <q-btn
            :label="selected_local.reinput"
            type="reset"
            color="positive"
            outline
          />
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
  import configs from '/src/configs';
  // import https from 'https';
  import secuirity from 'src/util/modules/security';

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

        axios({
          url: `${configs.server}/changeuserinfo`,
          method: 'POST',
          // httpsAgent: new https.Agent({
          //            rejectUnauthorized: false,
          //          }),
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
          .catch(res => {
            alert.confirm(
              this.selected_local.err,
              this.selected_local.err + ': ' + res.data.content,
            );
            console.log('에러: ' + res);
          });
      },

      onReset() {
        this.userId = this.user.USER_ID;
        this.userNickname = this.user.USER_NAME;
        this.userPhone = this.user.USER_PHONE;
      },
    },
  };
</script>
