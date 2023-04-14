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
          label="배송주소/送货地址"
          :model-value="
            '(' +
            this.address_selected.recipient +
            ') ' +
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
          label="주소등록 / 地址登记"
          lang="zh-CN"
          @click="register_popup = true"
        ></q-btn>
        <q-btn
          v-else
          class="text-bold"
          color="primary"
          label="변경 / 变更"
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
        >주문 리스트</q-chip
      >
      <p v-show="!cart.length">
        <i>상품을 추가해주세요.</i>
      </p>
      <div class="row q-pa-xs virtual-scroll-horizontal">
        <OrderItemInfo
          @sendOrderItem="addProductToCart(product)"
          @sendRemoveItem="removeProductFromCart(product)"
          @sendDeleteItem="deleteProductFromCart(product)"
          class="col-2 q-pa-sm"
          v-for="product in cart"
          :key="product.id"
          v-bind="product"
          v-bind:item-count="product.quantity"
        />
      </div>
    </div>

    <q-card class="row q-py-sm bg-teal-2">
      <q-markup-table flat bordered class="col-8 q-ma-md justify-center">
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
            <td class="text-left bg-teal col-4">포인트:</td>
            <td class="text-right col-8">5000 임시 임의 수</td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">총:</td>
            <td class="text-right col-8">{{ total + shipment }} 원</td>
          </tr>
        </tbody>
      </q-markup-table>
      <div class="col-3">
        <q-btn
          class="absolute-right q-pa-xl q-ma-md text-bold text-h6"
          style="background: teal; color: white"
          :disabled="!cart.length"
          @click="set_order_with_address(this.address_selected.address_id)"
          label="结算 / 결제하기"
        >
          <!-- @click="selectPaymentmethod(total, shipment)" -->
        </q-btn>

        <!-- <q-btn
          v-if="!check_login()"
          style="background: slateblue; color: white"
          @click="login_popup"
          label="로그인"
        >
        </q-btn>
        <q-btn
          v-else
          style="background: slateblue; color: white"
          @click="logout"
          label="로그아웃"
        >
        </q-btn> -->
      </div>
    </q-card>

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
  import order from 'src/store/orderList';
  import axios from 'axios';
  import validation from 'src/util/data/validation';
  import {Cookies, useQuasar} from 'quasar';
  import check from 'src/util/modules/check';
  import AddressList from './AddressList.vue';
  import AddressRegister from './AddressRegister.vue';
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
      user_status() {
        return user.state.status;
      },
      user_id_get: user.getters.getMyId,
      user_token_get: user.getters.getMyToken,
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
        // console.log('기본 주소 찾는중');
        if (!this.is_addr_added) {
          this.is_addr_added = !validation.isNull(this.addressList); // 값이 없으면 true
          // console.log('주소가 있는가?' + this.is_addr_added);
          // console.log(
          //   '기본 주소의 상태는 (값이 없으면 true)' +
          //     validation.isNull(this.address_selected), // 값이 없으면 true
          // );
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
          // console.log(
          //   '주소 세팅후에는 있어야 하는데....' +
          //     validation.isNull(this.address_selected), // 값이 없으면 true
          // );
        }
      },

      set_order(address_id) {
        // 구매 요청 보내기 = 서버 DB에 주문 데이터 넣기
        // console.log('주문 보내기 주소아이디: ' + address_id);
        axios({
          url: 'http://localhost:3001/orderGroupRegister',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user_token_get,
          },

          data: {user_id: this.user_id_get, address_id: address_id},
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
      set_order_with_address(address_id) {
        const query_data = {
          user_id: this.user_id_get,
          address_id: address_id,
          order_data: JSON.parse(JSON.stringify(this.cartItems)),
        };
        // console.log(JSON.stringify(query_data.order_data));
        axios({
          url: 'http://localhost:3001/orderRegister',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user_token_get,
          },
          data: query_data,
        })
          .then(res => {
            // // this.select_order_group();
            // console.log(
            //   '주문 성공후 처리: ' + JSON.stringify(res.data.results),
            // );
          })
          .catch(res => console.log('에러: ' + res));
      },
      select_order_group() {
        axios({
          url: 'http://localhost:3001/deliveryInfo',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user_token_get,
          },

          data: {user_id: this.user_id_get},
        })
          .then(res => {
            console.log(JSON.stringify(res.data.results));
            order.dispatch('pushOrderAction', res.data.results);
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
