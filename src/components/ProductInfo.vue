<template>
  <!-- <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section> -->
  <div>
    <div @click="card = true">
      <q-img :src="productImg"> </q-img>
      <q-card-section>
        <div class="text-subtitle2 text-center">{{ title }} : {{ price }}</div>
      </q-card-section>
    </div>
    <div>
      <q-dialog v-model="card">
        <q-card class="my-card" style="width: 400px">
          <q-img :src="productImg" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="currency_yen"
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

          <q-card-actions align="center">
            <q-btn glossy color="amber" icon="remove" @click="removeThisItem" />
            <q-input
              class="q-gutter-y-md column"
              style="width: 100px"
              outlined
              v-model="this.orderCount"
            />
            <q-btn glossy color="primary" icon="add" @click="addThisItem" />
          </q-card-actions>
          <q-card-actions align="right"
            ><q-btn
              glossy
              color="primary"
              icon="add_shopping_cart"
              @click="sendToCart(this.title, orderCount)"
          /></q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';
  import {Notify} from 'quasar';

  export default defineComponent({
    name: 'ProductInfo',
    data: function () {
      return {
        orderCount: 0,
      };
    },
    watch: {
      orderCount: function (val) {},
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

      to: {
        type: String,
        default: '#',
      },
      itemCount: {
        type: Int8Array,
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
      sendToCart(name, amount) {
        Notify.create({
          message: '(' + name + ')' + amount + '개를 장바구니에 넣었습니다.',
          color: 'purple',
        });
        //alert('(' + name + ')' + amount + '개를 장바구니에 넣었습니다.');
        this.$emit('sendOrderItem');
      },
    },
  });
</script>
