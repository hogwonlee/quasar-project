<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h3">주문 완료!</div>
      <q-btn
        label="주문 현황 확인하기"
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
  import configs from 'src/configs/';
  import alert from 'src/util/modules/alert';

  export default defineComponent({
    mounted() {
      this.paymentAuthorizationRequest();
    },

    data() {
      return {
        postJsonData: [{code: '', customerKey: ''}],
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
        selected_local: state => state.ui_local.status,
        couponList: state => state.coupon.items,
      }),
    },
    methods: {
      readResData() {
        let url = new URL(window.location.href);
        this.postJsonData = {
          grantType: 'AuthorizationCode',
          code: url.searchParams.get('code'),
          customerKey: url.searchParams.get('customerKey'),
        };
      },

      paymentAuthorizationRequest() {
        this.readResData();
        const requestData = this.postJsonData;
        // console.log(JSON.stringify(requestData));
        axios({
          url: 'https://api.tosspayments.com/v1/brandpay/authorizations/access-token',
          method: 'POST',

          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: `Basic ${configs.brandpaySecretKey}`,
          },
          data: JSON.stringify(requestData),
        })
          .then(res => {
            window.location.href = window.location.origin + '/Success';
            res.status(200).send('OK');
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
        console.log(JSON.stringify(query_data.order_data));
        axios({
          url: `${configs.server}/orderRegister`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: query_data,
        })
          .then(res => {
            // console.log(JSON.stringify(res));

            if (res.status == 200) {
              this.$store.dispatch('cart/checkout');
              this.$store.dispatch('coupon/setStatusAction', 'buy complete'); // 결제 후 나의 보유 쿠폰 상태를 갱신할 수 있도록 스테이터스를 초기화
              this.$store.dispatch('order/setStatusAction', 'buy complete'); // 결제 후 나의 보유 쿠폰 상태를 갱신할 수 있도록 스테이터스를 초기화
            }
          })
          .catch(res => console.log('에러: ' + res));
      },

      get_eventCoupon() {
        const query_coupon = {
          user_id: this.user.USER_ID,
          food_price: this.cartTotalPrice,
        };
        axios({
          url: `${configs.server}/giveCoupon`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: query_coupon,
        })
          .then(res => {
            if (res.status == 200) {
              alert.confirm(
                '50000원 구매 감사 이벤트',
                '50000원 이상 구매하셔서 3000원 쿠폰이 지급되었습니다. 사용기한은 3개월입니다. 3개월 이내에 꼭 사용해 주세요! 감사합니다!',
              );
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
        return return_addr.address_id;
      },
    },
  });
</script>
