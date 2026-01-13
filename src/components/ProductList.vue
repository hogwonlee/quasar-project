<template>
  <div>
    <div class="fixed-top-right z-top q-ma-xs row q-gutter-sm">
      <q-btn
        icon="search"
        size="12px"
        flat
        outline
        @click="searchDialog = true"
      >
      </q-btn>
    </div>

    <q-dialog class="z-max" v-model="searchDialog" position="top">
      <q-card style="width: 100%">
        <div class="text-h2">
          {{
            selected_local.chinafood == '洽洽中国食品' ? '商品搜索' : '상품검색'
          }}
        </div>
        <q-space />
        <q-btn
          class="absolute-top-right"
          flat
          size="20px"
          icon="close"
          @click="searchDialog = false"
        >
        </q-btn>
        <q-input
          class="q-pa-sm"
          input-class=" text-black"
          outlined
          rounded
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
          </template>
        </q-input>
      </q-card>
    </q-dialog>

    <div>
      <!-- v-show="showSimulatedReturnData" -->
      <q-infinite-scroll
        @load="products_update"
        :offset="500"
        ref="infiniteScroll"
      >
        <div class="row" v-for="c in category" :key="c.category" v-bind="c">
          <q-bar dense class="col-12 bg-dark text-white">
            <div :class="c.category">{{ c.category }}</div>
            <q-space />
          </q-bar>

          <q-separator />

          <!-- p.category == c.category &&
                  p.stored == 1 &&
                  (p.tag + p.category + p.keyword)
                    .toLowerCase()
                    .includes(keyword.toLowerCase()), -->
          <ProductInfo
            :class="
              list_col_number == 3
                ? 'col-3'
                : list_col_number == 4
                ? 'col-4'
                : 'col-12'
            "
            class="q-pa-xs"
            v-for="p in showing_products.filter(
              p =>
                p.category == c.category &&
                p.stored == 1 &&
                (p.tag + p.category + p.keyword)
                  .toLowerCase()
                  .includes(keyword.toLowerCase()),
            )"
            :key="p.product_id"
            v-bind="p"
            :colNumber="list_col_number"
            @setbuyoption="p.buyoption = $event"
            @setquantity="p.quantity = $event"
            @sendOrderItem="this.$store.dispatch('cart/addProductToCart', p)"
            @sendRemoveItem="
              this.$store.dispatch('cart/removeProductFromCart', p)
            "
          />
        </div>
      </q-infinite-scroll>
      <div class="text-orange text-bold row justify-center">
        <div v-if="hasMore">
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? '下划更新更多商品'
              : '스크롤하여 더 많은 상품을 불러오세요'
          }}
        </div>
        <div v-else class="text-positive">
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? '商品更新完毕'
              : '상품을 모두 불러왔습니다.'
          }}
        </div>
      </div>
    </div>

    <q-page-container>
      <!-- <q-inner-loading
        :showing="visible"
        :label="selected_local.img_loading"
        label-style="font-size: 1.1em"
      /> -->
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
            <div>경기도 부천시 원미구 부천로47번길 9, 중앙자유시장 15호</div>
          </template>
        </q-field>
      </div>
    </q-page-container>
    <q-page-sticky
      class="column q-gutter-md"
      style="width: 30px"
      position="bottom-right"
      :offset="[60, 10]"
    >
      <q-btn
        v-if="list_col_number == 4"
        class="row"
        color="dark"
        size="20px"
        @click="list_col_number = 3"
        icon="zoom_in_map"
        round
      >
      </q-btn>
      <q-btn
        v-else
        class="row"
        color="dark"
        size="20px"
        @click="list_col_number = 4"
        icon="zoom_out_map"
        round
      >
      </q-btn>
      <q-btn-dropdown
        class="row"
        color="dark"
        size="16px"
        dropdown-icon="keyboard_arrow_left"
        rounded
      >
        <q-list
          v-for="c in category.slice().sort()"
          :key="c.category"
          v-bind="c"
          dense
          padding="xs"
          color="dark"
        >
          <q-item clickable v-close-popup @click="handleScroll(c.category)">
            <q-item-section>
              <q-item-label class="dark">{{ c.category }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn
        icon="keyboard_arrow_up"
        size="20px"
        class="row bg-dark text-white"
        round
        @click="go_prev_category()"
      ></q-btn>
      <q-btn
        icon="keyboard_arrow_down"
        size="20px"
        class="row bg-dark text-white"
        round
        @click="go_next_category()"
      ></q-btn>
    </q-page-sticky>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import ProductInfo from 'components/ProductInfo.vue';
  import {ref} from 'vue';
  import {mapState, mapActions} from 'vuex';
  import axios from 'axios';
  import {scroll} from 'quasar';
  // import alert from 'src/util/modules/alert';
  import configs from 'src/configs';

  import {dom} from 'quasar';
  const {offset} = dom;

  const {getScrollTarget, setVerticalScrollPosition} = scroll;

  export default defineComponent({
    name: 'ProductList',
    components: {
      ProductInfo,
    },
    data: function () {
      return {
        showing_products: [],
      };
    },
    watch: {
      // Vuex의 products 데이터가 변경되는 것을 감지
      products(newVal) {
        if (newVal && newVal.length > 0 && this.showing_products.length === 0) {
          // 데이터가 들어오면 첫 24개를 즉시 화면에 할당
          this.showing_products = newVal.slice(
            0,
            Math.max(24, this.showing_products.length),
          );
          this.page = 1; // 페이지 번호 관리
        }
      },
    },
    methods: {
      go_prev_category() {
        var closest_category = this.category[0].category;
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

      setproductbuyoption(product, buyoption) {
        product.buyoption = buyoption;
      },

      async products_update(index, done) {
        if (this.products.length === 0) {
          done();
          return;
        }

        // const startIndex = (index - 1) * 24;
        const startIndex = this.showing_products.length;
        // const endIndex = startIndex + 24;
        const newProducts = this.products.slice(startIndex, startIndex + 24);
        // 만약 더 이상 불러올 데이터가 없으면 무한 스크롤을 중지
        if (newProducts.length === 0) {
          this.hasMore = false;
          done(true); // 'done'에 true를 전달하여 로딩을 종료
          return;
        }
        this.showing_products.push(...newProducts);
        done();
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
      // 이미 데이터가 스토어에 있다면 즉시 표시 (다른 페이지 이동 후 복귀 시)
      // if (
      //   this.products &&
      //   this.products.length > 0 &&
      //   this.showing_products.length === 0
      // ) {
      //   this.showing_products = this.products.slice(0, 24);
      // }
      if (this.products && this.products.length > 0) {
        // 기존에 보여주던 개수만큼 유지하고 싶다면 slice 범위를 조정할 수 있지만,
        // 일단 안전하게 첫 24개 혹은 전체를 할당합니다.
        this.showing_products = this.products.slice(
          0,
          Math.max(24, this.showing_products.length),
        );
      }
      // 서버에서 최신 버전 체크 및 데이터 로드 로직 시작
      axios
        .get(`${configs.server}/storeVersion`)
        .then(res => {
          const dbStoreVersion = parseInt(res.data.results);
          const currentVersion = parseInt(this.storeversion);

          console.log(
            '타입 확인:',
            typeof dbStoreVersion,
            typeof currentVersion,
          );

          console.log(dbStoreVersion > currentVersion);

          if (dbStoreVersion > currentVersion || this.products.length === 0) {
            this.showing_products = [];
            this.$store.dispatch('category/resetStoreAction');
            this.$store.dispatch('products/emptyStoreAction');
            this.$store.dispatch('products/getVersionAction', dbStoreVersion);
            const firstParams = {
              list_index_min: 0,
              list_index_max: 20000,
            };
            try {
              axios({
                url: `${configs.server}/productList`,
                method: 'GET',
                params: firstParams,
              })
                .then(res => {
                  if (res.data.results.length > 0) {
                    // this.$store.dispatch(
                    //   'category/getCategoryAction',
                    //   res.data.results[0].category,
                    // );
                    res.data.results.map(element => {
                      this.$store.dispatch(
                        'products/getProductAction',
                        element,
                      );
                    });
                  } else {
                    // this.hasMore = false;
                    console.log('error: ' + '업데이트 받을 상품이 없습니다.');
                  }
                  // done();
                })
                .catch(error => {
                  if (error.response) {
                    // 서버가 응답을 했고, 그 응답이 2xx 범위를 벗어난 경우
                    if (error.response.status === 400) {
                      console.error(
                        'Error 400: Bad Request. Check your request parameters (params).',
                        error.response.data,
                      );
                      // 사용자에게 구체적인 오류 메시지를 보여줄 수 있습니다.
                      // 예: alert('상품 목록을 불러오는 데 실패했습니다: 잘못된 요청입니다.');
                    } else {
                      console.error(
                        `Error ${error.response.status}:`,
                        error.response.data,
                      );
                    }
                  } else if (error.request) {
                    // 요청이 전송되었으나 응답을 받지 못한 경우 (네트워크 문제 등)
                    console.error(
                      'No response received from the server. Please check your network connection.',
                    );
                  } else {
                    // 요청 설정 중 오류가 발생한 경우
                    console.error('Error during request setup:', error.message);
                  }
                  // this.hasMore = false; // 에러 발생 시 더 이상 로딩하지 않음
                  // done(); // 에러 발생해도 로딩 완료 처리
                });
            } catch (error) {
              console.error('Error fetching products:', error);
              // this.hasMore = false; // 에러 발생 시 더 이상 로딩하지 않음
              // done(); // 에러 발생해도 로딩 완료 처리
            }
          } else {
            console.log('이미 모든 상품을 가져왔습니다.');
          }
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    setup() {
      const infiniteScroll = ref(null); // QInfiniteScroll ref 추가
      const hasMore = ref(true);

      return {
        // list_show: ref(false),
        childbuyoption: ref('one'),
        keyword: ref(''),
        event_fab: ref(false),
        visible: ref(true),
        showSimulatedReturnData: ref(false),
        list_col_number: ref(4),
        searchDialog: ref(false),
        page: ref(0),
        infiniteScroll, // QInfiniteScroll ref 추가
        hasMore,
      };
    },
  });
</script>
