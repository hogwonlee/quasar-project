<template>
  <div class="q-pa-md">
    <div v-if="this.is_addr_added">
      <q-card class="my-card">
        <q-card-section
          v-for="addr in addressList"
          :key="addr.id"
          v-bind="addr"
          :class="addr.is_default ? 'bg-info' : 'bg-grey-1'"
        >
          <q-radio
            v-if="addr.is_default"
            v-model="shape"
            :val="check_default_address(addr)"
            checked-icon="task_alt"
            class="absolute-top-right q-ma-md"
            unchecked-icon="panorama_fish_eye"
            label="배송지로 선택됨"
          />
          <q-btn
            v-if="!addr.is_default"
            color="primary"
            class="absolute-top-right q-ma-md"
            label="이 배송지로 변경"
            @click="confirm(addr.address_tag, addr.address_id)"
          ></q-btn>
          <div class="text-h6">배송지 이름: {{ addr.address_tag }}</div>
          <div class="text-subtitle2">수령인: {{ addr.recipient }}</div>
          <!-- <div class="text-h6">배송지 ID: {{ addr.address_id }}</div> -->
          <div class="text-subtitle2">전화번호: {{ addr.recipient_phone }}</div>
          <div class="text-subtitle2">우편번호: {{ addr.post_code }}</div>
          <div class="text-subtitle2">
            주소:
            {{ addr.address1 + ' ' + addr.address2 + ' ' + addr.address3 }}
          </div>
          <!-- <div class="text-subtitle2">기본 배송지: {{ addr.is_default }}</div> -->
          <!-- <q-separator color="primary"></q-separator> -->
        </q-card-section>
      </q-card>
    </div>
    <div v-else>등록된 주소가 없습니다. 주소를 등록해주시기 바랍니다.</div>
    <div class="q-pt-md row">
      <q-btn
        icon="add"
        color="info"
        class="col-12"
        label="신규 주소 등록"
        tag="a"
        to="/AddressRegister"
      ></q-btn>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapState} from 'vuex';
  import address from 'src/store/user/addressInfo';
  import user from 'src/store/user/userInfo';
  import {ref} from 'vue';
  import {Cookies, useQuasar} from 'quasar';
  import check from 'src/util/modules/check';
  import validation from 'src/util/data/validation';

  export default defineComponent({
    name: 'AddressList',
    data: function () {
      return {
        is_addr_added: ref(false),
      };
    },
    components: {},
    computed: {
      ...mapState({
        address: state => state.all,
        user: state => state.all,
      }),
      user_id_get: user.getters.getMyId,
      user_token_get: user.getters.getMyToken,
      user_name_get: user.getters.getMyName,
      addressList: address.getters.getAddressList,
    },
    watch: {
      addressList: function (val) {
        console.log(val);
      },
      user_id_get: function (val) {
        console.log(val);
      },
      user_token_get: function (val) {
        console.log(val);
      },
      user_name_get: function (val) {
        console.log(val);
      },
    },
    created() {},
    mounted() {
      this.is_addr_added = !validation.isNull(this.addressList);
      console.log(
        'state all ' +
          JSON.stringify(user.state) +
          '토큰' +
          this.user_token_get,
      );

      if (check.check_login() && !this.is_addr_added) {
        axios({
          url: 'http://localhost:3001/addressInfo',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user_token_get,
          },
          data: {
            user_id: this.user_id_get,
            user_name: this.user_name_get,
          },
        })
          .then(res => {
            res.data.results.forEach(addr => {
              console.log('주소 조회 => 수령인 확인: ' + addr.recipient);
              address.dispatch('addAddressAction', addr);
            });
          })
          .catch(res => {
            console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
          });
      }
    },
    methods: {
      // check_login() {
      //   if (validation.isNull(Cookies.get('user'))) {
      //     return false;
      //   } else {
      //     return true;
      //   }
      // },
      check_default_address(addr) {
        if (addr.is_default == 1) {
          return 'line';
        } else {
          return '';
        }
      },
      change_default_address(address_id) {
        axios({
          url: 'http://localhost:3001/addressChangeDefaultAddress',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: user.state.USER_TOKEN,
          },
          data: {user_id: user.state.USER_ID, address_id: address_id},
        })
          .then(res => {
            address.dispatch('emptyAddressAction');
            res.data.results.forEach(addr => {
              // console.log('수령인 확인: ' + addr.recipient);
              address.dispatch('addAddressAction', addr);
            });
          })
          .catch(res => {
            console.log('에러:' + res);
          });
      },
    },
    setup() {
      const $q = useQuasar();
      function confirm(address_tag, address_id) {
        $q.dialog({
          title: 'Confirm',
          message: '이 배송지로 변경하시겠습니까? (' + address_tag + ')',
          cancel: true,
          persistent: false,
        }).onOk(() => {
          this.change_default_address(address_id);
        });
      }
      return {
        confirm,
        shape: ref('line'),
      };
    },
  });
</script>
