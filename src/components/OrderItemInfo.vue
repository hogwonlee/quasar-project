<template>
  <div>
    <div @click="card = true">
      <q-img :src="img" class="rounded-borders" :ratio="3 / 4" position="0 0">
        <div class="absolute-top-right q-ma-sm transparent">
          <!-- <q-badge v-if="buyoption == true" color="red" floating rounded>
            {{ boxcapacity }} {{ selected_local.bundle_count }}
          </q-badge> -->
          <q-badge floating rounded>
            {{
              selected_local.chinafood == '洽洽中国食品'
                ? flavor_refer
                : flavor_refer_ko
            }}x
            {{ buyoption == true ? quantity + 'x' + boxcapacity : quantity }}
            <!-- {{ quantity }} -->
          </q-badge>
        </div>
        <q-chip class="absolute-bottom" text-right text-color="white">
          <q-icon name="img:icons\currency-krw-white.png" />
          {{ buyoption == true ? quantity * boxprice : quantity * price }}
          <div class="absolute-top-right transparent">
            <q-badge v-if="bonus_quantity > 0" color="red" floating rounded>
              +{{ bonus_quantity }}
            </q-badge>
          </div>
        </q-chip>
      </q-img>
    </div>
    <div>
      <q-dialog v-model="card" :id="category" position="top">
        <q-card style="height: 60%; max-width: 70%; width: 70%">
          <q-img :src="img" class="q-qa-sm" />
          <div style="text-align: center">---底线---</div>
          <div style="height: 30px"></div>
        </q-card>
        <q-page-sticky class="bg-white" position="bottom" :offset="[0, -60]">
          <q-card-section class="row q-mt-none q-mb-sm q-py-none q-px-sm">
            <div class="text-white">제품 가격과 수량</div>
            <!-- 흰색 텍스트로 보여지지 않음 -->
            <q-btn
              class="absolute-top-right bg-dark z-top q-ma-xs"
              text-color="white"
              icon="close"
              v-close-popup
            >
            </q-btn>

            <div v-if="buyoption == true" class="col-12 text-h6 text-bold">
              <q-icon name="img:icons\currency-krw-black.png" />
              {{ boxprice * this.localQuantity }}
              {{ selected_local.won }}
              <q-btn
                class="bg-red z-top q-ma-xs"
                padding="sm"
                round
                icon="delete"
                @click="this.deleteConfirm = true"
              />
            </div>
            <div v-else class="col-12 text-h6 text-bold">
              <q-icon name="img:icons\currency-krw-black.png" />
              {{ (price - cutprice) * this.localQuantity }}
              {{ selected_local.won }}
              <q-btn
                class="bg-red z-top q-ma-xs"
                padding="sm"
                round
                icon="delete"
                @click="this.deleteConfirm = true"
              />
            </div>
            <!-- <q-btn
              :disable="localQuantity <= 9"
              class="col-2"
              label="-10"
              text-color="negative"
              @click="handle(this.product_name, -10)"
              size="xs"
            ></q-btn> -->
            <q-btn
              :disable="localQuantity <= 0"
              class="col-3"
              icon="remove"
              text-color="negative"
              @click="handle(this.product_name, -1)"
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
                class="q-mt-sm q-ml-lg transparent"
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
              @click="handle(this.product_name, 1)"
            ></q-btn>
            <!-- <q-btn
              class="col-2"
              label="+10"
              size="xs"
              text-color="positive"
              @click="handle(this.product_name, 10)"
            ></q-btn> -->
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
      flavor_refer: {
        type: String,
        default: '',
      },
      flavor_refer_ko: {
        type: String,
        default: '',
      },
      stock: {
        type: Number,
        default: 0,
      },
      water_delivery: {
        type: Number,
        default: 0,
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
