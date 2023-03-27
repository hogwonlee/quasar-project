<template>
  <!-- <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section> -->
  <div>
    <div @click="card = true">
      <q-img :src="productImg" class="rounded-borders"> </q-img>
      <q-card-section>
        <div class="text-subtitle2 text-center">{{ title }} : {{ price }}</div>
      </q-card-section>
    </div>
    <div>
      <q-dialog v-model="card">
        <q-card class="my card" style="width: 600px; height: 300px">
          <q-layout>
            <q-drawer
              show-if-above
              :width="160"
              :breakpoint="160"
              class="q-ma-sm"
            >
              <q-img
                :src="productImg"
                style="height: 140px; max-width: 140px"
                class="rounded-borders"
              />
            </q-drawer>
            <q-page-container class="q-pa-md">
              <span>
                {{ title }} <br />
                단가: {{ price }} <br />
              </span>

              <q-separator />
              <q-input
                readonly
                disable
                stack-label
                outlined
                label="주문 금액"
                :model-value="price * this.orderCount"
              >
                <template v-slot:prepend>
                  <q-icon name="payments"></q-icon>
                </template>
                <template v-slot:append> 원 </template>
              </q-input>

              <q-card-actions align="right" class="row">
                <q-btn
                  class="col-3"
                  style="height: 56px"
                  glossy
                  color="negative"
                  icon="remove_shopping_cart"
                  @click="removefromCart(this.title)"
                  ><q-badge rounded color="orange" floating>-1</q-badge></q-btn
                >
                <q-input
                  class="q-ma-md"
                  style="max-width: 100px"
                  outlined
                  readonly
                  disable
                  stack-label
                  label="수량"
                  v-model="this.orderCount"
                ></q-input>
                <!-- <span class="q-pa-md">수량: {{ this.orderCount }} </span> -->
                <q-btn
                  class="col-3"
                  style="height: 56px"
                  glossy
                  color="primary"
                  icon="add_shopping_cart"
                  @click="sendToCart(this.title)"
                  ><q-badge rounded color="orange" floating>1</q-badge></q-btn
                >
              </q-card-actions>

              <!-- <span class="q-pa-md">
                  구매 금액: {{  }}</span
                > -->
              <q-separator></q-separator>
              <q-card-actions class="row" align="right">
                <q-btn
                  class="col-5"
                  label="다른 상품 보기"
                  v-close-popup
                ></q-btn>
                <q-btn
                  glossy
                  class="col-5"
                  color="primary"
                  label="결제하기"
                  tag="a"
                  to="/OrderList"
                  icon="shopping_cart_checkout"
                >
                </q-btn>
              </q-card-actions>
            </q-page-container>
          </q-layout>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';
  import {Notify} from 'quasar';
  import {text} from 'body-parser';
  import OrderList from './OrderList.vue';

  export default defineComponent({
    name: 'ProductInfo',
    data: function () {
      return {
        orderCount: this.itemCount,
      };
    },
    watch: {
      orderCount: function (val) {}, //주문 수량 추가 시 화면에 바로 수량을 확인할 수 있도록 추가한 변수임.
    },
    props: {
      productImg: {
        type: String,
        required: true,
      },
      title: {
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
          message: '(' + name + ') 1개를 장바구니에 넣었습니다.',
          color: 'purple',
        });
        //alert('(' + name + ')' + amount + '개를 장바구니에 넣었습니다.');
        this.$emit('sendOrderItem');
      },
      removefromCart(name) {
        if (this.orderCount > 0) {
          this.removeThisItem();
          Notify.create({
            message: '(' + name + ') 1개를 장바구니에서 제거했습니다.',
            color: 'red',
          });
          this.$emit('sendRemoveItem');
        } else {
          Notify.create({
            message: '모두 제거했습니다. 더이상 제거할 수 없습니다.',
            color: 'red',
          });
        }
      },
    },
  });
</script>
