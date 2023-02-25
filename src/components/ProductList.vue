<template>
  <q-input
    filled
    bottom-slots
    v-model="keyword"
    label="검색"
    counter
    maxlength="12"
    :dense="dense"
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

    <template v-slot:hint> 최대 12글자 </template>
  </q-input>
  <div class="row">
    <ProductInfo
      @sendOrderItem="addProductToCart(product)"
      class="col-2"
      style="padding: 10px"
      v-for="product in products.filter(c => c.title.includes(this.keyword))"
      :key="product.id"
      v-bind="product"
    />
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
    computed: mapState({
      products: state => state.products.all,
    }),
    methods: {
      ...mapActions('cart', ['addProductToCart']),
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
