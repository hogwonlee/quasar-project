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
          <div class="absolute-full flex flex-center bg-warning text-white">
            {{
              selected_local.chinafood == '洽洽中国食品'
                ? '暂无图片'
                : '이미지추가예정'
            }}
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
          :class="colNumber == 12 ? 'q-my-lg' : ''"
          style="width: 95%; height: 33px; align-items: center"
          color="white"
        >
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? product_name
              : product_name_ko
          }}

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
          :class="colNumber == 12 ? 'q-my-lg' : ''"
          style="width: 95%; height: 33px"
          color="white"
        >
          {{ price }}
        </q-chip>
      </div>
    </div>
    <div>
      <q-dialog v-model="card">
        <q-card
          bordered
          class="q-pa-xs"
          style="height: 80%; max-width: 80%; width: 80%"
        >
          <q-toolbar>
            <q-toolbar-title>{{
              selected_local.chinafood == '洽洽中国食品'
                ? '商品详情'
                : '상품상세'
            }}</q-toolbar-title>
          </q-toolbar>
          <q-separator />
          <q-card-section>
            <q-img :src="img" />
          </q-card-section>
        </q-card>
        <q-page-sticky position="bottom-left">
          <q-btn
            color="positive"
            @click="bottomCard = true"
            class="full-width"
            glossy
            size="28px"
            round
            >+</q-btn
          >
        </q-page-sticky>
        <!-- backdrop-filter="contrast(40%)" -->
      </q-dialog>
      <q-dialog v-model="bottomCard" position="bottom">
        <q-card>
          <q-card-section class="q-ma-xs q-gutter-xs">
            <div style="width: 100%">
              <div color="black" class="text-left">
                {{
                  selected_local.chinafood == '洽洽中国食品'
                    ? product_name
                    : product_name_ko
                }}
                <!-- <q-space /> -->
                <span v-if="bulkbuy == false">
                  {{ price }}
                  <!-- <q-badge color="positive" floating rounded v-if="cutprice > 0">
                  - {{ cutprice }}
                </q-badge> -->
                </span>

                <span v-else color="white">
                  {{ boxprice }}
                  <!-- <q-badge color="positive" floating rounded>
                  {{ boxcapacity }} {{ selected_local.bundle_count }}
                </q-badge> -->
                </span>
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
                <q-space />
                {{
                  selected_local.chinafood == '洽洽中国食品'
                    ? '库存：'
                    : '재고: '
                }}
                {{ stock >= 0 ? stock : 0 }}
                {{ selected_local.chinafood == '洽洽中国食品' ? '个' : '개' }}
              </div>
              <q-btn
                class="absolute-top-right bg-dark z-top q-pa-sm"
                icon="close"
                text-color="white"
                v-close-popup
                size="md"
              >
              </q-btn>
              <!-- <q-icon name="img:icons\currency-krw-black.png" /> -->
            </div>
            <div class="q-my-xs text-red">
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
            </div>
            <div
              :class="this.localQuantity > 0 ? 'bg-white' : 'bg-grey'"
              class="row q-my-xs justify-center q-col-gutter-sm"
            >
              <div v-if="!bulkbuy" class="col-8 text-h6 text-bold">
                {{ (price - cutprice) * this.localQuantity }}
                {{ selected_local.won }}
              </div>
              <div v-else class="col-8 text-h6 text-bold">
                {{ boxprice * this.localQuantity }} {{ selected_local.won }} +
                {{ boxdeliveryfee * this.localQuantity }}
                {{ selected_local.won }}
              </div>
              <div class="col-4 text-right">
                (<q-icon name="shopping_cart" /> {{ total }} won)
              </div>
            </div>
            <div class="row q-my-xs justify-end q-col-gutter-md">
              <div v-show="boxprice != null" class="q-gutter-sm">
                <q-radio
                  v-model="bulkbuy"
                  keep-color
                  :val="false"
                  :label="
                    selected_local.chinafood == '洽洽中国食品' ? '个' : '개'
                  "
                  color="positive"
                />
                <q-radio
                  v-model="bulkbuy"
                  keep-color
                  :val="true"
                  :label="
                    selected_local.chinafood == '洽洽中国食品' ? '箱' : '박스'
                  "
                  color="positive"
                />
              </div>
            </div>
            <div class="row q-my-xs justify-center q-col-gutter-sm">
              <q-btn
                :disable="localQuantity <= 0"
                class="col-3"
                icon="remove"
                text-color="negative"
                @click="handle(-1)"
                size="sm"
              ></q-btn>
              <div class="col-5 text-right q-ma-sm">
                {{ this.localQuantity }}
                <span v-if="bulkbuy" style="color: blue"
                  >x{{ boxcapacity }}</span
                >
                <span
                  v-if="bonuscondition > 0 && localQuantity >= bonuscondition"
                  style="color: blue"
                >
                  +{{ parseInt(localQuantity / bonuscondition) }}
                </span>
              </div>
              <q-btn
                class="col-3"
                icon="add"
                text-color="positive"
                size="sm"
                @click="handle(1)"
              ></q-btn>
            </div>
            <div class="row q-py-sm justify-center q-col-gutter-sm">
              <q-btn
                class="col-6"
                stack
                icon="shopping_cart_checkout"
                color="dark"
                tag="a"
                to="/OrderList"
                :label="selected_local.gocounter"
              >
              </q-btn>
              <q-btn
                class="col-6"
                text-color="positive"
                stack
                glossy
                icon="add_shopping_cart"
                :label="selected_local.add_to_cart"
                @click="sendToCart(this.product_name, quantity)"
                :disable="this.localQuantity <= 0"
              />
            </div>
          </q-card-section>
        </q-card>
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
      boxdeliveryfee: {
        type: Number,
        default: 0,
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
        bottomCard: ref(false),
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
        if (this.stock <= 0) {
          Notify.create({
            position: 'top',
            message:
              selected_local.chinafood == '洽洽中国食品'
                ? '库存不足'
                : '재고부족',
            color: 'orange',
          });
        } else {
          Notify.create({
            position: 'top',
            message:
              this.selected_local.shopingcart + ':(' + name + ') ' + quantity,
            color: 'orange',
          });
          //alert('(' + name + ')' + amount + '개를 장바구니에 넣었습니다.');
          this.$emit('sendOrderItem');
        }
      },
    },
  });
</script>
