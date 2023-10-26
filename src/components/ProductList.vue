<template>
  <div>
    <q-input
      class="fixed-top-right z-top q-ma-xs"
      rounded
      standout
      dense
      outlined
      input-class=" text-right text-white"
      style="width: 40%"
      v-model="keyword"
      label-color="dark"
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
        <q-icon name="search" color="dark" />
      </template>
    </q-input>
    <!-- <q-page-sticky class="z-top" position="top-right" :offset="[0, 0]">
      <q-fab
        v-model="event_fab"
        label="이벤트안내(~23.12.31)"
        text-color="primary"
        vertical-actions-align="right"
        color="white"
        padding="none xl"
        icon="keyboard_arrow_down"
        direction="down"
      >
        <q-fab-action
          padding="3px"
          color="primary"
          label="회원 가입 이벤트"
          @click="register_event_info()"
        />
        <q-card></q-card>
        <q-fab-action
          padding="3px"
          color="primary"
          label="5353 쿠폰 이벤트"
          @click="coupon_5353_event()"
        />
      </q-fab>
    </q-page-sticky> -->
    <q-page-sticky class="z-top" position="bottom-right" :offset="[10, 10]">
      <q-fab
        v-model="list_show"
        persistent="false"
        :label="selected_local.category"
        direction="up"
        class="q-pa-none"
        color="dark"
        vertical-actions-align="right"
        icon="keyboard_arrow_up"
      >
        <q-fab-action
          :label="c.category"
          padding="0px"
          v-for="c in [
            category[10],
            category[11],
            category[9],
            category[8],
            category[7],
            category[6],
            category[5],
            category[3],
            category[2],
            category[1],
            category[0],
            category[4],
          ]"
          :key="c.category"
          v-bind="c"
          color="dark"
          class="q-my-none"
          @click="handleScroll(c.category)"
        />
      </q-fab>
    </q-page-sticky>
    <q-page-sticky class="z-top" position="bottom-left" :offset="[10, 10]">
      <q-btn
        label="다음"
        icon="keyboard_arrow_down"
        @click="show_offset()"
      ></q-btn>
    </q-page-sticky>
    <div>
      <div
        :v-if="load_time > 1"
        class="row"
        v-for="c in [category[4]]"
        :key="c.category"
        v-bind="c"
      >
        <q-bar dense class="col-12 bg-dark text-white">
          <div :class="c.category">{{ c.category }}</div>
          <q-space />
        </q-bar>
        <ProductInfo
          class="col-xs-4 col-sm-3 col-md-1 q-pa-xs"
          v-for="product in products.filter(
            p =>
              p.category == c.category &&
              p.stored == 1 &&
              (p.product_name + p.category + p.keyword)
                .toLowerCase()
                .includes(keyword.toLowerCase()),
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
      <div
        :v-if="load_time > 2"
        class="row"
        v-for="c in [category[0], category[1], category[2]]"
        :key="c.category"
        v-bind="c"
      >
        <q-bar dense class="col-12 bg-dark text-white">
          <div :class="c.category">{{ c.category }}</div>
          <q-space />
        </q-bar>
        <ProductInfo
          class="col-xs-4 col-sm-3 col-md-1 q-pa-xs"
          v-for="product in products.filter(
            p =>
              p.category == c.category &&
              p.stored == 1 &&
              (p.product_name + p.category + p.keyword)
                .toLowerCase()
                .includes(keyword.toLowerCase()),
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
      <div
        :v-if="load_time > 3"
        class="row"
        v-for="c in [category[3], category[5], category[6]]"
        :key="c.category"
        v-bind="c"
      >
        <q-bar dense class="col-12 bg-dark text-white">
          <div :class="c.category">{{ c.category }}</div>
          <q-space />
        </q-bar>
        <ProductInfo
          class="col-xs-4 col-sm-3 col-md-1 q-pa-xs"
          v-for="product in products.filter(
            p =>
              p.category == c.category &&
              p.stored == 1 &&
              (p.product_name + p.category + p.keyword)
                .toLowerCase()
                .includes(keyword.toLowerCase()),
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
      <div
        :v-if="load_time > 4"
        class="row"
        v-for="c in [category[7], category[8], category[9]]"
        :key="c.category"
        v-bind="c"
      >
        <q-bar dense class="col-12 bg-dark text-white">
          <div :class="c.category">{{ c.category }}</div>
          <q-space />
        </q-bar>
        <ProductInfo
          class="col-xs-4 col-sm-3 col-md-1 q-pa-xs"
          v-for="product in products.filter(
            p =>
              p.category == c.category &&
              p.stored == 1 &&
              (p.product_name + p.category + p.keyword)
                .toLowerCase()
                .includes(keyword.toLowerCase()),
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
      <div
        :v-if="load_time > 5"
        class="row"
        v-for="c in [category[11], category[10]]"
        :key="c.category"
        v-bind="c"
      >
        <q-bar dense class="col-12 bg-dark text-white">
          <div :class="c.category">{{ c.category }}</div>
          <q-space />
        </q-bar>
        <ProductInfo
          class="col-xs-4 col-sm-3 col-md-1 q-pa-xs"
          v-for="product in products.filter(
            p =>
              p.category == c.category &&
              p.stored == 1 &&
              (p.product_name + p.category + p.keyword)
                .toLowerCase()
                .includes(keyword.toLowerCase()),
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
    <q-page-container>
      <div class="q-gutter-md row inline">
        <q-field label="상호명" stack-label style="max-width: fit-content">
          <template v-slot:control>
            <div>중국식품온라인</div>
          </template>
        </q-field>
        <q-field label="대표자" stack-label style="max-width: fit-content">
          <template v-slot:control>
            <div>이호권</div>
          </template>
        </q-field>
        <q-field label="전화번호" stack-label style="max-width: fit-content">
          <template v-slot:control>
            <div>010-8492-0526</div>
          </template>
        </q-field>
        <q-field
          label="사업자등록번호"
          stack-label
          style="max-width: fit-content"
        >
          <template v-slot:control>
            <div>306-37-32411</div>
          </template>
        </q-field>
        <q-field label="사업장 주소" stack-label style="max-width: fit-content">
          <template v-slot:control>
            <div>서울시 구로구 천왕로 56 이펜하우스 3단지 303-1503</div>
          </template>
        </q-field>
      </div>
    </q-page-container>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import ProductInfo from 'components/ProductInfo.vue';
  import {ref} from 'vue';
  import {mapState, mapActions} from 'vuex';
  import axios from 'axios';
  import {scroll} from 'quasar';
  import alert from 'src/util/modules/alert';
  import validation from 'src/util/data/validation';
  import configs from 'src/configs/';
  import {dom} from 'quasar';
  const {offset} = dom;

  const {getScrollTarget, setVerticalScrollPosition} = scroll;

  export default defineComponent({
    name: 'ProductList',
    components: {
      ProductInfo,
    },
    data() {
      return {
        childbuyoption: false,
        load_time: 0,
      };
    },
    methods: {
      show_offset() {
        var pos_11 = document.querySelector('.' + this.category[10]).offsetTop;
        var pos_10 = document.querySelector('.' + this.category[11]).offsetTop;
        var pos_09 = document.querySelector('.' + this.category[9]).offsetTop;
        var pos_08 = document.querySelector('.' + this.category[8]).offsetTop;
        var pos_07 = document.querySelector('.' + this.category[7]).offsetTop;
        var pos_06 = document.querySelector('.' + this.category[6]).offsetTop;
        var pos_05 = document.querySelector('.' + this.category[5]).offsetTop;
        var pos_04 = document.querySelector('.' + this.category[3]).offsetTop;
        var pos_03 = document.querySelector('.' + this.category[2]).offsetTop;
        var pos_02 = document.querySelector('.' + this.category[1]).offsetTop;
        var pos_01 = document.querySelector('.' + this.category[0]).offsetTop;
        var pos_00 = document.querySelector('.' + this.category[4]).offsetTop;
        console.log(pos_00 + pos_10 + pos_01 + pos_02 + pos_03);
      },
      register_event_info() {
        alert.confirm(
          '회원 가입 이벤트 안내',
          '이벤트 기간동안 회원 가입만 하면 3천원 쿠폰을 지급합니다. (해당 쿠폰은 3만원 이상 구매 시 사용가능합니다. 받은 후 3개월 내에 사용하셔야 합니다.)',
        );
      },
      coupon_5353_event() {
        alert.confirm(
          this.selected_local.event_5353_info,
          this.selected_local.event_5353_detail,
        );
      },
      handleScroll(val) {
        console.log(val);
        let ele = document.querySelector('.' + val);
        let target = getScrollTarget(ele);
        let offset = ele.offsetTop - 50;
        // console.log('타겟위치: ' + target + '/offset 위치: ' + offset);
        const duration = 300;
        setVerticalScrollPosition(target, offset, duration);
      },
      products_update() {
        const params = {version: this.storeversion};
        axios
          .get(`${configs.server}/productList`, {params: params})
          .then(res => {
            if (res.status == 200) {
              if (validation.isNull(res.data.results)) {
                console.log('no update');
              } else {
                this.$store.dispatch('products/emptyStoreAction');
                res.data.results.map(element => {
                  this.$store.dispatch('products/getProductAction', element);
                });
                this.$store.dispatch('category/emptyStoreAction');
                res.data.category.map(element => {
                  this.$store.dispatch('category/getCategoryAction', element);
                });
                this.$store.dispatch(
                  'products/getVersionAction',
                  res.data.version,
                );
              }
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
    created() {
      this.products_update();
      // console.log(this.load_time);
      // 1초 간격으로 타임추가
      let timerId = setInterval(() => this.load_time++, 1000);

      // 5초 후에 정지
      setTimeout(() => {
        clearInterval(timerId);
        console.log(this.load_time);
      }, 7000);
    },
    mounted() {
      this.show_offset();
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
