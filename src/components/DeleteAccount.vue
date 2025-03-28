<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card class="bg-white text-black" style="width: 300px">
      <q-card-section>
        <div class="text-h6">
          {{
            selected_local.chinafood == '洽洽中国食品' ? '删除账号' : '계정삭제'
          }}
        </div>
      </q-card-section>

      <q-form @submit="onSubmit" @reset="onReset">
        <q-input filled v-model="userId" :label="selected_local.identity" />

        <q-input
          filled
          readonly
          disable
          v-model="userNickname"
          :label="selected_local.name"
          :hint="selected_local.auto_input"
        />

        <q-input
          filled
          v-model="userPw"
          :type="isPwd ? 'password' : 'text'"
          :label="selected_local.password"
          label-color="black"
          lazy-rules
          :rules="[
            val => (val && val.length > 0) || selected_local.passwordhint,
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="q-gutter-sm q-py-sm">
          <q-btn
            :label="
              selected_local.chinafood == '洽洽中国食品'
                ? '删除账号'
                : '계정삭제'
            "
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
  import {defineComponent} from 'vue';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import configs from '/src/configs';
  // import https from 'https';
  // import security from 'src/util/modules/security';

  export default defineComponent({
    data() {
      return {
        userId: '',
        userNickname: '',
        userPw: '',
        isPwd: true,
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
          user_pw: this.userPw,
        };

        //회원가입 등록 요청 보내기
        axios({
          url: `${configs.server}/deleteAccount`,
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
              this.$store.dispatch('user/logoutAction');
              alert.confirm(
                this.selected_local.notice,
                selected_local.chinafood == '洽洽中国食品'
                  ? '删除已账号'
                  : '계정 삭제가 완료되었습니다.',
              );
            } else {
              alert.confirm(
                this.selected_local.err,
                selected_local.chinafood == '洽洽中国食品'
                  ? '删除账号失败'
                  : '계정 삭제가 실패되었습니다.',
              );
            }
          })
          .catch(res => {
            alert.confirm(
              this.selected_local.err,
              selected_local.chinafood == '洽洽中国食品'
                ? '发生系统错误'
                : '시스템 장애가 발생하였습니다.',
            );
            console.log(res);
          });
      },

      onReset() {
        this.userId = this.user.USER_ID;
        this.userNickname = this.user.USER_NAME;
        this.userPw = null;
      },
    },
    setup() {
      return {};
    },
  });
</script>
