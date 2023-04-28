<template>
  <!-- <q-item-section v-if="icon" avatar>
    <q-icon :name="icon" />
  </q-item-section> -->
  <div>
    <div @click="card = true">
      <q-img :src="img" class="rounded-borders">
        <q-chip
          class="absolute-bottom"
          dense
          text-color="white"
          icon="img:src\assets\icons\currency-krw-white.png"
        >
          {{ price }}

          <q-badge color="teal" floating rounded transparent :label="tag" />
        </q-chip>
      </q-img>
    </div>
    <div>
      <q-dialog v-model="card" :id="category">
        <q-card class="bg-teal-3" style="width: 75%; height: fit-content">
          <q-btn
            class="absolute-top-right bg-grey z-top q-ma-xs"
            icon="close"
            v-close-popup
          >
          </q-btn>
          <!-- <q-drawer
            show-if-above
            :width="160"
            :breakpoint="160"
            class="q-pa-sm"
            style="height: 300px; border-right: 1px solid silver"
          > -->
          <q-img :src="img" class="rounded-borders" />
          <q-card-section class="q-ma-xs q-py-none row">
            <q-input
              class="col-6"
              readonly
              disable
              borderless
              dense="true"
              :label="selected_local.productname"
              :model-value="product_name"
            >
            </q-input>
            <!-- <q-input
              readonly
              disable
              borderless
              dense="true"
              label="类别： "
              :model-value="category"
            >
            </q-input> -->

            <q-input
              class="col-6"
              readonly
              disable
              borderless
              dense="true"
              :label="selected_local.flavorandspec"
              :model-value="tag"
            >
            </q-input>
            <!-- </q-drawer> -->
            <q-input
              class="col-6"
              readonly
              disable
              borderless
              dense="true"
              :label="selected_local.unitprice"
              :model-value="price"
            >
            </q-input>
            <q-input
              class="col-6"
              readonly
              disable
              outlined
              bg-color="teal-2"
              :label="selected_local.sellprice"
              dense="true"
              input-class="text-right"
              :model-value="price * this.orderCount"
            >
            </q-input>
          </q-card-section>
          <q-separator />

          <q-card-section class="row justify-center q-py-none">
            <q-btn
              class="col-3"
              style="height: 56px; vertical-align: bottom"
              icon="remove"
              @click="removefromCart(this.product_name)"
            ></q-btn>
            <q-input
              class="q-px-xs col-6"
              style="vertical-align: top"
              readonly
              disable
              outlined
              dense="true"
              bg-color="teal-2"
              v-model="this.orderCount"
              input-class="text-right"
            ></q-input>
            <!-- <span class="q-pa-md">수량: {{ this.orderCount }} </span> -->
            <q-btn
              class="col-3"
              style="height: 56px; vertical-align: bottom"
              icon="add"
              @click="sendToCart(this.product_name)"
            ></q-btn>
            <!-- <q-badge rounded color="orange" floating>1</q-badge> -->
          </q-card-section>
          <q-card-section class="row justify-center q-gutter-sm q-py-xs">
            <q-btn
              class="col-6"
              glossy
              color="primary"
              tag="a"
              to="/OrderList"
              :label="selected_local.gocounter"
            >
              <!-- icon="shopping_cart_checkout" -->
            </q-btn>
            <q-btn
              class="col-5"
              glossy
              :label="selected_local.lookaround"
              v-close-popup
            >
            </q-btn>
          </q-card-section>
          <!-- <span class="q-pa-md">
              구매 금액: {{  }}</span
                > -->
        </q-card>
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
      return {
        orderCount: this.itemCount,
      };
    },
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
    watch: {
      orderCount: function (val) {}, //주문 수량 추가 시 화면에 바로 수량을 확인할 수 있도록 추가한 변수임.
    },
    props: {
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
    },
    setup() {
      return {
        card: ref(false),
      };
    },
    methods: {
      removeThisItem() {
        this.orderCount--;
        if (this.orderCount <= 0) this.orderCount = 0;
      },
      addThisItem() {
        this.orderCount++;
      },
      sendToCart(name) {
        this.addThisItem();
        Notify.create({
          position: 'top',
          message: this.selected_local.shopingcart + '： (' + name + ') + 1',
          color: 'green',
        });
        //alert('(' + name + ')' + amount + '개를 장바구니에 넣었습니다.');
        this.$emit('sendOrderItem');
      },
      removefromCart(name) {
        if (this.orderCount > 0) {
          this.removeThisItem();
          Notify.create({
            position: 'top',
            message: this.selected_local.shopingcart + '： (' + name + ') - 1',
            color: 'red',
          });
          this.$emit('sendRemoveItem');
        } else {
          Notify.create({
            position: 'top',
            message: this.selected_local.deletecomplete,
            color: 'red',
          });
        }
      },
    },
  });
</script>
