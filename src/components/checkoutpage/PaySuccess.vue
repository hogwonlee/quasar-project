<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h3">{{ selected_local.paymentsuccess }}</div>
      <q-btn
        :label="selected_local.gotodeliveryinfovue"
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
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
        couponList: state => state.coupon.items,
      }),
    },
    data() {
      return {
        postJsonData: [{paymentkey: '', amount: 0, orderId: ''}],
      };
    },
    computed: {
      ...mapGetters('cart', {
        cartItems: 'getCartItems',
        cartTotalPrice: 'cartTotalPrice',
      }),
      ...mapActions('cart', ['checkout']),
      ...mapActions('coupon', ['setStatusAction', '']),
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
            if (res.status == 200) {
              // console.log(JSON.stringify(res.data));
              this.set_order_with_address(await this.get_address_id());
            } else {
              console.log(
                '결제오류 났으면 PayFail 페이지로 이동해야 하지 않나?',
              );
            }
          })
          .catch(e => console.error(e));
      },

      set_order_with_address(address_id) {
        var coupon = this.couponList.find(item => item.coupon_use_reserve == 1);
        const query_data = {
          user_id: this.user.USER_ID,
          address_id: address_id,
          order_data: this.cartItems,
          food_price: this.cartTotalPrice,
          total_price: this.postJsonData.amount,
          used_coupon_id: coupon == undefined ? null : coupon.coupon_id,
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
              this.$store.dispatch('coupon/setStatusAction', ''); // 결제 후 나의 보유 쿠폰 상태를 갱신할 수 있도록 스테이터스를 초기화
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
