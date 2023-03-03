<template>
  <div class="cart">
    <h2>Your Cart</h2>
    <p v-show="!products.length">
      <i>Please add some products to cart.</i>
    </p>
    <div class="row">
      <OrderItemInfo
        class="col-2"
        style="padding: 10px"
        v-for="product in products"
        :key="product.id"
        v-bind="product"
        v-bind:itemCount="product.quantity"
      />
    </div>
    <p>Total: {{ total }}</p>
    <p>
      <q-btn
        style="background: goldenrod; color: white"
        :disabled="!products.length"
        @click="this.basic = true"
      >
        결제하기
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
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex';
  import OrderItemInfo from 'components/OrderItemInfo.vue';
  import {ref} from 'vue';
  import {loadTossPayments} from '@tosspayments/payment-sdk';
  const clientKey = 'test_ck_Lex6BJGQOVD5xn945RarW4w2zNbg';

  export default {
    name: 'OrderList',
    components: {
      OrderItemInfo,
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
      }),
      ...mapGetters('cart', {
        products: 'cartProducts',
        total: 'cartTotalPrice',
      }),
    },
    methods: {
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
      };
    },
  };
</script>
