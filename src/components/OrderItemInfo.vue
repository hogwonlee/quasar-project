<template>
  <div>
    <div @click="card = true">
      <q-img :src="img" class="rounded-borders" :ratio="1">
        <div class="absolute-top-right q-mt-sm transparent">
          <q-badge v-if="buyoption == true" color="red" floating rounded>
            {{ boxcapacity }} {{ selected_local.bundle_count }}
          </q-badge>
        </div>
        <q-chip class="absolute-bottom" text-right text-color="white">
          x {{ quantity }}
          <div class="absolute-top-right transparent">
            <q-badge v-if="bonus_quantity > 0" color="red" floating rounded>
              {{ bonus_quantity }}
            </q-badge>
          </div>
        </q-chip>
      </q-img>
    </div>
    <div>
      <q-dialog v-model="card" :id="category">
        <q-card
          class="row justify-center q-px-none q-mx-none"
          style="width: 80%"
        >
          <q-btn
            class="absolute-top-right bg-dark z-top q-ma-xs"
            text-color="white"
            icon="close"
            v-close-popup
          >
          </q-btn>
          <q-btn
            class="absolute-top-left bg-red z-top q-ma-xs"
            round
            ripple
            push
            unelevated
            icon="delete"
            @click="this.deleteConfirm = true"
          />
          <q-badge
            class="absolute-top-right z-top q-ma-xs q-mt-xl"
            v-if="bonuscondition > 0"
            color="orange"
            floating
            rounded
          >
            {{ bonuscondition }}+1
          </q-badge>

          <q-img
            :src="img"
            style="max-width: 75%"
            class="rounded-borders q-mt-xs"
          >
            <q-chip
              v-if="buyoption == false"
              class="absolute-bottom"
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
            <!-- <div class="absolute-bottom-right transparent">
              <q-badge
                v-if="stock >0"
                class="q-mt-md"
                color="red"
                floating
                rounded
              >
                <q-icon name="warning" color="white" />
                {{
                  stock == null
                    ? selected_local.stock_enough
                    : selected_local.stock_null
                }}
              </q-badge>
            </div> -->
          </q-img>

          <q-card-section class="row q-px-sm q-py-none">
            <div v-if="!buyoption" class="col-12 text-h6 text-bold">
              <q-icon name="img:icons\currency-krw-black.png" />
              {{ (price - cutprice) * this.localQuantity }}
              {{ selected_local.won }}
            </div>
            <div v-else class="col-12 text-h6 text-bold">
              <q-icon name="img:icons\currency-krw-black.png" />
              {{ boxprice * this.localQuantity }} {{ selected_local.won }}
            </div>
            <q-btn
              :disable="localQuantity <= 0"
              class="col-3"
              size="xs"
              icon="remove"
              @click="handle(product_name, -1)"
            ></q-btn>
            <q-input
              class="col-6"
              style="vertical-align: top"
              readonly
              disable
              dense
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
              @click="handle(product_name, 1)"
            ></q-btn>
            <!-- <q-btn
              class="col-9 q-my-xs"
              disable
              glossy
              icon="shopping_cart_checkout"
              color="primary"
              tag="a"
              to="/OrderList"
              :label="selected_local.gocounter"
            />

            <q-btn
              class="col-3 q-my-xs"
              color="white"
              text-color="primary"
              glossy
              icon="add_shopping_cart"
              @click="sendToCart(this.product_name, quantity)"
            /> -->
          </q-card-section>
          <q-card-section class="row q-mt-none q-pt-xs q-px-sm">
            <q-bar dense class="col-12 bg-dark text-white">
              {{ selected_local.default_info }}
            </q-bar>

            <q-input
              class="col-6"
              readonly
              disable
              borderless
              dense
              :label="selected_local.productname"
              :model-value="product_name"
            />
            <q-input
              class="col-6"
              dense
              readonly
              disable
              borderless
              :label="selected_local.flavorandspec"
              :model-value="tag"
            />
            <q-input
              v-if="product_desc != null"
              class="col-12"
              readonly
              dense
              autogrow
              disable
              borderless
              :label="selected_local.product_desc"
              :model-value="product_desc"
            />

            <q-input
              v-if="product_name_ko != null"
              class="col-6"
              readonly
              dense
              disable
              borderless
              :label="selected_local.productname_ko"
              :model-value="product_name_ko"
            />
            <q-input
              class="col-6"
              readonly
              dense
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
              dense
              disable
              borderless
              :label="selected_local.production_date"
              :model-value="selected_local.after"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="deleteConfirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="warning" color="warning" text-color="white" />
            <span class="q-ml-sm">{{ selected_local.confirm_delete }} </span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              flat
              :label="selected_local.cancel"
              color="negative"
              v-close-popup
            />
            <q-btn
              flat
              :label="selected_local.confirm"
              color="positive"
              v-close-popup
              @click="deleteProductFromCart(product_name)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {Notify} from 'quasar';
  import {mapState} from 'vuex';
  import {ref} from 'vue';

  export default defineComponent({
    name: 'OrderItemInfo',
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
      localQuantity: {
        get: function () {
          return this.quantity;
        },
        set: function (value) {
          this.$emit('setquantity', value);
        },
      },
    },
    props: {
      product_id: {
        type: Number,
        default: 0,
      },
      img: {
        type: String,
        required: '',
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
      quantity: {
        type: Number,
        default: 0,
      },
      bonus_quantity: {
        type: Number,
        default: 0,
      },
      buyoption: {
        type: Boolean,
        default: false,
      },
      category: {
        type: String,
        default: '&',
      },
      stock: {
        type: Number,
        default: 0,
      },
      shelf_life: {
        type: Number,
        default: 0,
      },
      production_date: {
        type: Date,
        default: '1900-01-01',
      },
    },
    setup() {
      return {
        card: ref(false),
        deleteConfirm: ref(false),
      };
    },
    methods: {
      handle(name, value) {
        this.localQuantity += value;
        this.sendToCart(name, this.localQuantity);
        if (this.localQuantity == 1 && value == -1) {
          this.deleteConfirm = true;
        }
      },
      sendToCart(name, quantity) {
        Notify.create({
          position: 'top',
          message: this.selected_local.shopingcart + ':(' + name + ') ' + 1,
          color: 'orange',
        });
        //alert('(' + name + ')' + amount + '개를 장바구니에 넣었습니다.');
        this.$emit('sendOrderItem');
      },
      deleteProductFromCart(name) {
        this.orderCount = 0;

        Notify.create({
          position: 'top',
          message: this.selected_local.deleted + name + ')',
          color: 'red',
        });

        this.$emit('sendDeleteItem');
        this.card = false;
      },
    },
  });
</script>
