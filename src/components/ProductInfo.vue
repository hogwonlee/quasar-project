<template>
  <div>
    <div @click="card = true">
      <q-img
        :src="img"
        class="rounded-borders"
        loading="lazy"
        :ratio="1"
        style="max-height: 600px"
        position="0 0"
      >
        <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Cannot load image
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
        style="width: 95%; height: 33px"
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
      <q-dialog v-model="card">
        <!-- <div class="absolute-top-left z-top q-ma-xs">
          <q-btn-toggle
            v-if="boxprice > 0"
            v-model="bulkbuy"
            toggle-color="secondary"
            toggle-text-color="primary"
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

        <q-badge
          class="absolute-top-right z-top q-ma-xs q-mt-xl"
          v-if="bonuscondition > 0"
          color="orange"
          floating
          rounded
        >
          {{ bonuscondition }}+1
        </q-badge>
        <q-btn
          class="absolute-top-right bg-dark z-top q-ma-md"
          icon="close"
          text-color="white"
          v-close-popup
          size="md"
        >
        </q-btn> -->
        <q-card>
          <q-input
            class="col-12"
            readonly
            disable
            dense
            borderless
            :label="selected_local.productname"
            :model-value="product_name"
          />
          <q-input
            v-if="product_name_ko != null"
            class="col-12"
            readonly
            disable
            dense
            borderless
            :label="selected_local.productname_ko"
            :model-value="product_name_ko"
          />
          <img :src="img" />
        </q-card>
        <q-page-sticky position="bottom" :offset="[0, 0]">
          <q-card-section class="row q-mt-none q-py-none q-px-sm">
            <div style="width: 100%" class="row justify-center">
              <q-chip
                v-if="bulkbuy == false"
                style="width: 70%"
                dense
                color="dark"
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
                style="width: 70%"
                color="dark"
                dense
                text-color="white"
                icon="img:icons\currency-krw-white.png"
              >
                {{ boxprice }}
                <q-badge color="orange" floating rounded>
                  {{ boxcapacity }} {{ selected_local.bundle_count }}
                </q-badge>
              </q-chip>
            </div>

            <q-card-section class="row q-px-sm q-py-none">
              <div
                class="col-7"
                :class="this.localQuantity > 0 ? 'visible' : 'invisible'"
              >
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
              <q-input
                class="col-5"
                outlined
                input-class="text-right"
                :model-value="total"
                readonly
                dense
                ><template v-slot:prepend>
                  <q-icon name="shopping_cart" /> </template
              ></q-input>
              <q-btn
                :disable="localQuantity <= 0"
                class="col-3"
                icon="remove"
                text-color="negative"
                @click="handle(-1)"
                size="xs"
              ></q-btn>
              <q-input
                class="col-6"
                dense
                style="vertical-align: top"
                readonly
                disable
                outlined
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
                size="xs"
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
          </q-card-section>
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
      product_desc: {
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
