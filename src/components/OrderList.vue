<template>
  <div>
    <div class="q-pa-md bg-primary">
      <q-chip outline color="grey-1" class="bg-primary text-body3 text-grey-1"
        >주문 리스트</q-chip
      >
      <p v-show="!cart.length">
        <i>상품을 추가해주세요.</i>
      </p>
      <div class="row q-pa-sm virtual-scroll-horizontal" style="height: 224px">
        <OrderItemInfo
          @sendOrderItem="addProductToCart(product)"
          @sendRemoveItem="removeProductFromCart(product)"
          @sendDeleteItem="deleteProductFromCart(product)"
          class="col-3 q-pa-sm"
          v-for="product in cart"
          :key="product.id"
          v-bind="product"
          v-bind:item-count="product.quantity"
        />
      </div>
    </div>
    <div v-if="check_login()">
      <div v-if="this.is_addr_added">
        <div>배송 주소 이름: {{ this.address_selected.address_tag }}</div>
        <div>수령인: {{ this.address_selected.recipient }}</div>
        <div>주소: {{ this.address_selected.recipient_phone }}</div>
        <div>
          {{
            this.address_selected.address1 +
            this.address_selected.address2 +
            this.address_selected.address3
          }}
        </div>
      </div>
      <div v-else>등록된 주소가 없습니다. 주소를 등록해주시기 바랍니다.</div>
    </div>
    <!-- //로그인이 아니라 주소가 등록되었는지 확인 -->
    <q-btn
      v-if="check_login()"
      class="text-bold text-black"
      color="warning"
      label="!주소 변경/등록 / 地址变更/登记!"
      tag="a"
      lang="zh-CN"
      to="/AddressList"
    ></q-btn>
    <!-- 주소가 등록되었는지 여부와 상관없이 배송지 변경할 버튼이 노출되어야 함 -->
    <q-btn
      class="text-bold"
      color="primary"
      label="변경 / 变更"
      tag="a"
      lang="zh-CN"
      to="/AddressList"
    ></q-btn>
    <q-markup-table flat bordered class="q-ma-md justify-center">
      <tbody items-center>
        <tr class="row">
          <td class="text-left bg-teal col-4">주문 금액:</td>
          <td class="text-right col-8">{{ total }} 원</td>
        </tr>
        <tr class="row">
          <td class="text-left bg-teal col-4">배송비:</td>
          <td class="text-right col-8">
            <q-chip
              dense
              color="teal"
              icon="new_releases"
              label="2만원 이상 구매 시 무료 배송"
              text-color="white"
            />
            {{ shipment }} 원
          </td>
        </tr>
        <tr class="row">
          <td class="text-left bg-teal col-4">총:</td>
          <td class="text-right col-8">{{ total + shipment }} 원</td>
        </tr>
      </tbody>
    </q-markup-table>

    <p>
      <q-btn
        style="background: slateblue; color: white"
        :disabled="!cart.length"
        @click="selectPaymentmethod(total, shipment)"
      >
        결제하기
      </q-btn>

      <q-btn
        v-if="!check_login()"
        style="background: slateblue; color: white"
        @click="login_popup"
        label="로그인"
      >
      </q-btn>
      <q-btn
        style="background: slateblue; color: white"
        @click="logout"
        label="로그아웃"
      >
      </q-btn>
    </p>
    <p v-show="checkoutStatus">checkout {{ checkoutStatus }}.</p>

    <q-dialog v-model="basic" @show="selectPaymentmethod(total)">
      <q-card>
        <q-card-section>
          <div class="text-h6">결제 수단</div>
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
  import user from 'src/store/user/userInfo';
  import address from 'src/store/user/addressInfo';
  import cart from 'src/store/cartList';
  import axios from 'axios';
  import validation from 'src/util/data/validation';
  import {Cookies, useQuasar} from 'quasar';
  import check from 'src/util/modules/check';
  const clientKey = 'test_ck_Lex6BJGQOVD5xn945RarW4w2zNbg';

  export default {
    name: 'OrderList',
    components: {
      OrderItemInfo,
      LoginPage,
    },
    setup() {
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
      };
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        cart: state => state.cart.all,
        address: state => state.all, // store/index에 addresses로 추가됨.
        user: state => state.all,
        order: state => state.all,
      }),
      ...mapGetters('cart', {
        cart: 'cartProducts',
        cartItems: 'getCartItems',
        total: 'cartTotalPrice',
        shipment: 'shipmentPrice',
      }),
      addressList: address.getters.getAddressList,
    },
    watch: {
      addressList: function (val) {
        console.log(val);
      },
    },
    methods: {
      logout() {
        user.dispatch('logoutAction');
        address.dispatch('emptyAddressAction');
      },
      getSelectedAddress() {
        console.log('기본 주소 찾는중');
        if (!this.is_addr_added) {
          this.is_addr_added = !validation.isNull(this.addressList); // 값이 없으면 true
          console.log('주소가 있는가?' + this.is_addr_added);
          console.log(
            '기본 주소의 상태는 (값이 없으면 true)' +
              validation.isNull(this.address_selected), // 값이 없으면 true
          );
        }

        if (this.is_addr_added && validation.isNull(this.address_selected)) {
          var return_addr;
          this.addressList.forEach(addr => {
            // address.getters.getAddressList.forEach(addr => {
            if (addr.is_default === 1) {
              return_addr = addr;
            } else {
              console.log('기본 주소가 아닌가 봄');
            }
          });
          this.address_selected = return_addr;
          console.log(
            '주소 세팅후에는 있어야 하는데....' +
              validation.isNull(this.address_selected), // 값이 없으면 true
          );
        }
      },

      set_order(address_id) {
        // 구매 요청 보내기 = 서버 DB에 주문 데이터 넣기
        axios({
          url: 'http://localhost:3001/orderGroupResister',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: user.state.USER_TOKEN,
          },

          data: {address_id: address_id},
        })
          .then(res => {
            // console.log(
            //   '주문 등록 응답값: ' + JSON.stringify(res.data.results),
            // );
            const orderData = JSON.parse(JSON.stringify(this.cartItems));
            orderData.forEach(data => (data['order_group'] = res.data.results));

            // console.log(JSON.stringify(orderData));
            this.set_order_with_address(orderData);
          })
          .catch(res => console.log('에러: ' + res));
      },
      set_order_with_address(orderData) {
        axios({
          url: 'http://localhost:3001/orderResister',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: user.state.USER_TOKEN,
          },

          data: orderData,
        })
          .then(res => {
            console.log(
              '주문 등록 응답값: ' + JSON.stringify(res.data.results),
            );
          })
          .catch(res => console.log('에러: ' + res));
      },
      check_login() {
        if (check.check_login()) {
          return true;
        } else {
          return false;
        }
      },
      check_null_address() {
        if (address.state.post_code == '') {
          return false;
        } else {
          return true;
        }
      },
      login_popup() {
        if (!this.check_login) {
          alert('로그인이 필요합니다.');
          return;
        }
        if (!this.check_null_address) {
          alert('배송할 주소를 등록/선택해 주세요.');
          return;
        }
        this.persistent = true;
      },
      ...mapActions('cart', ['addProductToCart']),
      ...mapActions('cart', ['removeProductFromCart']),
      ...mapActions('cart', ['deleteProductFromCart']),
      selectPaymentmethod(total, shipment) {
        var amountOfPayment = total + shipment;
        // console.log(amountOfPayment);
        loadTossPayments(clientKey).then(tossPayments =>
          tossPayments.requestPayment('카드', {
            amount: amountOfPayment,
            orderId: 'test2-gO43carKfiyo7_KPPa-YM',
            orderName: '토스 티셔츠 외 2건',
            customerName: '박토스',
            successUrl: 'http://localhost:9000/#/Success',
            failUrl: 'http://localhost:9000/#/Fail',
          }),
        );
      },
      ...mapActions('cart', ['checkout']),
    },
    mounted() {
      this.getSelectedAddress();
    },
  };
</script>
