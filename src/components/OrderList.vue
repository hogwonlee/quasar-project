<template>
  <div>
    <q-dialog v-model="register_popup">
      <AddressRegister />
    </q-dialog>
    <!-- 주소가 등록되었는지 여부와 상관없이 배송지 변경할 버튼이 노출되어야 함 -->

    <q-dialog v-model="address_popup">
      <AddressList />
    </q-dialog>

    <div class="q-pa-md">
      <q-chip outline color="grey-1" class="bg-dark text-body3 text-grey-1">{{
        selected_local.orderlist
      }}</q-chip>
      <p v-show="!cartList.length">
        <i>{{ selected_local.noordernotice }}</i>
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
          class="col-xs-4 col-sm-4 col-md-3 q-pa-xs"
          v-for="product in cartList"
          :key="product.product_id"
          v-bind="product"
          @setquantity="product.quantity = $event"
        />
      </div>
    </div>
    <q-separator />
    <q-card class="q-py-sm">
      <q-markup-table flat bordered class="q-ma-md justify-center">
        <tbody items-center>
          <tr class="row">
            <td class="text-left bg-grey-3 col-4">
              {{ selected_local.foodprice }}
              <!-- <q-field borderless dense>
                <template v-slot:control>
                </template>
                <template v-slot:append>
                  <q-icon
                    name="live_help"
                    color="positive"
                    @click="buy_event_info()"
                  />
                </template>
              </q-field> -->
            </td>
            <td class="text-right col-8 text-h4">
              {{ total }} {{ selected_local.won }}
            </td>
          </tr>
          <tr class="row">
            <td class="text-left bg-grey-3 col-4">
              <q-field borderless dense>
                <template v-slot:control>
                  {{ selected_local.delivercost }}
                </template>
              </q-field>
            </td>
            <td class="text-right col-8 text-h4">
              <q-chip
                dense
                color="grey"
                icon="new_releases"
                :label="selected_local.delivercostnotice"
                text-color="white"
              />
              {{ shipment }} {{ selected_local.won }}
            </td>
          </tr>
          <tr class="row">
            <td class="text-left bg-grey-3 col-4">
              <q-field borderless dense>
                <template v-slot:control>
                  {{ selected_local.freeze_delivercost }}
                </template>
              </q-field>
            </td>
            <td class="text-right col-8 text-h4">
              <q-chip
                dense
                color="grey"
                icon="new_releases"
                :label="selected_local.freeze_delivercostnotice"
                text-color="white"
              />
              {{ freeze_shipment }} {{ selected_local.won }}
            </td>
          </tr>

          <tr class="row">
            <td class="text-left bg-grey-3 col-4">
              <q-field borderless dense>
                <template v-slot:control>
                  {{ selected_local.total }}
                </template>
              </q-field>
            </td>
            <td class="text-right col-8 text-h4">
              {{ total + shipment + freeze_shipment }}
              {{ selected_local.won }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-dialog v-model="coupon_list" class="q-pa-none q-ma-none">
      <CouponList class="bg-white" v-bind:food_price="total" />
    </q-dialog>
    <q-card>
      <div v-if="user_status">
        <!-- <div>배송 주소 이름: {{ this.address_selected.address_tag }}</div>
      <div>수령인: {{ this.address_selected.recipient }}</div>
      <div>전화: {{ this.address_selected.recipient_phone }}</div> -->
        <div v-if="!is_addr_added">
          <q-input
            color="white-1"
            standout
            readonly
            :label="selected_local.noselectaddrnotice"
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-input>
          <q-btn
            class="text-bold absolute-top-right q-ma-sm"
            color="negative"
            outline
            :label="selected_local.addrresister"
            @click="register_popup = true"
          ></q-btn>
        </div>
        <div v-else-if="no_selected_addr">
          <q-input
            color="white-1"
            standout
            readonly
            :label="selected_local.noselectaddrnotice"
          >
            <template v-slot:prepend>
              <q-icon name="place" />
            </template>
          </q-input>
          <q-btn
            class="text-bold absolute-top-right q-ma-sm"
            color="positive"
            outline
            :label="selected_local.change"
            @click="address_popup = true"
          ></q-btn>
        </div>
        <div class="row" v-else>
          <q-input
            class="col-12"
            color="white-1"
            standout
            readonly
            :label="selected_local.recipient"
            :model-value="this.address_selected.recipient"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-btn
            class="text-bold absolute-top-right q-ma-sm"
            color="positive"
            outline
            :label="selected_local.change"
            @click="address_popup = true"
          ></q-btn>
          <q-input
            color="white-1"
            class="col-6"
            standout
            readonly
            :label="selected_local.tel"
            :model-value="this.address_selected.recipient_phone"
          >
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
          <q-input
            color="white-1"
            class="col-6"
            standout
            readonly
            :label="selected_local.gate_password"
            :model-value="
              this.address_selected.outdoorpassword == ''
                ? selected_local.gate_free
                : this.address_selected.outdoorpassword
            "
          >
            <template v-slot:prepend>
              <q-icon name="apartment" />
            </template>
          </q-input>
          <q-input
            color="white-1"
            class="col-12"
            standout
            readonly
            autogrow
            :label="selected_local.receiveaddr"
            :model-value="
              '(' +
              this.address_selected.address_tag +
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
      </div>
      <div v-else>
        <q-input
          v-model="selected_local.nologinwarning"
          readonly
          standout
          color="red-10"
        ></q-input>
        <q-btn
          class="text-bold absolute-top-right q-ma-sm"
          color="negative"
          outline
          :label="selected_local.gotologinvue"
          tag="a"
          to="/UserInfo"
        ></q-btn>
      </div>
    </q-card>
    <div class="text-h6 text-bold">支付方式-1：银行转账</div>
    <div>
      <div>우리은행 (이호권)</div>
      <text-subtitle2>계좌번호: 1002-557-640050</text-subtitle2>
      <q-btn
        @click="copyToClipboard(copyBankAccount)"
        class="text-bold q-ma-sm"
        color="positive"
        outline
        >复制</q-btn
      >
      <div>支付完之后，请将以下信息发送给我的微信号或者手机号。</div>
      <div>1. 包含购物车物品和商品价格的画面</div>
      <div>2. 收件人的地址</div>
      <div>3. 收件人的电话号码</div>
      <div>
        <text-subtitle2>微信ID:l175969775</text-subtitle2>
        <q-btn
          @click="copyToClipboard(copyWechatAccount)"
          class="text-bold q-ma-sm"
          color="positive"
          outline
          >复制</q-btn
        >
      </div>
      <div>
        <text-subtitle2>手机号:010-8492-0526</text-subtitle2>
        <q-btn
          @click="copyToClipboard(copyPhoneAccount)"
          class="text-bold q-ma-sm"
          color="positive"
          outline
          >复制</q-btn
        >
      </div>
    </div>
    <q-separator />

    <div class="text-h6 text-bold">支付方式-2：微信转账</div>
    <div>
      <text-subtitle2>微信ID:l175969775</text-subtitle2>
      <q-btn
        @click="copyToClipboard(copyWechatAccount)"
        class="text-bold q-ma-sm"
        color="positive"
        outline
        >复制</q-btn
      >
    </div>
    <div>支付完之后，请将以下信息发送给我的微信号或者手机号。</div>
    <div>1. 包含购物车物品和商品价格的画面</div>
    <div>2. 收件人的地址</div>
    <div>3. 收件人的电话号码</div>
    <div>
      <text-subtitle2>手机号:010-8492-0526</text-subtitle2>
      <q-btn
        @click="copyToClipboard(copyPhoneAccount)"
        class="text-bold q-ma-sm"
        color="positive"
        outline
        >复制</q-btn
      >
    </div>
    <q-separator />

    <div class="text-h6 text-bold">支付方式-3：便捷支付</div>
    <div>*支付之前需要注册ID并登录收件人地址等信息。</div>
    <div class="row justify-end">
      <div class="text-red text-bold q-pa-sm">
        <div v-if="no_selected_addr">{{ selected_local.needselectedaddr }}</div>
        <div v-if="no_login">{{ selected_local.needloginfirst }}</div>
      </div>
      <q-btn
        color="positive"
        outline
        size="22px"
        class="text-bold q-py-none q-px-xl q-ma-sm"
        :disabled="!cartList.length || no_selected_addr || no_login"
        :label="selected_local.checkout"
        @click="selectPaymentmethod(total, shipment, freeze_shipment, coupon)"
      >
      </q-btn>
      <text-body1 class="q-pa-lg">{{ selected_local.payment_info }}</text-body1>
    </div>
    <div id="payment-method" class="q-py-none"></div>

    <br />
    <!-- <text-body1 class="q-pa-lg">{{ selected_local.payment_event }}</text-body1
    ><br /> -->
    <div id="agreement" class="q-py-none"></div>
    <q-dialog v-model="finalCheck" persistent>
      <q-card>
        <q-card-section class="row items-center q-pa-none">
          <div class="text-h6 text-bold">
            {{ selected_local.final_pay_confirm }}
          </div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <div class="text-body1 text-bold">
            {{ selected_local.final_recipent_confirm }}
          </div>
          <div class="row">
            <q-input
              class="col-6"
              color="white-1"
              standout
              readonly
              :label="selected_local.recipient"
              :model-value="this.address_selected.recipient"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              color="white-1"
              standout
              readonly
              :label="selected_local.tel"
              :model-value="this.address_selected.recipient_phone"
            >
              <template v-slot:prepend>
                <q-icon name="phone" />
              </template>
            </q-input>
            <q-input
              class="col-12"
              color="white-1"
              standout
              readonly
              autogrow
              :label="selected_local.receiveaddr"
              :model-value="
                '(' +
                this.address_selected.address_tag +
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
        </q-card-section>
        <!-- <q-card-section>
          <div class="text-body1 text-bold">
            {{ selected_local.final_coupon_confirm }}
          </div>
          <div class="row">
            <q-radio
              color="positive"
              class="col-12"
              v-model="coupon"
              val=""
              :label="selected_local.donot_use"
            />
            <q-radio
              color="positive"
              v-model="coupon"
              v-for="c in couponList.filter(c => c.available == 1)"
              :Key="c.coupon_id"
              :bind="c"
              :val="c"
              :label="
                c.coupon_name +
                ': ' +
                c.coupon_price +
                selected_local.won +
                selected_local.coupon_use_info_1 +
                `${c.use_condition == null ? 0 : c.use_condition}` +
                selected_local.won +
                selected_local.coupon_use_info_2
              "
              :disable="c.use_condition > total ? true : false"
            />
          </div>
        </q-card-section> -->
        <q-card-section>
          <div class="text-body1 text-bold">
            {{ selected_local.final_payamount_confirm }}
          </div>
          {{ total + shipment + freeze_shipment }}
          <!-- - `${coupon == '' ? 0 : coupon.coupon_price}` -->
          {{ selected_local.won }}
        </q-card-section>
        <div class="row justify-center">
          <q-btn
            color="positive"
            outline
            size="22px"
            class="text-bold q-py-none q-px-xl q-ma-sm"
            :label="selected_local.checkout"
            @click="
              selectPaymentmethod(total, shipment, freeze_shipment, coupon)
            "
          >
          </q-btn>
        </div>
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
  import {mapGetters, mapState} from 'vuex';
  import OrderItemInfo from 'components/OrderItemInfo.vue';
  import CouponList from 'components/CouponList.vue';
  import LoginPage from 'components/LoginPage.vue';
  import {defineComponent, ref} from 'vue';
  import validation from 'src/util/data/validation';
  import AddressList from './AddressList.vue';
  import AddressRegister from './AddressRegister.vue';
  import {date, Notify} from 'quasar';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import configs from 'src/configs/';
  import {loadPaymentWidget, ANONYMOUS} from '@tosspayments/payment-widget-sdk';

  let paymentWidget = {};
  let paymentMethod = {};
  let agreementWidget = {};

  export default defineComponent({
    name: 'OrderList',
    components: {
      OrderItemInfo,
      LoginPage,
      AddressList,
      AddressRegister,
      CouponList,
    },

    data: function () {
      return {
        basic: ref(false),
        persistent: ref(false),
        address_selected: '',
        address_popup: ref(false),
        register_popup: ref(false),
        coupon_list: ref(false),
        selected_coupon_id: ref(null),
        finalCheck: ref(false),
        coupon: ref(''),
        copyBankAccount: ref('1002557640050'),
        copyWechatAccount: ref('l175969775'),
        copyPhoneAccount: ref('01084920526'),
      };
    },
    watch: {
      default_addr: function (new_default) {
        // console.log('기본 배송지 변경: ' + new_default.address2);
        this.address_selected = new_default[0];
      },
    },
    computed: {
      ...mapState({
        checkoutStatus: state => state.cart.checkoutStatus,
        cartList: state => state.cart.items,
        addressList: state => state.address.items,
        user: state => state.user.USER,
        order: state => state.order.items,
        user_status: state => state.user.status,
        selected_local: state => state.ui_local.status,
        couponList: state => state.coupon.items,
        coupon_status: state => state.coupon.status,
      }),
      ...mapGetters('cart', {
        cartProducts: 'cartProducts',
        total: 'cartTotalPrice',
        shipment: 'shipmentPrice',
        freeze_shipment: 'freeze_shipmentPrice',
      }),
      ...mapGetters('address', {
        default_addr: 'getDefaultAddr',
      }),
      no_selected_addr() {
        return validation.isNull(this.address_selected);
      },
      no_login() {
        return validation.isNull(this.user.USER_ID);
      },
      is_addr_added() {
        return this.addressList.length;
      },
    },
    methods: {
      copyToClipboard(copyText) {
        try {
          navigator.clipboard.writeText(copyText);
          Notify.create({
            position: 'top',
            message: '复制完成' + ':(' + copyText + ') ',
            color: 'green',
          });
          //alert('(' + name + ')' + amount + '개를 장바구니에 넣었습니다.');
          this.$emit('sendOrderItem');
        } catch (e) {
          console.log(e);
          throw e;
        }
      },
      buy_event_info() {
        alert.confirm(
          this.selected_local.event_5353_info,
          this.selected_local.event_5353_detail,
        );
      },
      selectPaymentmethod(total, shipment, freeze_shipmentPrice, coupon) {
        var discount;
        if (coupon == '') {
          discount = 0;
        } else {
          discount = coupon.coupon_price;
          this.reserve_use_coupon(coupon.coupon_id);
        }
        var amountOfPayment =
          total + shipment + freeze_shipmentPrice - discount;
        var random_id =
          this.user.USER_ID +
          '_orderid_' +
          Math.random().toString(16).substr(2, 12);
        // console.log('업데이트 하려는데: ' + Object.entries(paymentMethod));
        paymentMethod.updateAmount(amountOfPayment);

        if (agreementWidget.getAgreementStatus().agreedRequiredTerms) {
          if (paymentMethod.getSelectedPaymentMethod().method == '계좌이체') {
            paymentWidget.requestPayment({
              amount: amountOfPayment,
              orderId: random_id,
              orderName:
                this.cartList[0].product_id +
                this.cartList[0].product_name +
                this.cartList[0].quantity +
                '...',
              customerName: this.user.USER_NAME,
              appScheme: 'chinafoodonline://',
              successUrl: window.location.origin + '/Success',
              failUrl: window.location.origin + '/Fail',
            });
          } else {
            alert.confirm(
              this.selected_local.notice,
              this.selected_local.payment_policy,
            );
          }
        } else {
          alert.confirm(
            this.selected_local.notice,
            this.selected_local.check_agreement,
          );
        }
      },
      before_pay_check() {
        this.coupon = '';
        this.couponList.forEach(c => {
          this.reserve_cancle_coupon(c.coupon_id);
        });
        if (agreementWidget.getAgreementStatus().agreedRequiredTerms) {
          if (paymentMethod.getSelectedPaymentMethod().method == '계좌이체') {
            this.finalCheck = true;
          } else {
            alert.confirm(
              this.selected_local.notice,
              this.selected_local.payment_policy,
            );
          }
        } else {
          alert.confirm(
            this.selected_local.notice,
            this.selected_local.check_agreement,
          );
        }
      },

      reserve_use_coupon(coupon_id) {
        this.$store.dispatch('coupon/reserveUseCouponAction', coupon_id);
      },
      reserve_cancle_coupon(coupon_id) {
        this.$store.dispatch('coupon/reserveCancleAction', coupon_id);
      },

      read_coupon() {
        if (this.coupon_status != null && this.no_login == false) {
          axios({
            url: `${configs.server}/mycoupon`,
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: this.user.USER_TOKEN,
            },
            data: {
              user_id: this.user.USER_ID,
              user_name: this.user.USER_NAME,
            },
          })
            .then(res => {
              if (res.status == 200) {
                this.$store.dispatch('coupon/emptyCouponAction');
                res.data.results.forEach(coupon => {
                  if (coupon.available === 1) {
                    this.$store.dispatch('coupon/addCouponAction', coupon);
                  }
                });
                this.$store.dispatch('coupon/setStatusAction', null);
              } else {
                alert.confirm(
                  this.selected_local.err,
                  this.selected_local.err + ': ' + res.data.content,
                );
              }
            })
            .catch(res => {
              console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
            });
        }
      },
    },

    async created() {
      // ------  결제위젯 초기화 ------
      // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
      paymentWidget = await loadPaymentWidget(
        `${configs.clientKey}`,
        ANONYMOUS,
      ); // 비회원 결제 , 퀵 계좌결제

      // ------  결제위젯 렌더링 ------
      // 결제수단 UI를 렌더링할 위치를 지정합니다. `#payment-method`와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
      // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
      paymentMethod = await paymentWidget.renderPaymentMethods(
        '#payment-method',
        {value: 15000},
        {variantKey: 'DEFAULT'}, // 렌더링하고 싶은 결제 UI의 variantKey
      );

      // ------  이용약관 렌더링 ------
      // 이용약관 UI를 렌더링할 위치를 지정합니다. `#agreement`와 같은 CSS 선택자를 추가하세요.
      // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
      agreementWidget = paymentWidget.renderAgreement('#agreement');

      this.read_coupon();
      this.address_selected = this.default_addr[0];
    },
  });
</script>
