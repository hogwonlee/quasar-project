<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h3">주문 완료!</div>
      <q-btn
        label="주문 현황 확인하기"
        tag="a"
        to="/DeliveryInfo"
        color="positive"
        outline
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
        cartTotalPrice: 'cartTotalPrice',
        cartProducts: 'cartProducts',
        shipment: 'shipmentPrice',
      }),

      ...mapActions('cart', ['checkout']),
      ...mapActions('coupon', ['setStatusAction', '']),
      ...mapState({
        user: state => state.user.USER,
        addressList: state => state.address.items,
        selected_local: state => state.ui_local.status,
        couponList: state => state.coupon.items,
        coupon_status: state => state.coupon.status,
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
        var amountOfPayment = this.cartTotalPrice + this.shipment - 3000;
        console.log(
          '가격 비교: ' +
            amountOfPayment +
            '불러온 가격: ' +
            requestData.amount,
        );
        axios({
          url: 'https://api.tosspayments.com/v1/payments/confirm',
          method: 'POST',

          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: `Basic ${configs.secretKey}`,
            // 'Basic base64(test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R:)', //test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R / test_sk_O6BYq7GWPVvMvkJbLpw3NE5vbo1d
          },

          data: requestData,
        })
          .then(async res => {
            if (res.status == 200) {
              // console.log(JSON.stringify(res.data));
              if (this.cartTotalPrice >= 50000) {
                this.get_eventCoupon();
              }
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
              this.$store.dispatch('order/setStatusAction', 'buy complete');
              this.read_coupon();
            }
          })
          .catch(res => console.log('에러: ' + res));
      },
      read_coupon() {
        if (this.coupon_status != null) {
          // console.log('쿠폰데이터 불러오기');
          axios({
            url: `${configs.server}/mycoupon`,
            // httpsAgent: new https.Agent({
            //              rejectUnauthorized: false,
            //            }),
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: this.user.USER_TOKEN,
            },
            data: {
              user_id: this.user.USER_ID,
              user_name: this.user.USER_NAME,
            },
          })
            .then(res => {
              if (res.status == 200) {
                this.$store.dispatch('coupon/emptyCouponAction');
                if (res.data.results.length > 0) {
                  res.data.results.forEach(coupon => {
                    if (coupon.available === 1) {
                      this.$store.dispatch('coupon/addCouponAction', coupon);
                    }
                  });
                }
                this.$store.dispatch('coupon/setStatusAction', null);
              } else {
                alert.confirm(
                  this.selected_local.err,
                  this.selected_local.err + ': ' + res.data.content,
                );
              }
            })
            .catch(res => {
              console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
            });
        }
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
