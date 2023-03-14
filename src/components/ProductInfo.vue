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
        <q-card class="my card" style="width: 800px">
          <q-layout>
            <q-drawer
              show-if-above
              :width="160"
              :breakpoint="400"
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
            </q-page-container>

            <q-separator />

            <q-card-actions align="right">
              <span class="q-pa-md"
                >수량: {{ this.orderCount }}<br />
                구매 금액: {{ price * this.orderCount }}</span
              >
              <q-btn
                glossy
                color="negative"
                icon="remove_shopping_cart"
                @click="removefromCart(this.title)"
                ><q-badge rounded color="orange" floating>-1</q-badge></q-btn
              >
              <q-btn
                glossy
                color="primary"
                icon="add_shopping_cart"
                @click="sendToCart(this.title)"
                ><q-badge rounded color="orange" floating>1</q-badge></q-btn
              >
            </q-card-actions>
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
