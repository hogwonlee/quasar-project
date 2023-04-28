<template>
  <div>
    <div @click="card = true">
      <q-img :src="img" class="rounded-borders">
        <q-badge
          color="positive"
          floating
          rounded
          transparent
          :label="quantity"
        />
        <!-- <q-chip
          class="absolute-bottom row justify-center"
          style="vertical-align: bottom"
          icon="sell"
          text-color="white"
          >{{ product_name }}
        </q-chip> -->
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
          <q-card-section class="row q-py-xs">
            <q-img :src="img" class="rounded-borders col-5" />
            <q-card-section class="col-6">
              <q-input
                readonly
                disable
                borderless
                dense="true"
                label="名称： "
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
                readonly
                disable
                borderless
                dense="true"
                label="规格/风味： "
                :model-value="tag"
              >
              </q-input>
            </q-card-section>
          </q-card-section>
          <q-separator />
          <!-- </q-drawer> -->
          <q-card-section class="row justify-center q-py-none">
            <q-input
              class="q-pa-sm col-4"
              readonly
              disable
              borderless
              dense="true"
              label="单价： "
              :model-value="price"
            >
            </q-input>
            <q-input
              class="q-pa-sm col-8"
              readonly
              disable
              outlined
              bg-color="teal-2"
              dense="true"
              input-class="text-right"
              :model-value="price * quantity"
            >
              <template v-slot:prepend>
                <q-icon name="shopping_cart_checkout"></q-icon>
              </template>
            </q-input>
          </q-card-section>

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
              :model-value="quantity"
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

          <q-btn
            glossy
            color="primary"
            icon="delete"
            label="상품 제거"
            @click="this.deleteConfirm = true"
          />
          <q-dialog v-model="deleteConfirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="warning" color="warning" text-color="white" />
                <span class="q-ml-sm"
                  >이 상품을 장바구니에서 제거하시겠습니까?</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="취소" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="확인"
                  color="primary"
                  v-close-popup
                  @click="deleteProductFromCart(this.product_name)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {Notify} from 'quasar';
  import {ref} from 'vue';

  export default defineComponent({
    name: 'OrderItemInfo',

    props: {
      img: {
        type: Image,
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
        type: Int32Array,
        default: 0,
      },
      quantity: {
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
          message: '购物车： (' + name + ') + 1',
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
            message: '购物车： (' + name + ') - 1',
            color: 'red',
          });

          this.$emit('sendRemoveItem');
        } else {
          Notify.create({
            position: 'top',
            message: '已卸完',
            color: 'red',
          });
        }
      },
      deleteProductFromCart(name) {
        this.orderCount = 0;

        Notify.create({
          position: 'top',
          message: '已删除： (' + name + ')',
          color: 'red',
        });

        this.$emit('sendDeleteItem');
        this.card = false;
      },
    },
  });
</script>
