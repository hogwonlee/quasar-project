<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h1">내 정보</div>
      <q-btn @click="userInfo" label="로그인 유저 정보 확인"></q-btn>
      <div class="text-h3">이름: {{ myName }}</div>
      <div class="text-h3">전화번호: {{ myPhone }}</div>
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">수령인1: {{}}</div>
          <div class="text-subtitle2">우편번호: {{}}</div>
          <div class="text-subtitle2">배송주소: {{}}</div>
          <div class="text-subtitle2">배송지: 기본{{}}</div>
        </q-card-section>
        <q-separator dark />
        <q-card-section>
          <div class="text-h6">수령인2: {{}}</div>
          <div class="text-subtitle2">우편번호: {{}}</div>
          <div class="text-subtitle2">배송주소: {{}}</div>
          <div class="text-subtitle2">배송지: 비활성화{{}}</div>
        </q-card-section>
        <q-separator dark />
        <q-card-section>
          <div class="text-h6">수령인3: {{}}</div>
          <div class="text-subtitle2">우편번호: {{}}</div>
          <div class="text-subtitle2">배송주소: {{}}</div>
          <div class="text-subtitle2">배송지: 비활성화{{}}</div>
        </q-card-section>
        <q-separator dark />
        <q-card-section>
          <div class="text-h6">수령인4: {{}}</div>
          <div class="text-subtitle2">우편번호: {{}}</div>
          <div class="text-subtitle2">배송주소: {{}}</div>
          <div class="text-subtitle2">배송지: 비활성화{{}}</div>
        </q-card-section>
      </q-card>
    </section>
    <q-btn @click="getRequset"></q-btn>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import user from 'src/store/user/userInfo';
  import Cookie from 'js-cookie';

  export default defineComponent({
    name: 'UserInfo',
    data: function () {
      return {
        myAddress: '1',
        myName: '',
        myPhone: '',
      };
    },
    watch: {
      myName: function (val) {},
    },
    computed: {
      ...mapState({
        user: state => state.all,
      }),
    },
    watch: {
      myAddress: function (val) {}, //주문 수량 추가 시 화면에 바로 수량을 확인할 수 있도록 추가한 변수임.
      myName: function (val) {}, //주문 수량 추가 시 화면에 바로 수량을 확인할 수 있도록 추가한 변수임.
      myPhone: function (val) {}, //주문 수량 추가 시 화면에 바로 수량을 확인할 수 있도록 추가한 변수임.
    },
    setup() {
      return {
        userInfo() {
          console.log(user.state.USER_NAME);
        },
        getRequset() {
          axios
            .get('http://localhost:3001/')
            .then(res => {
              console.log(res.headers);
            })
            .catch(res => console.log('에러: ' + res));
        },
      };
    },
    mounted() {
      // this.myName = user.state.USER_NAME;
    },
  });
</script>
