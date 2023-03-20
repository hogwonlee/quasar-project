<template>
  <div class="cart q-ma-md">
    <h4>
      로그인 유저:
      {{ this.$user }}
    </h4>
    <div text-body2>{{ addressInfo }}</div>
    <q-btn label="주소 변경/등록" tag="a" to="/AddressList"></q-btn>
    <p v-show="!cart.length">
      <i>Please add some products to cart.</i>
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
        @click="this.basic = true"
      >
        결제하기
      </q-btn>

      <q-btn
        v-if="!this.isLoggedIn"
        style="background: slateblue; color: white"
        @click="this.persistent = true"
        label="로그인"
      >
      </q-btn>
      <q-btn
        v-if="this.isLoggedIn"
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
  import {Cookies} from 'quasar';
  const clientKey = 'test_ck_Lex6BJGQOVD5xn945RarW4w2zNbg';

  export default {
    name: 'OrderList',
    components: {
      OrderItemInfo,
      LoginPage,
    },
    data() {
      return {};
    },
    watch: {
      myName:
        Cookies.get('user') == undefined ? '' : Cookies.get('user').user_name,
    },
    mounted() {
      console.log(
        Cookies.get('user') == undefined ? '' : Cookies.get('user').user_name,
      );
      console.log('vuex' + user.state.USER_NAME);
      if (Cookies.has('user')) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    unmounted() {
      // console.log(this.myName);
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        cart: state => state.cart.all,
        addresses: state => state.addresses.itmes,
        user: state => state.all,
      }),
      ...mapGetters('cart', {
        cart: 'cartProducts',
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
      ...mapActions('cart', ['addProductToCart']),
      ...mapActions('cart', ['removeProductFromCart']),
      ...mapActions('cart', ['deleteProductFromCart']),
      selectPaymentmethod(amountOfPayment) {
        // console.log(amountOfPayment);
        loadTossPayments(clientKey).then(tossPayments =>
          tossPayments.requestPayment('카드', {
            amount: amountOfPayment,
            orderId: 'gO43carKfiyo7_KPPa-YM',
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
