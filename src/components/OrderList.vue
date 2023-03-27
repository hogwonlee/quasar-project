<template>
  <div class="cart q-ma-md">
    <div v-if="this.isLoggedIn">
      <div>배송 주소 이름: {{ this.address_selected.address_tag }}</div>
      <div>수령인: {{ this.address_selected.recipient }}</div>
      <div>주소: {{ this.address_selected.recipient_phone }}</div>
      <div>
        {{
          this.address_selected.address1 +
          this.address_selected.address2 +
          this.address_selected.address3
        }}
      </div>
    </div>
    <q-btn
      color="primary"
      label="주소 변경/등록"
      tag="a"
      to="/AddressList"
    ></q-btn>
    <p v-show="!cart.length">
      <i>상품을 추가해주세요.</i>
    </p>
    <div class="row">
      <OrderItemInfo
        @sendOrderItem="addProductToCart(product)"
        @sendRemoveItem="removeProductFromCart(product)"
        @sendDeleteItem="deleteProductFromCart(product)"
        class="col-1"
        style="padding: 10px"
        v-for="product in cart"
        :key="product.id"
        v-bind="product"
        v-bind:item-count="product.quantity"
      />
    </div>

    <q-markup-table flat bordered class="q-ma-md justify-center">
      <tbody items-center>
        <tr class="row">
          <td class="text-left bg-teal col-4">주문 금액:</td>
          <td class="text-right col-8">{{ total }} 원</td>
        </tr>
        <tr class="row">
          <td class="text-left bg-teal col-4">배송비:</td>
          <td class="text-right col-8">
            <q-chip
              dense
              color="teal"
              icon="new_releases"
              label="2만원 이상 구매 시 무료 배송"
              text-color="white"
            />
            {{ shipment }} 원
          </td>
        </tr>
        <tr class="row">
          <td class="text-left bg-teal col-4">총:</td>
          <td class="text-right col-8">{{ total + shipment }} 원</td>
        </tr>
      </tbody>
    </q-markup-table>

    <p>
      <q-btn
        style="background: slateblue; color: white"
        :disabled="!cart.length"
        @click="selectPaymentmethod(total, shipment)"
      >
        결제하기
      </q-btn>

      <q-btn
        v-if="!this.isLoggedIn"
        style="background: slateblue; color: white"
        @click="login_popup"
        label="로그인"
      >
      </q-btn>
      <!-- v-if="this.isLoggedIn" -->
      <q-btn
        style="background: slateblue; color: white"
        @click="logout"
        label="로그아웃"
      >
      </q-btn>
    </p>
    <p v-show="checkoutStatus">checkout {{ checkoutStatus }}.</p>

    <q-dialog v-model="basic" @show="selectPaymentmethod(total)">
      <q-card>
        <q-card-section>
          <div class="text-h6">결제 수단</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p id="payment-method"></p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="결제" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><LoginPage
    /></q-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex';
  import OrderItemInfo from 'components/OrderItemInfo.vue';
  import LoginPage from 'components/LoginPage.vue';
  import {ref} from 'vue';
  import {loadTossPayments} from '@tosspayments/payment-sdk';
  import user from 'src/store/user/userInfo';
  import address from 'src/store/user/addressInfo';
  import cart from 'src/store/cartList';
  // import order from 'src/store/orderList';
  import axios from 'axios';

  // import order from 'src/store/orderList';

  import {Cookies, useQuasar} from 'quasar';
  import {json} from 'body-parser';
  const clientKey = 'test_ck_Lex6BJGQOVD5xn945RarW4w2zNbg';

  export default {
    name: 'OrderList',
    components: {
      OrderItemInfo,
      LoginPage,
    },
    data() {
      return {
        user_name: user.state.USER_NAME,
        address_selected: '',
      };
    },
    watch: {
      user_name: function (val) {},
      isLoggedIn: function (val) {},
    },
    setup() {
      const $q = useQuasar();
      function confirm() {
        $q.dialog({
          title: 'Confirm',
          message: '로그아웃 되었습니다.',
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            // console.log('>>>> OK')
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
      return {
        confirm,
      };
    },
    mounted() {
      // this.logout();
      this.address_selected = this.getSelectedAddress();

      if (
        user.state.USER_ID == '' ||
        user.state.USER_ID == undefined ||
        user.state.USER_ID == null
      ) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    },

    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        cart: state => state.cart.all,
        addresses: state => state.addresses.items, // store/index에 addresses로 추가됨.
        user: state => state.all,
        order: state => state.all,
      }),
      ...mapGetters('cart', {
        cart: 'cartProducts',
        cartItems: 'getCartItems',
        total: 'cartTotalPrice',
        shipment: 'shipmentPrice',
      }),
      ...mapGetters('addresses', {
        addressInfo: 'addressInfo',
      }),
    },
    methods: {
      logout() {
        user.dispatch('logoutAction');
      },
      getSelectedAddress() {
        var address_selected;
        address.state.items.forEach(addr => {
          if (addr.is_default === 1) {
            console.log(addr.recipient + addr.address1);
            address_selected = addr;
          }
        });
        return address_selected;
      },

      set_order(address_id) {
        // 구매 요청 보내기 = 서버 DB에 주문 데이터 넣기
        axios({
          url: 'http://localhost:3001/orderGroupResister',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: user.state.USER_TOKEN,
          },

          data: {address_id: address_id},
        })
          .then(res => {
            // console.log(
            //   '주문 등록 응답값: ' + JSON.stringify(res.data.results),
            // );
            const orderData = JSON.parse(JSON.stringify(this.cartItems));
            orderData.forEach(data => (data['order_group'] = res.data.results));

            // console.log(JSON.stringify(orderData));
            this.set_order_with_address(orderData);
          })
          .catch(res => console.log('에러: ' + res));
      },
      set_order_with_address(orderData) {
        axios({
          url: 'http://localhost:3001/orderResister',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: user.state.USER_TOKEN,
          },

          data: orderData,
        })
          .then(res => {
            console.log(
              '주문 등록 응답값: ' + JSON.stringify(res.data.results),
            );
          })
          .catch(res => console.log('에러: ' + res));
      },
      check_login() {
        if (user.state.USER_ID == '') {
          return false;
        } else {
          return true;
        }
      },
      check_null_address() {
        if (address.state.post_code == '') {
          return false;
        } else {
          return true;
        }
      },
      login_popup() {
        if (!this.check_login) {
          alert('로그인이 필요합니다.');
          return;
        }
        if (!this.check_null_address) {
          alert('배송할 주소를 등록/선택해 주세요.');
          return;
        }
        this.persistent = true;
      },
      ...mapActions('cart', ['addProductToCart']),
      ...mapActions('cart', ['removeProductFromCart']),
      ...mapActions('cart', ['deleteProductFromCart']),
      selectPaymentmethod(total, shipment) {
        var amountOfPayment = total + shipment;
        // console.log(amountOfPayment);
        loadTossPayments(clientKey).then(tossPayments =>
          tossPayments.requestPayment('카드', {
            amount: amountOfPayment,
            orderId: 'test2-gO43carKfiyo7_KPPa-YM',
            orderName: '토스 티셔츠 외 2건',
            customerName: '박토스',
            successUrl: 'http://localhost:9000/#/Success',
            failUrl: 'http://localhost:9000/#/Fail',
          }),
        );
      },
      ...mapActions('cart', ['checkout']),
    },

    setup() {
      return {
        basic: ref(false),
        persistent: ref(false),
        isLoggedIn: ref(false),
      };
    },
  };
</script>
