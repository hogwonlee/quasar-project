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
    <q-page-sticky
      v-if="category.length > 0"
      class="z-top"
      position="bottom-right"
      :offset="[10, 10]"
    >
      <q-fab
        v-model="list_show"
        persistent="false"
        :label="selected_local.category"
        direction="up"
        class="q-pa-none q-gutter-none"
        color="dark"
        vertical-actions-align="right"
        icon="keyboard_arrow_up"
      >
        <q-fab-action
          :label="c.category"
          padding="3px"
          v-for="c in [
            category[11],
            category[12],
            category[10],
            category[9],
            category[8],
            category[7],
            category[6],
            category[3],
            category[2],
            category[1],
            category[0],
            category[4],
            category[5],
          ]"
          :key="c.category"
          v-bind="c"
          color="dark"
          @click="handleScroll(c.category)"
        />
      </q-fab>
    </q-page-sticky>
    <q-page-sticky class="z-top" position="bottom-left" :offset="[10, 50]">
      <q-btn
        :label="selected_local.prev_category"
        icon="keyboard_arrow_up"
        class="bg-dark text-white"
        rounded
        @click="go_prev_category()"
      ></q-btn>
    </q-page-sticky>
    <q-page-sticky class="z-top" position="bottom-left" :offset="[10, 10]">
      <q-btn
        :label="selected_local.next_category"
        icon="keyboard_arrow_down"
        class="bg-dark text-white"
        rounded
        @click="go_next_category()"
      ></q-btn>
    </q-page-sticky>
    <div v-if="category.length > 0">
      <div
        v-show="showSimulatedReturnData"
        class="row"
        v-for="c in [
          category[5],
          category[4],
          category[0],
          category[1],
          category[2],
          category[3],
          category[6],
          category[7],
          category[8],
          category[9],
          category[10],
          category[12],
          category[11],
        ]"
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
    <div v-if="!showSimulatedReturnData || !(products.length > 0)">
      <q-card class="row">
        <q-skeleton class="col-12" type="text" height="20px" />
        <q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" />
        </q-card-section>
        <q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" /> </q-card-section
        ><q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" /> </q-card-section
        ><q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" /> </q-card-section
        ><q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" /> </q-card-section
        ><q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" /> </q-card-section
        ><q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" /> </q-card-section
        ><q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" /> </q-card-section
        ><q-card-section class="q-gutter-md col-4">
          <q-skeleton type="rect" height="120px" />
          <q-skeleton type="text" height="33px" />
        </q-card-section>
      </q-card>
    </div>
    <q-page-container>
      <q-inner-loading
        :showing="visible"
        :label="selected_local.img_loading"
        label-style="font-size: 1.1em"
      />
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
    methods: {
      go_prev_category() {
        var closest_category = this.category[5].category;
        var dis = 0;
        var closest_dis = -9999;
        this.category.forEach(c => {
          if (offset(document.querySelector('.' + c.category)).top < 0) {
            dis = offset(document.querySelector('.' + c.category)).top;
            if (dis > closest_dis) {
              closest_dis = dis;
              closest_category = c.category;
            }
          }
        });
        let target = getScrollTarget(
          document.querySelector('.' + closest_category),
        );
        const duration = 300;
        setVerticalScrollPosition(
          target,
          document.querySelector('.' + closest_category).offsetTop - 50,
          duration,
        );
      },
      go_next_category() {
        var closest_category;
        var dis = 0;
        var closest_dis = 9999;
        this.category.forEach(c => {
          if (offset(document.querySelector('.' + c.category)).top > 100) {
            dis = offset(document.querySelector('.' + c.category)).top;
            if (dis < closest_dis) {
              closest_dis = dis;
              closest_category = c.category;
            }
          }
        });
        let target = getScrollTarget(
          document.querySelector('.' + closest_category),
        );
        const duration = 300;
        setVerticalScrollPosition(
          target,
          document.querySelector('.' + closest_category).offsetTop - 50,
          duration,
        );
      },
      handleScroll(val) {
        // console.log(val);
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
                this.$store.dispatch('category/emptyStoreAction');
                res.data.category.map(element => {
                  this.$store.dispatch('category/getCategoryAction', element);
                });
                this.$store.dispatch('products/emptyStoreAction');
                res.data.results.map(element => {
                  this.$store.dispatch('products/getProductAction', element);
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
      showProductLoading() {
        if (this.products.length > 0) {
          this.visible = false;
          this.showSimulatedReturnData = true;

          setTimeout(() => {
            this.products_update();
          }, 1000);
        } else {
          this.visible = true;
          this.showSimulatedReturnData = false;

          setTimeout(() => {
            this.visible = false;
            this.showSimulatedReturnData = true;
            this.products_update();
          }, 1000);
        }
      },
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        category: state => state.category.items,
        products: state => state.products.all,
        storeversion: state => state.products.version,
        products_status: state => state.products.status,
        selected_local: state => state.ui_local.status,
      }),
    },
    mounted() {
      this.showProductLoading();
    },
    setup() {
      return {
        list_show: ref(false),
        childbuyoption: ref(false),
        keyword: ref(''),
        event_fab: ref(false),
        visible: ref(true),
        showSimulatedReturnData: ref(false),
      };
    },
  });
</script>
