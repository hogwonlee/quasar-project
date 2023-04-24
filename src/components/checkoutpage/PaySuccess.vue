<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h1">결제성공</div>
      <q-btn
        label="주문 현황 확인"
        tag="a"
        to="/DeliveryInfo"
        color="primary"
      ></q-btn>
    </section>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapGetters, mapState, mapActions} from 'vuex';

  export default defineComponent({
    name: 'PaySuccess',
    mounted() {
      this.paymentAuthorizationRequest();
    },
    data() {
      return {
        postJsonData: [{paymentkey: '', amount: 0, orderId: ''}],
      };
    },
    computed: {
      ...mapGetters('cart', {
        cartItems: 'getCartItems',
      }),
      ...mapActions('cart', ['checkout']),
      ...mapState({
        user: state => state.user.USER,
        addressList: state => state.address.items,
      }),
    },
    methods: {
      readResData() {
        let url = new URL(window.location.href);
        this.postJsonData = {
          paymentKey: url.searchParams.get('paymentKey'),
          amount: url.searchParams.get('amount'),
          orderId: url.searchParams.get('orderId'),
        };
      },

      paymentAuthorizationRequest() {
        this.readResData();
        const requestData = this.postJsonData;
        axios({
          url: 'https://api.tosspayments.com/v1/payments/confirm',
          method: 'POST',

          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization:
              'Basic dGVzdF9za19PNkJZcTdHV1BWdk12a0piTHB3M05FNXZibzFkOg==',
            // 'Basic base64(test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R:)', //test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R / test_sk_O6BYq7GWPVvMvkJbLpw3NE5vbo1d
          },

          data: requestData,
        })
          .then(async res => {
            console.log(JSON.stringify(res.data));
            this.set_order_with_address(await this.get_address_id());
          })
          .catch(e => console.error(e));
      },

      set_order_with_address(address_id) {
        const query_data = {
          user_id: this.user.USER_ID,
          address_id: address_id,
          order_data: this.cartItems,
        };
        // console.log(JSON.stringify(query_data.order_data));
        axios({
          url: 'http://localhost:3001/orderRegister',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: query_data,
        })
          .then(res => {
            if (res.status == 200) {
              this.$store.dispatch('cart/checkout');
            }
          })
          .catch(res => console.log('에러: ' + res));
      },

      get_address_id() {
        var return_addr;
        this.addressList.forEach(addr => {
          if (addr.is_default === 1) {
            return_addr = addr;
          }
        });
        return return_addr;
      },
    },
  });
</script>
