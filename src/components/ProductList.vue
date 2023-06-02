<template>
  <div>
    <q-input
      class="fixed-top-right z-top"
      input-class="text-right text-white"
      style="width: 150px; max-height: 50px"
      borderless
      v-model="keyword"
      label-color="white"
      :label="selected_local.search"
    >
      <!-- :label="selected_local.search" -->
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
    <q-page-sticky class="z-top" position="top-right" :offset="[0, 0]">
      <q-fab
        v-model="event_fab"
        label="이벤트안내(~23.05.31)"
        text-color="primary"
        vertical-actions-align="left"
        color="white"
        padding="none xl"
        icon="keyboard_arrow_down"
        direction="down"
      >
        <q-fab-action
          padding="3px"
          color="primary"
          label="가격 할인 이벤트"
          @click="list_show = true"
        />
        <q-card></q-card>
        <q-fab-action
          padding="3px"
          color="primary"
          label="?+1 이벤트"
          @click="list_show = true"
        />
      </q-fab>
    </q-page-sticky>
    <q-page-sticky class="z-top" position="bottom-right" :offset="[-15, 10]">
      <q-list v-if="list_show" bordered separator class="bg-primary">
        <q-item
          clickable
          v-ripple
          v-for="c in category"
          :key="c.category"
          v-bind="c"
        >
          <q-item-section @click="handleScroll(c.category)">
            <q-item-label overline class="text-white">{{
              c.category
            }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <!-- :label="selected_local.category" -->
      <q-btn
        fab
        :label="selected_local.category"
        color="primary"
        @click="list_show = !list_show"
      />
    </q-page-sticky>
    <div>
      <div class="row" v-for="c in category" :key="c.category" v-bind="c">
        <q-bar dense class="col-12 bg-teal text-white">
          <div :class="c.category">{{ c.category }}</div>
          <q-space />
        </q-bar>
        <ProductInfo
          class="col-xs-3 col-sm-3 col-md-1 q-pa-xs"
          v-for="product in products.filter(
            p => p.category == c.category && p.stored == 1,
          )"
          :key="product.id"
          v-bind="product"
          @setbuyoption="product.buyoption = $event"
          @setquantity="product.quantity = $event"
          @sendOrderItem="
            this.$store.dispatch('cart/addProductToCart', product)
          "
          @sendRemoveItem="
            this.$store.dispatch('cart/removeProductFromCart', product)
          "
        />
      </div>
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
    data() {
      return {
        childbuyoption: false,
      };
    },
    methods: {
      handleScroll(val) {
        console.log(val);
        let ele = document.querySelector('.' + val);
        let target = getScrollTarget(ele);
        let offset = ele.offsetTop - 50;
        const duration = 300;
        setVerticalScrollPosition(target, offset, duration);
      },
      products_update() {
        const params = {version: this.storeversion};
        console.log(params);
        // console.log(this.products_status);
        // if (this.products_status != null) {
        axios
          .get(
            'http://localhost:3001/productList',
            {params: params},
            // {
            //   headers: {
            //     'Access-Control-Allow-Headers': '*',
            //     'Content-Type': 'application/json',
            //   },
            // },
          )
          .then(res => {
            if (res.data.results == null) {
              console.log(res.data.msg);
            } else {
              // console.log(JSON.stringify(res.data.results));
              this.$store.dispatch('products/emptyStoreAction');
              res.data.results.map(element => {
                // console.log(element));
                this.$store.dispatch('products/getProductAction', element);
              });
              // console.log(res.data.category);
              this.$store.dispatch('category/emptyStoreAction');
              res.data.category.map(element => {
                this.$store.dispatch('category/getCategoryAction', element);
              });
              this.$store.dispatch(
                'products/getVersionAction',
                res.data.version,
              );
            }
          })
          .catch();
        // }
      },
      setproductbuyoption(product, buyoption) {
        product.buyoption = buyoption;
      },
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        products: state => state.products.all,
        storeversion: state => state.products.version,
        category: state => state.category.items,
        products_status: state => state.products.status,
        selected_local: state => state.ui_local.status,
      }),
    },
    mounted() {
      this.products_update();
    },
    setup() {
      return {
        list_show: ref(false),
        keyword: ref(''),
        event_fab: ref(false),
      };
    },
  });
</script>
