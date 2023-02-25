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
      <button :disabled="!products.length" @click="checkout(products)">
        Checkout
      </button>
    </p>
    <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex';
  import OrderItemInfo from 'components/OrderItemInfo.vue';

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
      checkout(products) {
        this.$store.dispatch('cart/checkout', products);
      },
    },
  };
</script>
