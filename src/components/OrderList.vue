<template>
  <div>
    <q-dialog v-model="register_popup">
      <AddressRegister />
    </q-dialog>
    <!-- 주소가 등록되었는지 여부와 상관없이 배송지 변경할 버튼이 노출되어야 함 -->

    <q-dialog v-model="address_popup">
      <AddressList class="bg-teal-2" />
    </q-dialog>

    <div class="q-pa-md bg-teal">
      <q-chip outline color="grey-1" class="bg-teal text-body3 text-grey-1">{{
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
          class="col-xs-3 col-sm-3 col-md-2 q-pa-xs"
          v-for="product in cartList"
          :key="product.product_id"
          v-bind="product"
          @setquantity="product.quantity = $event"
        />
      </div>
    </div>

    <q-card class="q-py-sm bg-teal-2">
      <q-markup-table flat bordered class="q-ma-md justify-center">
        <tbody items-center>
          <tr class="row">
            <td class="text-left bg-teal col-4">
              <q-field borderless dense>
                <template v-slot:control>
                  {{ selected_local.foodprice }}
                </template>
                <template v-slot:append>
                  <q-icon
                    name="live_help"
                    class="text-white"
                    @click="buy_event_info()"
                  />
                </template>
              </q-field>
            </td>
            <td class="text-right col-8 text-h4">
              {{ total }} {{ selected_local.won }}
            </td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">
              <q-field borderless dense>
                <template v-slot:control>
                  {{ selected_local.delivercost }}
                </template>
              </q-field>
            </td>
            <td class="text-right col-8 text-h4">
              <q-chip
                dense
                color="teal"
                icon="new_releases"
                :label="selected_local.delivercostnotice"
                text-color="white"
              />
              {{ shipment }} {{ selected_local.won }}
            </td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">
              <q-field borderless dense>
                <template v-slot:control>
                  {{ selected_local.point }}
                </template>
                <template v-slot:append>
                  <q-icon
                    name="live_help"
                    class="text-white"
                    @click="coupon_list = true"
                  />
                </template>
              </q-field>
            </td>
            <td class="text-right col-8 text-h4">
              -
              {{
                reservedCoupon() != undefined
                  ? reservedCoupon().coupon_price
                  : 0
              }}
              P
            </td>
          </tr>
          <tr class="row">
            <td class="text-left bg-teal col-4">
              <q-field borderless dense>
                <template v-slot:control>
                  {{ selected_local.total }}
                </template>
              </q-field>
            </td>
            <td class="text-right col-8 text-h4">
              {{
                reservedCoupon() != undefined
                  ? total + shipment - reservedCoupon().coupon_price
                  : total + shipment - 0
              }}
              {{ selected_local.won }}
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card>

    <q-dialog v-model="coupon_list" class="q-pa-none q-ma-none">
      <CouponList class="bg-teal-2" v-bind:food_price="total" />
    </q-dialog>
    <q-card class="bg-teal-2">
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
            color="primary"
            :label="selected_local.change"
            @click="address_popup = true"
          ></q-btn>
        </div>
        <div v-else>
          <q-input
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
            color="primary"
            :label="selected_local.change"
            @click="address_popup = true"
          ></q-btn>
          <q-input
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
          :label="selected_local.gotologinvue"
          tag="a"
          to="/UserInfo"
        ></q-btn>
      </div>
    </q-card>
    <div id="payment-method" class="q-py-none"></div>
    <div id="agreement" class="q-py-none"></div>
    <div class="row justify-end">
      <div class="text-red text-bold q-pa-sm">
        <div v-if="no_selected_addr">{{ selected_local.needselectedaddr }}</div>
        <div v-if="no_login">{{ selected_local.needloginfirst }}</div>
      </div>
      <q-btn
        color="primary"
        size="22px"
        class="text-bold q-py-none q-px-xl q-ma-sm"
        :disabled="!cartList.length || no_selected_addr || no_login"
        :label="selected_local.checkout"
        @click="selectPaymentmethod(total, shipment, reservedCoupon())"
      >
      </q-btn>
    </div>

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
  import {date} from 'quasar';
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
      };
    },
    watch: {
      total: function (val, old) {
        // 주문 페이지에서 주문을 변경 시, 금액 변화에 따라 쿠폰 자동 사용이 변경됨.
        if (old < 50000 && val >= 50000) {
          // 사용 조건이 오만원이상인 쿠폰 찾아서 적용
          console.log('50000 구매 쿠폰 적용');
          if (this.couponList.length > 0) {
            var coupon_id = this.find_coupon(50000);
            if (coupon_id == null) {
              console.log(
                'no 50000 condition coupon, then 30000 구매 쿠폰 적용',
              );
              coupon_id = this.find_coupon(30000);
              if (coupon_id != null) {
                if (this.reservedCoupon() != undefined) {
                  if (this.reservedCoupon().coupon_id != coupon_id) {
                    this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
                    this.reserve_use_coupon(coupon_id);
                  }
                } else {
                  this.reserve_use_coupon(coupon_id);
                }
              } else {
                if (this.reservedCoupon() != undefined) {
                  this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
                }
              }
            } else {
              if (this.reservedCoupon() != undefined) {
                if (this.reservedCoupon().coupon_id != coupon_id) {
                  this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
                  this.reserve_use_coupon(coupon_id);
                }
              } else {
                this.reserve_use_coupon(coupon_id);
              }
            }
          }
        } else if (
          (old < 30000 && val >= 30000 && val < 50000) ||
          (old >= 50000 && val >= 30000 && val < 50000)
        ) {
          console.log('30000 구매 쿠폰 적용');
          // 사용 조건이 삼만원이상인 쿠폰 찾아서 적용
          if (this.couponList.length > 0) {
            var coupon_id = this.find_coupon(30000);

            if (coupon_id == null) {
              if (this.reservedCoupon() != undefined) {
                this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
              }
            } else {
              if (this.reservedCoupon() != undefined) {
                if (this.reservedCoupon().coupon_id != coupon_id) {
                  this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
                  this.reserve_use_coupon(coupon_id);
                }
              } else {
                this.reserve_use_coupon(coupon_id);
              }
            }
          }
        } else if (old >= 30000 && val < 30000) {
          //기존에 예약한 쿠폰 모두 취소.
          if (this.reservedCoupon() != undefined) {
            this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
          }
        }
      },
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
      buy_event_info() {
        alert.confirm(
          this.selected_local.event_5353_info,
          this.selected_local.event_5353_detail,
        );
      },
      selectPaymentmethod(total, shipment, coupon) {
        var discount;
        if (coupon != undefined) {
          discount = coupon.coupon_price;
        } else {
          discount = 0;
        }
        var amountOfPayment = total + shipment - discount;
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
      find_coupon(val) {
        var coupon = this.couponList.find(
          item => (item.use_condition === val) & (item.available == 1),
        );
        if (coupon == undefined) {
          return null;
        } else {
          console.log('쿠폰 사용가능여부 확인: ' + coupon.available);
          return coupon.coupon_id;
        }
      },
      reserve_use_coupon(coupon_id) {
        this.$store.dispatch('coupon/reserveUseCouponAction', coupon_id);
      },
      reserve_cancle_coupon(coupon_id) {
        this.$store.dispatch('coupon/reserveCancleAction', coupon_id);
      },
      reservedCoupon() {
        return this.couponList.find(
          element => element.coupon_use_reserve === 1,
        );
      },
      read_coupon() {
        if (this.no_login == false) {
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
    },
    mounted() {
      this.read_coupon();
      this.address_selected = this.default_addr[0];
      if (this.total >= 50000) {
        // 사용 조건이 오만원이상인 쿠폰 찾아서 적용
        console.log('50000 구매 쿠폰 적용');
        if (this.couponList.length > 0) {
          var coupon_id = this.find_coupon(50000);
          if (coupon_id == null) {
            console.log('no 50000 condition coupon, then 30000 구매 쿠폰 적용');
            coupon_id = this.find_coupon(30000);
            if (coupon_id != null) {
              if (this.reservedCoupon() != undefined) {
                if (this.reservedCoupon().coupon_id != coupon_id) {
                  this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
                  this.reserve_use_coupon(coupon_id);
                }
              } else {
                this.reserve_use_coupon(coupon_id);
              }
            } else {
              if (this.reservedCoupon() != undefined) {
                this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
              }
            }
          } else {
            if (this.reservedCoupon() != undefined) {
              if (this.reservedCoupon().coupon_id != coupon_id) {
                this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
                this.reserve_use_coupon(coupon_id);
              }
            } else {
              this.reserve_use_coupon(coupon_id);
            }
          }
        }
      } else if (this.total >= 30000) {
        console.log('30000 구매 쿠폰 적용');
        // 사용 조건이 삼만원이상인 쿠폰 찾아서 적용
        if (this.couponList.length > 0) {
          var coupon_id = this.find_coupon(30000);

          if (coupon_id == null) {
            if (this.reservedCoupon() != undefined) {
              this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
            }
          } else {
            if (this.reservedCoupon() != undefined) {
              if (this.reservedCoupon().coupon_id != coupon_id) {
                this.reserve_cancle_coupon(this.reservedCoupon().coupon_id);
                this.reserve_use_coupon(coupon_id);
              }
            } else {
              this.reserve_use_coupon(coupon_id);
            }
          }
        }
      }
    },
  });
</script>
