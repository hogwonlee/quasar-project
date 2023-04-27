<template>
  <div>
    <q-card class="bg-teal-2">
      <div v-if="user_status">
        <!-- <div>배송 주소 이름: {{ this.address_selected.address_tag }}</div>
      <div>수령인: {{ this.address_selected.recipient }}</div>
      <div>전화: {{ this.address_selected.recipient_phone }}</div> -->
        <q-input
          color="white-1"
          standout
          readonly
          label="收件人/수령인"
          :model-value="this.address_selected.recipient"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          color="white-1"
          standout
          readonly
          label="送货地址/배송주소"
          :model-value="
            this.address_selected.address1 +
            ' ' +
            this.address_selected.address2 +
            ' ' +
            this.address_selected.address3
          "
        >
          <template v-slot:prepend>
            <q-icon name="place" />
          </template>
        </q-input>
      </div>
      <div v-else>
        <q-input
          v-model="warning_text"
          readonly
          standout
          color="red-10"
        ></q-input>
      </div>
      <div class="absolute-top-right q-ma-sm">
        <q-btn
          v-if="!is_addr_added"
          class="text-bold text-white"
          color="negative"
          label="登录地址"
          lang="zh-CN"
          @click="register_popup = true"
        ></q-btn>
        <q-btn
          v-else
          class="text-bold"
          color="primary"
          label="变更"
          lang="zh-CN"
          @click="address_popup = true"
        ></q-btn>
      </div>
    </q-card>
    <q-dialog v-model="register_popup">
      <AddressRegister class="q-px-sm q-pb-sm bg-secondary" />
    </q-dialog>
    <!-- 주소가 등록되었는지 여부와 상관없이 배송지 변경할 버튼이 노출되어야 함 -->

    <q-dialog v-model="address_popup">
      <AddressList class="q-px-sm q-pb-sm bg-secondary" />
    </q-dialog>

    <div class="q-pa-md bg-teal">
      <q-chip outline color="grey-1" class="bg-teal text-body3 text-grey-1"
        >订单 주문 리스트</q-chip
      >
      <p v-show="!cartList.length">
        <i>상품을 추가해주세요.</i>
      </p>
      <div class="row q-pa-xs virtual-scroll-horizontal">
        <OrderItemInfo
          @sendOrderItem="
            this.$store.dispatch('cart/addProductToCart', product)
          "
          @sendRemoveItem="
            this.$store.dispatch('cart/removeProductFromCart', product)
          "
          @sendDeleteItem="
            this.$store.dispatch('cart/deleteProductFromCart', product)
          "
          class="col-xs-3 col-sm-3 col-md-2 q-pa-xs"
          v-for="product in cartProduct"
          :key="product.id"
          v-bind="product"
          v-bind:item-count="product.quantity"
        />
      </div>
    </div>

    <q-card class="q-py-sm bg-teal-2">
      <q-markup-table flat bordered class="q-ma-md justify-center">
        <tbody items-center>
          <tr class="row">
            <td class="text-left bg-teal col-4">食品价格:</td>
            <td class="text-right col-8">{{ total }} 韩元</td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">运送费:</td>
            <td class="text-right col-8">
              <q-chip
                dense
                color="teal"
                icon="new_releases"
                label="满3万，免运费"
                text-color="white"
              />
              {{ shipment }} 韩元
            </td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">포인트:</td>
            <td class="text-right col-8">5000 임시 임의 수</td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">总计:</td>
            <td class="text-right col-8">{{ total + shipment }} 韩元</td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-btn
        style="background: teal; color: white"
        :disabled="!cartList.length"
        label="结算 / 결제하기"
        @click="selectPaymentmethod(total, shipment)"
      >
        <!-- @click="set_order_with_address(this.address_selected.address_id)" -->
      </q-btn>
    </q-card>

    <p v-show="checkoutStatus">checkout {{ checkoutStatus }}.</p>
    <q-dialog v-model="basic" @show="selectPaymentmethod(total)">
      <q-card>
        <q-card-section>
          <div class="text-h6">收银台</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <p id="payment-method"></p>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="결제" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><LoginPage
    /></q-dialog>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex';
  import OrderItemInfo from 'components/OrderItemInfo.vue';
  import LoginPage from 'components/LoginPage.vue';
  import {ref} from 'vue';
  import {loadTossPayments} from '@tosspayments/payment-sdk';
  import validation from 'src/util/data/validation';
  import {Cookies, useQuasar} from 'quasar';
  import AddressList from './AddressList.vue';
  import AddressRegister from './AddressRegister.vue';
  import {date} from 'quasar';
  const clientKey = 'test_ck_Lex6BJGQOVD5xn945RarW4w2zNbg';

  export default {
    name: 'OrderList',
    components: {
      OrderItemInfo,
      LoginPage,
      AddressList,
      AddressRegister,
    },
    setup() {
      const warning_text =
        '경고: 등록한 주소가 없습니다. 신규 주소를 등록해주세요!';
      const $q = useQuasar();
      function confirm() {
        $q.dialog({
          title: 'Confirm',
          message: '로그아웃 되었습니다.',
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            // console.log('>>>> OK')
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      }
      return {
        confirm,
        is_addr_added: ref(false),
        basic: ref(false),
        persistent: ref(false),
        address_selected: '',
        address_popup: ref(false),
        register_popup: ref(false),
        warning_text,
      };
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        cartList: state => state.cart.items,
        addressList: state => state.address.items, // store/index에 addresses로 추가됨.
        user: state => state.user.USER,
        order: state => state.order.items,
        user_status: state => state.user.status,
      }),
      ...mapGetters('cart', {
        cartProduct: 'cartProducts',
        total: 'cartTotalPrice',
        shipment: 'shipmentPrice',
      }),
    },
    watch: {},
    methods: {
      getSelectedAddress() {
        if (!this.is_addr_added) {
          this.is_addr_added = !validation.isNull(this.addressList); // 값이 없으면 true
        }

        if (this.is_addr_added && validation.isNull(this.address_selected)) {
          var return_addr;
          this.addressList.forEach(addr => {
            if (addr.is_default === 1) {
              return_addr = addr;
            }
          });
          this.address_selected = return_addr;
        }
      },

      selectPaymentmethod(total, shipment) {
        var amountOfPayment = total + shipment;
        var random_id = 'test' + this.user.USER_ID + Date.now();
        loadTossPayments(clientKey).then(tossPayments =>
          tossPayments.requestPayment('카드', {
            amount: amountOfPayment,
            orderId: random_id,
            orderName: '토스 티셔츠 외 2건',
            customerName: '박토스',
            successUrl: 'http://localhost:9000/#/Success',
            failUrl: 'http://localhost:9000/#/Fail',
          }),
        );
      },
    },
    mounted() {
      this.getSelectedAddress();
    },
  };
</script>
