<template>
  <div @click="card = true">
    <q-img :src="productImg"> </q-img>
    <q-card-section>
      <div class="text-subtitle2 text-center">{{ this.orderCount }}</div>
    </q-card-section>
  </div>
  <div>
    <q-dialog v-model="card">
      <q-card class="my-card" style="width: 400px">
        <q-img
          :src="productImg"
          style="width: 128px; height: 128px"
          class="rounded-borders"
        />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="payments"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ title }}
            </div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              {{ price }} 원
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            <q-icon name="payments"></q-icon> {{ price * this.orderCount }} 원
          </div>
        </q-card-section>

        <q-separator />
        <q-card-actions align="left">
          <q-btn
            glossy
            color="negative"
            icon="delete"
            @click="this.deleteConfirm = true"
          />
          <q-card-actions align="right">
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
            >
              <q-badge rounded color="orange" floating>1</q-badge></q-btn
            ></q-card-actions
          >
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="deleteConfirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">이 상품을 장바구니에서 제거하시겠습니까?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="취소" color="primary" v-close-popup />
          <q-btn
            flat
            label="확인"
            color="primary"
            v-close-popup
            @click="deleteProductFromCart(this.title)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {Notify} from 'quasar';
  import {ref} from 'vue';

  export default defineComponent({
    name: 'OrderItemInfo',
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
        type: Image,
        required: true,
      },
      title: {
        type: String,
        default: '',
      },

      price: {
        type: Int32Array,
        default: 0,
      },
      itemCount: Number,
    },
    setup() {
      return {
        card: ref(false),
        deleteConfirm: ref(false),
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
      deleteProductFromCart(name) {
        this.orderCount = 0;

        Notify.create({
          message: '장바구니에서 제거했습니다. (' + name + ')',
          color: 'red',
        });

        this.$emit('sendDeleteItem');
      },
    },
  });
</script>
