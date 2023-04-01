<template>
  <div>
    <q-input
      filled
      bottom-slots
      v-model="keyword"
      label="검색/搜索"
      counter
      maxlength="12"
      :dense="dense"
      lang="zh-CN"
    >
      <template v-slot:append>
        <q-icon
          v-if="keyword !== ''"
          name="close"
          @click="keyword = ''"
          class="cursor-pointer"
        />
        <q-icon name="search" />
      </template>

      <template v-slot:hint> 최대 12글자/最多 12 个字 </template>
    </q-input>
    <div class="row">
      <ProductInfo
        @sendOrderItem="addProductToCart(product)"
        class="col-3"
        style="padding: 10px"
        v-for="product in products.filter(c => c.title.includes(this.keyword))"
        :key="product.id"
        v-bind="product"
        v-bind:item-count="product.quantity"
      />
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import ProductInfo from 'components/ProductInfo.vue';
  import {ref} from 'vue';
  import {mapState, mapActions} from 'vuex';

  export default defineComponent({
    name: 'ProductList',
    components: {
      ProductInfo,
    },
    methods: {
      ...mapActions('cart', ['addProductToCart']),
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        products: state => state.products.all,
      }),
    },
    created() {
      this.$store.dispatch('products/getAllProducts');
    },
    setup() {
      return {
        keyword: ref(''),
        dense: ref(false),
      };
    },
  });
</script>
