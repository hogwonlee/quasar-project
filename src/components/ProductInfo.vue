<template>
  <div>
    <div @click="card = true">
      <q-img :src="img" class="rounded-borders" :ratio="1">
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
            v-if="stock > 0"
            class="absolute-right"
            color="red"
            floating
            rounded
          >
            <q-icon name="warning" color="white" />
          </q-badge>
        </div>
      </q-img>
      <q-chip
        class="bg-grey"
        style="width: 100%; height: 33px"
        dense
        text-color="white"
      >
        <div class="absolute-bottom q-pl-sm">
          <q-icon name="img:icons\currency-krw-white.png"></q-icon>
          {{ price }}
        </div>
        <div v-if="flavor_refer != null" class="absolute-right">
          <q-badge floating rounded>
            {{ flavor_refer }}
          </q-badge>
        </div>
      </q-chip>
    </div>
    <div>
      <q-dialog v-model="card" :id="category" class="q-px-none q-mx-none">
        <q-card
          class="deep-orange-3 row justify-center q-px-none q-mx-none"
          style="width: 75%; height: 60%"
        >
          <q-btn
            class="absolute-top-right bg-grey z-top q-ma-xs"
            icon="close"
            v-close-popup
          >
          </q-btn>
          <q-badge
            class="absolute-top-right z-top q-ma-xs q-mt-xl"
            v-if="bonuscondition > 0"
            color="orange"
            floating
            rounded
          >
            {{ bonuscondition }}+1
          </q-badge>
          <div class="absolute-top-left z-top q-ma-xs">
            <q-btn-toggle
              v-if="boxprice > 0"
              v-model="bulkbuy"
              toggle-color="primary"
              toggle-text-color="white"
              color="grey"
              text-color="black"
              unelevated
              glossy
              style="flex-direction: column"
              :options="[
                {label: selected_local.product_unit, value: false},
                {label: selected_local.product_bundle, value: true},
              ]"
            />
          </div>
          <q-img
            :src="img"
            style="max-width: 75%"
            class="rounded-borders q-mt-xs"
          >
            <q-chip
              v-if="bulkbuy == false"
              class="absolute-bottom q-ml-lg"
              dense
              text-color="white"
              icon="img:icons\currency-krw-white.png"
            >
              {{ price }}
              <q-badge
                color="red"
                floating
                rounded
                transparent
                v-if="cutprice > 0"
              >
                - {{ cutprice }}
              </q-badge>
            </q-chip>
            <q-chip
              v-else
              class="absolute-bottom"
              dense
              text-color="white"
              icon="img:icons\currency-krw-white.png"
            >
              {{ boxprice }}
              <q-badge color="orange" floating rounded>
                {{ boxcapacity }} {{ selected_local.bundle_count }}
              </q-badge>
            </q-chip>
            <div class="absolute-bottom-right transparent">
              <q-badge
                v-if="stock > 0"
                class="q-mt-md"
                color="red"
                floating
                rounded
              >
                <q-icon name="warning" color="white" />
                {{
                  stock == null || stock == 0 || stock == ''
                    ? selected_local.stock_enough
                    : selected_local.stock_null
                }}
              </q-badge>
            </div>
          </q-img>

          <q-card-section class="row q-px-sm q-py-none">
            <!-- :label="selected_local.sellprice" -->
            <div
              class="col-12"
              :class="this.localQuantity > 0 ? 'visible' : 'invisible'"
            >
              <div v-if="!bulkbuy" class="col-12 text-h6 text-bold">
                <q-icon name="img:icons\currency-krw-black.png" />
                {{ (price - cutprice) * this.localQuantity }}
                {{ selected_local.won }}
              </div>
              <div v-else class="col-12 text-h6 text-bold">
                <q-icon name="img:icons\currency-krw-black.png" />
                {{ boxprice * this.localQuantity }} {{ selected_local.won }}
              </div>
            </div>
            <!-- <q-input
              v-if="!bulkbuy"
              class="col-12 q-my-xs"
              readonly
              disable
              square
              outlined
              bg-color="red-2"
              input-class="text-right"
              :model-value="(price - cutprice) * this.localQuantity"
            >
            </q-input> -->
            <!-- :label="selected_local.sellprice" -->

            <!-- <q-input
              v-else
              class="col-12 q-my-xs"
              readonly
              square
              outlined
              disable
              bg-color="red-2"
              input-class="text-right"
              :model-value="boxprice * this.localQuantity"
            >
            </q-input> -->
            <q-btn
              :disable="localQuantity <= 0"
              class="col-3"
              icon="remove"
              text-color="negative"
              @click="handle(-1)"
            ></q-btn>
            <q-input
              class="col-6"
              style="vertical-align: top"
              readonly
              disable
              outlined
              bg-color="red-2"
              v-model="this.localQuantity"
              input-class="text-right"
            >
              <div
                v-if="bonuscondition > 0 && localQuantity >= bonuscondition"
                class="q-mt-sm q-ml-lg absolute-right transparent"
              >
                <q-badge color="orange" floating rounded>
                  {{ selected_local.n_plus_one }}
                  {{ parseInt(localQuantity / bonuscondition) }}
                </q-badge>
              </div>
            </q-input>
            <q-btn
              class="col-3"
              icon="add"
              text-color="positive"
              @click="handle(1)"
            ></q-btn>

            <q-btn
              class="col-12 q-my-xs"
              text-color="positive"
              glossy
              icon="add_shopping_cart"
              :label="selected_local.add_to_cart"
              @click="sendToCart(this.product_name, quantity)"
              :disable="this.localQuantity <= 0"
            />
          </q-card-section>
          <q-card-section class="row q-mt-none q-pt-none q-px-sm">
            <q-bar dense class="col-12 bg-red text-white">
              {{ selected_local.default_info }}
            </q-bar>
            <q-input
              class="col-6"
              readonly
              disable
              borderless
              :label="selected_local.productname"
              :model-value="product_name"
            />
            <q-input
              class="col-6"
              readonly
              disable
              borderless
              :label="selected_local.flavorandspec"
              :model-value="tag"
            />
            <q-input
              class="col-6"
              readonly
              disable
              borderless
              :label="selected_local.shelf_life"
              :model-value="
                shelf_life <= 0 ? '-' : shelf_life + selected_local.month_count
              "
            />
            <q-input
              class="col-6"
              readonly
              disable
              borderless
              :label="selected_local.production_date"
              :model-value="selected_local.after"
            />
          </q-card-section>
        </q-card>
        <q-page-sticky class="z-top" position="bottom-right" :offset="[80, 80]">
          <q-btn
            class="q-my-xs"
            glossy
            round
            padding="xl"
            icon="shopping_cart_checkout"
            color="primary"
            tag="a"
            to="/OrderList"
            :label="selected_local.gocounter"
          />
        </q-page-sticky>
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';
  import {Notify} from 'quasar';
  import {mapState} from 'vuex';

  export default defineComponent({
    name: 'ProductInfo',
    components: {},
    data: function () {
      return {};
    },
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
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
      shelf_life: {
        type: Number,
        default: 0,
      },
      production_date: {
        type: Date,
        default: '1900-01-01',
      },
      flavor_refer: {
        type: String,
        default: '',
      },
    },
    setup() {
      return {
        card: ref(false),
        bulkbuy: ref(false),
      };
    },
    mounted() {
      this.resetbuyoption();
    },
    methods: {
      resetbuyoption() {
        this.localParam = false;
      },
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
