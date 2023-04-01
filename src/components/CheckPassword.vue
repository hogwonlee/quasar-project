<template>
  <div class="q-pa-md q-gutter-sm">
    <q-card class="bg-teal text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">비밀번호 확인</div>
      </q-card-section>

      <q-form @submit="checkpw" @reset="onReset" class="q-gutter-md">
        <q-input
          readonly
          disable
          v-model="userId"
          label="아이디"
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

        <div>
          <q-btn label="확인" type="submit" color="primary" v-close-popup />
          <q-btn label="취소" color="primary" v-close-popup />
        </div>
      </q-form>
    </q-card>
    <q-dialog
      v-model="changeInfoWindow"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><ChangeInfo
    /></q-dialog>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import axios from 'axios';
  import {mapActions, mapMutations, mapState} from 'vuex';
  import user from 'src/store/user/userInfo';
  import alert from 'src/util/modules/alert';
  import ChangeInfo from './ChangeInfo.vue';

  export default {
    components: {
      ChangeInfo,
    },
    data() {
      return {};
    },
    computed: {
      ...mapState({
        user: state => state.all,
      }),
    },
    methods: {},

    setup() {
      var userId = ref(null);
      var userPw = ref(null);

      return {
        userId: user.getters.getMyId,
        userPw,
        accept,

        changeInfoWindow: ref(false),

        checkpw() {
          const userData = {
            user_id: userId.value,
            user_pw: userPw.value,
          };

          axios({
            url: 'http://localhost:3001/checkpw',
            method: 'POST',
            data: userData,
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: user.state.USER_TOKEN,
            },
          })
            .then(res => {
              if (res.status() == 200) {
                this.changeInfoWindow = true;
              } else {
                alert.confirm('오류', '비밀번호가 틀렸습니다.');
              }
            })
            .catch(res => console.log('에러: ' + res));
        },
        onReset() {
          userId.value = null;
          userPw.value = null;
          accept.value = false;
        },
      };
    },
  };
</script>
