<template>
  <div>
    <q-input
      class="fixed-top-right z-top"
      input-class="text-right text-white"
      style="width: 150px; max-height: 50px"
      borderless
      v-model="keyword"
      label="| 검색/搜索"
      label-color="white"
      lang="zh-CN"
    >
      <template v-slot:append>
        <q-icon
          v-if="keyword !== ''"
          name="close"
          @click="keyword = ''"
          class="cursor-pointer"
        />
        <q-icon name="search" color="white" />
      </template>
    </q-input>
    <q-page-sticky class="z-top" position="bottom-right" :offset="[-15, 120]">
      <q-list v-if="list_show" bordered separator class="bg-accent">
        <q-item clickable v-ripple>
          <q-item-section @click="handleScroll('饮料')">
            <q-item-label overline>饮料</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section @click="handleScroll('调味料')">
            <q-item-label overline>调味料</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section @click="handleScroll('零食')">
            <q-item-label overline>零食</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn fab label="种类" color="accent" @click="list_show = !list_show" />
    </q-page-sticky>
    <!-- </q-scroll-area> -->
    <!-- </q-drawer> -->
    <div class="row">
      <ProductInfo
        @sendOrderItem="this.$store.dispatch('cart/addProductToCart', product)"
        @sendRemoveItem="
          this.$store.dispatch('cart/removeProductFromCart', product)
        "
        class="col-xs-3 col-sm-3 col-md-2 q-pa-xs"
        v-for="product in products"
        :key="product.id"
        v-bind="product"
        :class="product.category"
      ></ProductInfo>
      <!-- v-bind:item-count="product.quantity" -->
      <!-- .filter(c =>
          c.product_name.includes(this.keyword),
        ) -->
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import ProductInfo from 'components/ProductInfo.vue';
  import {ref} from 'vue';
  import {mapState, mapActions} from 'vuex';
  import axios from 'axios';
  import {scroll} from 'quasar';
  const {getScrollTarget, setVerticalScrollPosition} = scroll;

  export default defineComponent({
    name: 'ProductList',
    components: {
      ProductInfo,
    },
    methods: {
      handleScroll(val) {
        let ele = document.querySelector('.' + val);
        // console.log('엘리 값:' + JSON.stringify(ele));
        let target = getScrollTarget(ele);
        let offset = ele.offsetTop;
        const duration = 300;
        setVerticalScrollPosition(target, offset, duration);
      },
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        products: state => state.products.all,
        products_status: state => state.products.status,
      }),
    },
    created() {
      if (this.products_status != null) {
        console.log(this.products_status);
        axios({
          url: 'http://localhost:3001/productList',
          method: 'GET',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
          },
        })
          .then(res => {
            // console.log(JSON.stringify(res.data.results));
            this.$store.dispatch('products/emptyStoreAction');
            res.data.results.map(element => {
              // console.log(element));
              this.$store.dispatch('products/getProductAction', element);
            });
          })
          .catch();
      }
    },
    setup() {
      return {
        list_show: ref(false),
        keyword: ref(''),
      };
    },
  });
</script>
