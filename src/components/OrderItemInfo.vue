<template>
  <div>
    <div @click="card = true">
      <q-img :src="img" class="rounded-borders" :ratio="1" position="0 0">
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
        <q-card style="height: 50%; width: 80%">
          <q-input
            class="col-12"
            readonly
            disable
            dense
            borderless
            :label="selected_local.productname"
            :model-value="product_name"
          />
          <!-- <q-input
            v-if="product_name_ko != null"
            class="col-12"
            readonly
            disable
            dense
            borderless
            :label="selected_local.productname_ko"
            :model-value="product_name_ko"
          /> -->
          <img :src="img" />
        </q-card>
        <q-page-sticky class="bg-white" position="bottom" :offset="[0, -50]">
          <q-card-section class="row q-mt-none q-py-none q-px-sm">
            <div class="text-white">제품 가격과 수량</div>
            <q-btn
              class="absolute-top-right bg-dark z-top q-ma-xs"
              text-color="white"
              icon="close"
              v-close-popup
            >
            </q-btn>
            <!-- round
            ripple
            push
            unelevated -->
            <q-btn
              class="absolute-top bg-red z-top q-mt-xs"
              icon="delete"
              @click="this.deleteConfirm = true"
            />
            <div class="col-12 text-h6 text-bold">
              <q-icon name="img:icons\currency-krw-black.png" />
              {{ (price - cutprice) * this.localQuantity }}
              {{ selected_local.won }}
            </div>
            <q-btn
              :disable="localQuantity <= 9"
              class="col-2"
              label="-10"
              text-color="negative"
              @click="handle(this.product_name, -10)"
              size="xs"
            ></q-btn>
            <q-btn
              :disable="localQuantity <= 0"
              class="col-2"
              icon="remove"
              text-color="negative"
              @click="handle(this.product_name, -1)"
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
              class="col-2"
              icon="add"
              size="xs"
              text-color="positive"
              @click="handle(this.product_name, 1)"
            ></q-btn>
            <q-btn
              class="col-2"
              label="+10"
              size="xs"
              text-color="positive"
              @click="handle(this.product_name, 10)"
            ></q-btn>
          </q-card-section>
        </q-page-sticky>

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
        quantity = quantity + 1;
        Notify.create({
          position: 'top',
          message:
            this.selected_local.shopingcart + ':(' + name + ') ' + quantity,
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
