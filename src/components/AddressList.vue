<template>
  <div class="q-pa-md">
    <q-btn label="신규 주소 등록" tag="a" to="/AddressRegister"></q-btn>
    <q-card class="my-card bg-secondary text-white">
      <q-card-section v-for="addr in addressList" :key="addr.id" v-bind="addr">
        <q-radio
          v-model="shape"
          :val="check_default_address(addr)"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          label="기본 배송지"
        />
        <div class="text-h6">배송지 이름: {{ addr.address_tag }}</div>
        <div class="text-subtitle2">수령인: {{ addr.recipient }}</div>
        <!-- <div class="text-h6">배송지 ID: {{ addr.address_id }}</div> -->
        <div class="text-subtitle2">전화번호: {{ addr.recipient_phone }}</div>
        <div class="text-subtitle2">우편번호: {{ addr.post_code }}</div>
        <div class="text-subtitle2">
          주소: {{ addr.address1 + ' ' + addr.address2 + ' ' + addr.address3 }}
        </div>
        <!-- <div class="text-subtitle2">기본 배송지: {{ addr.is_default }}</div> -->
        <!-- <q-separator color="primary"></q-separator> -->
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapState} from 'vuex';
  import address from 'src/store/user/addressInfo';
  import user from 'src/store/user/userInfo';
  import {Cookies} from 'quasar';
  import {ref} from 'vue';

  export default defineComponent({
    name: 'AddressList',
    data() {
      return {
        addressList: address.state.items,
      };
    },
    components: {},
    computed: {
      ...mapState({
        address: state => state.all,
        user: state => state.all,
      }),
    },
    created() {},
    mounted() {
      if (this.check_login() && address.state.length <= 0) {
        axios({
          url: 'http://localhost:3001/userInfo',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: user.state.USER_TOKEN,
          },
          data: {user_id: user.state.USER_ID, user_name: user.state.USER_NAME},
        })
          .then(res => {
            res.data.results.forEach(addr => {
              // console.log('수령인 확인: ' + addr.recipient);
              address.dispatch('addAddressAction', addr);
            });
          })
          .catch(res => {
            console.log('에러:' + res);
          });
      }
    },
    methods: {
      check_login() {
        if (Cookies.get('user') == '') {
          return false;
        } else {
          return true;
        }
      },
      check_default_address(addr) {
        if (addr.is_default == 1) {
          return 'line';
        } else {
          return '';
        }
      },
    },
    setup() {
      return {
        shape: ref('line'),
      };
    },
  });
</script>
