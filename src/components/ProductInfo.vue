<template>
  <div>
    <div @click="card = true" :class="colNumber == 12 ? 'row' : 'column'">
      <q-img
        :src="img"
        class="rounded-borders"
        :class="colNumber == 12 ? 'col-2' : ''"
        loading="lazy"
        :ratio="3 / 4"
        style="max-height: 600px"
        position="0 0"
      >
        <div
          v-if="stock <= 0"
          class="absolute-full flex flex-center text-white"
        >
          {{ selected_local.chinafood == '洽洽中国食品' ? '无库存' : '품절' }}
        </div>
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            NO image
          </div>
        </template>
        <div class="absolute-top-right transparent">
          <q-badge
            v-if="bonuscondition > 0"
            class="absolute-right"
            color="orange"
            floating
            rounded
          >
            {{ bonuscondition }}+1
          </q-badge>
          <q-badge
            v-if="cutprice > 0"
            class="absolute-right"
            color="orange"
            floating
            rounded
          >
            - {{ cutprice }}
          </q-badge>
          <q-badge
            v-if="boxprice != null"
            class="absolute-right"
            color="positive"
            floating
            rounded
          >
            {{ boxcapacity }}
          </q-badge>
        </div>
      </q-img>
      <div :class="colNumber == 12 ? 'col-5' : ''">
        <q-chip
          class="bg-grey"
          :class="colNumber == 12 ? 'q-my-lg' : ''"
          style="width: 95%; height: 33px; align-items: center"
          dense
          text-color="white"
        >
          <text-body2 class="q-pa-xs absolute-bottom">{{
            selected_local.chinafood == '洽洽中国食品'
              ? product_name
              : product_name_ko
          }}</text-body2>

          <div v-if="flavor_refer != null" class="absolute-right">
            <q-badge floating rounded>
              {{
                selected_local.chinafood == '洽洽中国食品'
                  ? flavor_refer
                  : flavor_refer_ko
              }}
            </q-badge>
          </div>
        </q-chip>
      </div>
      <div :class="colNumber == 12 ? 'col-5' : ''">
        <q-chip
          class="bg-grey"
          :class="colNumber == 12 ? 'q-my-lg' : ''"
          style="width: 95%; height: 33px"
          dense
          text-color="white"
        >
          <div class="q-pl-sm" style="text-align: right; align-items: center">
            <q-icon name="img:icons\currency-krw-white.png"></q-icon>
            {{ price }}
          </div>
        </q-chip>
      </div>
    </div>
    <div>
      <q-dialog
        v-model="card"
        position="standard"
        backdrop-filter="contrast(40%)"
      >
        <q-card style="height: 80%; width: 70%">
          <img class="q-pa-sm" :src="img" />
          <!-- style="margin-top: 3px; margin-bottom: 3px" -->
          <div style="text-align: center">---底线---</div>
          <div style="height: 30px"></div>
        </q-card>
        <q-page-sticky class="bg-white" position="bottom">
          <q-card>
            <q-card-section class="q-mt-none q-py-none q-px-sm">
              <q-btn
                class="absolute-top-right bg-dark z-top"
                icon="close"
                text-color="white"
                v-close-popup
                size="sm"
              >
              </q-btn>
              <div style="width: 100%" class="justify-center dark">
                <q-chip
                  style="width: 70%"
                  dense
                  color="dark"
                  text-color="white"
                >
                  {{
                    selected_local.chinafood == '洽洽中国食品'
                      ? product_name
                      : product_name_ko
                  }}
                  <q-space />
                  <q-chip
                    v-if="bulkbuy == false"
                    dense
                    color="dark"
                    text-color="white"
                    icon="img:icons\currency-krw-white.png"
                  >
                    {{ price }}
                    <!-- <q-badge color="positive" floating rounded v-if="cutprice > 0">
                  - {{ cutprice }}
                </q-badge> -->
                  </q-chip>

                  <q-chip v-else dense color="dark" text-color="white">
                    {{ boxprice }}
                    <!-- <q-badge color="positive" floating rounded>
                  {{ boxcapacity }} {{ selected_local.bundle_count }}
                </q-badge> -->
                  </q-chip>
                  /
                  {{
                    selected_local.chinafood == '洽洽中国食品'
                      ? bulkbuy == false
                        ? '个'
                        : '箱'
                      : bulkbuy == false
                      ? '개'
                      : '박스'
                  }}
                </q-chip>
                <!-- <q-icon name="img:icons\currency-krw-black.png" /> -->
              </div>

              <p v-if="water_delivery == 1">
                <!-- 물과 같은 무거운 액체 배송 -->
                {{ selected_local.notice_water_delivery }}
              </p>
              <p v-else-if="water_delivery == 2">
                <!-- 아이스크림 등 쉽게 녹는 음식 -->
                {{
                  selected_local.chinafood == '洽洽中国食品'
                    ? '***富川以外，此商品暂不支持快递、订单'
                    : '***부천이외 지역은 당분간 본 상품의 배송 및 주문을 지원하지 않습니다.'
                }}
              </p>
              <p v-else-if="water_delivery == 3">
                <!-- 브랜드 다양 -->
                {{
                  selected_local.chinafood == '洽洽中国食品'
                    ? '***此商品品牌随机配送，品质、容量、价格差异不大'
                    : '***브랜드 랜덤 배송. 품질, 용량, 가격은 큰 차이 없음.'
                }}
              </p>
              <p v-else-if="water_delivery == 4">
                <!-- 냉동식품 추가 배송비 발생 -->
                {{
                  selected_local.chinafood == '洽洽中国食品'
                    ? '***速冻产品需要支付的快递费用。5万以上则免。'
                    : '***냉동제품은 추가 배송비를 지불해야 합니다. 5만원이상이면 무료 배송합니다.'
                }}
              </p>
              <div :class="this.localQuantity > 0 ? 'bg-white' : 'bg-grey'">
                <div v-if="!bulkbuy" class="text-h6 text-bold">
                  <q-icon name="img:icons\currency-krw-black.png" />
                  {{ (price - cutprice) * this.localQuantity }}
                  {{ selected_local.won }}
                </div>
                <div v-else class="text-h6 text-bold">
                  <q-icon name="img:icons\currency-krw-black.png" />
                  {{ boxprice * this.localQuantity }} {{ selected_local.won }}
                </div>
              </div>
              <!-- <q-input
                outlined
                input-class="text-right"
                :model-value="total"
                rdonly
                dense
                ><template v-slot:prepend>
                  <q-icon name="shopping_cart" /> </template
                  ></q-input> -->
              <!-- <q-btn
                :disable="localQuantity <= 9"
                class="col-2"
                label="-10"
                text-color="negative"
                @click="handle(-10)"
                size="xs"
              ></q-btn> -->
              <div class="row">
                <q-btn
                  :disable="localQuantity <= 0"
                  class="col-2"
                  icon="remove"
                  text-color="negative"
                  @click="handle(-1)"
                  size="xs"
                ></q-btn>
                <q-input
                  class="col-4"
                  dense
                  style="vertical-align: top"
                  readonly
                  disable
                  outlined
                  v-model="this.localQuantity"
                  input-class="text-right"
                >
                  <div v-if="bulkbuy" color="positive">x{{ boxcapacity }}</div>
                  <div
                    v-if="bonuscondition > 0 && localQuantity >= bonuscondition"
                  >
                    <!-- <q-badge color="orange" floating rounded> -->
                    <!-- {{ selected_local.n_plus_one }} -->
                    +{{ parseInt(localQuantity / bonuscondition) }}
                    <!-- </q-badge> -->
                  </div>
                </q-input>
                <q-btn
                  class="col-2"
                  icon="add"
                  size="xs"
                  text-color="positive"
                  @click="handle(1)"
                ></q-btn>
                <div class="col-4">
                  <div v-if="boxprice != null" class="q-gutter-sm">
                    <q-radio
                      v-model="bulkbuy"
                      :val="false"
                      :label="
                        selected_local.chinafood == '洽洽中国食品' ? '个' : '개'
                      "
                      color="positive"
                    />
                    <q-radio
                      v-model="bulkbuy"
                      :val="true"
                      :label="
                        selected_local.chinafood == '洽洽中国食品'
                          ? '箱'
                          : '박스'
                      "
                      color="positive"
                    />
                  </div>
                  <div v-else class="q-gutter-sm">
                    <q-radio
                      v-model="bulkbuy"
                      :val="false"
                      :label="
                        selected_local.chinafood == '洽洽中国食品' ? '个' : '개'
                      "
                      color="gray"
                    />
                    <q-radio
                      disable
                      v-model="bulkbuy"
                      :val="true"
                      :label="
                        selected_local.chinafood == '洽洽中国食品'
                          ? '箱'
                          : '박스'
                      "
                      color="gray"
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <q-btn
                  class="col-4 q-mx-none q-my-xs"
                  stack
                  icon="shopping_cart_checkout"
                  color="dark"
                  tag="a"
                  to="/OrderList"
                  :label="selected_local.gocounter"
                >
                  <q-badge color="positive" floating rounded>
                    <q-icon name="shopping_cart" />
                    <q-icon name="img:icons\currency-krw-white.png" />
                    {{ total }}
                  </q-badge>
                </q-btn>
                <q-btn
                  class="col-8 q-mx-none q-my-xs"
                  text-color="positive"
                  stack
                  glossy
                  icon="add_shopping_cart"
                  :label="selected_local.add_to_cart"
                  @click="sendToCart(this.product_name, quantity)"
                  :disable="this.localQuantity <= 0 || this.stock <= 0"
                />
              </div>
            </q-card-section>
          </q-card>
        </q-page-sticky>
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';
  import {Notify, QPageSticky} from 'quasar';
  import {mapGetters, mapState} from 'vuex';

  export default defineComponent({
    name: 'ProductInfo',
    components: {},
    data: function () {
      return {
        slide: ref(1),
      };
    },
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
      ...mapGetters('cart', {
        total: 'cartTotalPrice',
      }),
      localParam: {
        get: function () {
          return this.buyoption;
        },
        set: function (buyoption) {
          this.$emit('setbuyoption', buyoption);
        },
      },
      localQuantity: {
        get: function () {
          return this.quantity;
        },
        set: function (value) {
          this.$emit('setquantity', value);
        },
      },
    },
    watch: {
      bulkbuy: function (val) {
        this.localParam = val;
      },
    },
    props: {
      product_id: {
        type: Number,
        default: 0,
      },
      img: {
        type: String,
        required: true,
      },
      product_name: {
        type: String,
        default: '',
      },
      product_name_ko: {
        type: String,
        default: '',
      },
      tag: {
        type: String,
        default: '',
      },
      price: {
        type: Number,
        default: 0,
      },
      to: {
        type: String,
        default: '#',
      },
      itemCount: {
        type: Number,
        default: 0,
      },
      category: {
        type: String,
        default: '&',
      },
      keyword: {
        type: String,
        default: '&',
      },
      cutprice: {
        type: Number,
        default: 0,
      },
      bonuscondition: {
        type: Number,
        default: 0,
      },
      boxprice: {
        type: Number,
        default: 0,
      },
      boxcapacity: {
        type: Number,
        default: 0,
      },
      stock: {
        type: Number,
        default: 0,
      },
      stored: {
        type: Number,
        default: 0,
      },
      quantity: {
        type: Number,
        default: 0,
      },
      buyoption: {
        type: Boolean,
        default: false,
      },
      water_delivery: {
        type: Number,
        default: 0,
      },
      flavor_refer: {
        type: String,
        default: '',
      },
      flavor_refer_ko: {
        type: String,
        default: '',
      },
      colNumber: {
        type: Number,
        default: 3,
      },
    },
    setup() {
      return {
        card: ref(false),
        bulkbuy: ref(false),
      };
    },
    // mounted() {
    //   this.resetbuyoption();
    // },
    methods: {
      // resetbuyoption() {
      //   this.localParam = false;
      // },
      handle(value) {
        this.localQuantity += value;
      },
      sendToCart(name, quantity) {
        Notify.create({
          position: 'top',
          message:
            this.selected_local.shopingcart + ':(' + name + ') ' + quantity,
          color: 'orange',
        });
        //alert('(' + name + ')' + amount + '개를 장바구니에 넣었습니다.');
        this.$emit('sendOrderItem');
      },
    },
  });
</script>
