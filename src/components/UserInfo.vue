<template>
  <q-page class="q-pa-md">
    <section v-if="user_status">
      <!-- <div class="text-h3">내 정보</div> -->
      <q-card class="row" flat>
        <div class="col-12 text-h6 text-bold">{{ selected_local.myinfo }}</div>
        <q-input
          :model-value="user.USER_NAME"
          :label="selected_local.name"
          readonly
          borderless
          class="q-pl-lg col-6"
        ></q-input>
        <q-input
          :model-value="user.USER_PHONE"
          :label="selected_local.tel"
          readonly
          borderless
          class="col-6"
        ></q-input>

        <div class="absolute-top-right q-gutter-sm q-pt-sm q-pr-sm">
          <q-fab
            v-model="user_option"
            icon="settings"
            text-color="positive"
            color="white"
            padding="sm"
            direction="left"
            class="absolute-top-right"
          >
            <q-fab-action
              color="white"
              text-color="positive"
              padding="none"
              :label="selected_local.changemyinfo"
              @click="this.checkPasswordDialog = true"
            />
            <q-fab-action
              color="white"
              text-color="positive"
              padding="none"
              :label="selected_local.changepassword"
              @click="this.changePasswordDialog = true"
            />
            <q-fab-action
              color="white"
              text-color="negative"
              padding="none"
              :label="selected_local.logout"
              @click="confirm_logout()"
            />
            <!-- :label="selected_local.changepassword" -->
          </q-fab>
        </div>
      </q-card>
      <!-- <div class="text-h6">이름: {{ user_name_get }}</div>
        <div class="text-h6">전화번호: {{ user_phone_get }}</div> -->
      <q-separator class="q-my-sm" />
      <q-card
        class="transparent my-card q-gutter-xs q-pa-none q-ma-none"
        flat
        square
        outlined
      >
        <div class="text-h6 text-bold q-py-sm">
          {{ selected_local.defaultaddr }}
          <div class="absolute-top-right q-gutter-sm q-pt-sm q-pr-sm">
            <q-fab
              v-model="addr_option"
              icon="settings"
              text-color="positive"
              color="white"
              padding="sm"
              direction="left"
              class="absolute-top-right"
            >
              <q-fab-action
                color="white"
                text-color="positive"
                padding="none"
                :label="selected_local.registernewaddr"
                @click="this.register = true"
              />
              <q-fab-action
                color="white"
                text-color="positive"
                padding="none"
                :label="selected_local.addr"
                @click="this.address_vue = true"
              />
            </q-fab>
          </div>
        </div>
        <q-card-section v-if="addressList.length <= 0">
          现在并没有默认地址，请添加一个！
        </q-card-section>
        <q-card-section
          v-else
          class="row items-center q-ma-none q-pa-none"
          style="width: 100%"
          v-for="addr in addressList"
          :key="addr.address_id"
          v-bind="addr"
        >
          <q-card-section v-if="addr.is_default == 1">
            <div
              class="text-h6 text-bold q-mx-sm q-pa-none q-my-none"
              style="border-radius: 1px; border: 1px"
            >
              {{ '(' + addr.address_tag + ') ' + addr.recipient }}
              <q-chip
                class="q-py-none q-my-none"
                v-if="addr.is_default"
                dense
                text-color="dark"
              >
                {{ selected_local.defaultaddr }}
              </q-chip>
            </div>
            <q-input
              class="col-md-3 col-sm-6 col-xs-6 q-ma-none q-pa-none q-mx-sm"
              borderless
              readonly
              :model-value="addr.recipient_phone"
              mask="(###)####-####"
              style="height: 30px"
            >
            </q-input>
            <div class="q-ma-sm">
              {{ addr.address1 + ' ' + addr.address2 + ' ' + addr.address3 }}
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

      <q-separator class="q-my-sm" />
      <q-card-section class="row items-center q-px-none q-py-sm">
        <div class="text-h6 text-bold">
          {{ selected_local.buy_history }}
        </div>

        <q-btn
          :label="selected_local.buy_history"
          @click="readOrderHistory()"
          color="positive"
          outline
          class="absolute-right"
        ></q-btn>
      </q-card-section>
      <q-separator class="q-my-sm" />

      <q-card class="transparent" flat>
        <q-card-section class="row items-center q-px-none q-py-sm">
          <div class="text-h6 text-bold">
            {{ selected_local.coupon_info }}
          </div>
          <q-btn
            class="absolute-top-right text-bold q-pa-none"
            size="md"
            label="?"
            round
            color="white"
            text-color="positive"
            @click="coupon_info_dialog()"
          />
        </q-card-section>
        <q-card-section
          v-if="couponList.length > 0"
          class="q-gutter-xs q-pa-none q-ma-xs"
        >
          <q-card
            class="my-card"
            v-for="coupon in couponList"
            :key="coupon.coupon_id"
            v-bind="coupon"
          >
            <q-card-section class="bg-grey-3 q-pa-none">
              <div class="text-subtitle2 text-bold text-dark q-ml-md">
                {{ coupon.coupon_name }}
              </div>
              <q-space />
              <q-chip
                v-if="coupon.coupon_use_reserve == 1"
                :label="selected_local.use_reserve"
                icon="task_alt"
                dense
                text-color="positive"
                class="q-mr-sm"
              ></q-chip>
            </q-card-section>
            <q-card-section class="bg-red-13 q-px-none q-pt-xs q-pb-none">
              <div class="text-h3 text-bold text-white q-mx-sm">
                <q-icon name="img:icons\kr_won.png" />
                {{ coupon.coupon_price / 1000 }} {{ selected_local.won000 }}
              </div>
              <q-separator class="q-my-sm" />
              <div class="text-caption text-white q-ml-md">
                {{ selected_local.use_condition }} {{ coupon.use_condition }}
                {{ selected_local.more }}
              </div>
              <div class="text-caption text-white q-ml-md">
                {{ selected_local.use_limit }}
                {{ limit_date(coupon.gift_day, 90) }}
                {{ selected_local.up_to }}
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section v-else>
          <q-card class="my-card q-pa-none q-ma-xs">
            <q-card-section class="bg-grey-3 q-pa-none">
              <div class="text-subtitle2 text-bold text-dark q-ml-md">
                {{ selected_local.coupon_name_none }}
              </div>
            </q-card-section>
            <q-card-section class="bg-grey-4 q-px-none q-pt-xs q-pb-none">
              <div class="text-h3 text-bold text-white q-mx-sm">
                <q-icon name="img:icons\kr_won.png" />
                {{ selected_local.coupon_value_none }}
              </div>
              <q-separator class="q-my-sm" />
              <div class="text-caption text-grey-3 q-ml-md">
                {{ selected_local.use_condition }} :
              </div>
              <div class="text-caption text-grey-3 q-ml-md">
                {{ selected_local.use_limit }} :
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
      <!-- <q-separator class="q-my-sm" />
      <q-card class="transparent" flat>
        <q-card-section class="row items-center q-px-none q-py-sm">
          <div class="text-h6 text-bold">
            历史购买
          </div>
        </q-card-section>
      </q-card> -->
    </section>
    <section v-else class="row justify-center vertical-center">
      <LoginPage />
    </section>
    <q-separator class="q-my-sm" />

    <div class="row justify-center">
      <q-btn
        class="col-xl-3 col-lg-3 col-md-6 col-sm-3 col-xs-6"
        outline
        :label="selected_local.use_policy"
        color="white"
        text-color="dark"
        @click="service_policy_vue = true"
      />

      <q-btn
        class="col-xl-3 col-lg-3 col-md-6 col-sm-3 col-xs-6"
        outline
        :label="selected_local.privacy_policy"
        color="white"
        text-color="dark"
        @click="privacy_policy_vue = true"
      />

      <q-btn
        class="col-xl-3 col-lg-3 col-md-6 col-sm-3 col-xs-6"
        outline
        :label="selected_local.deliver_info_title"
        color="white"
        text-color="dark"
        @click="delivery_policy_vue = true"
      />

      <q-btn
        class="col-xl-3 col-lg-3 col-md-6 col-sm-3 col-xs-6"
        outline
        :label="selected_local.claim_info"
        color="white"
        text-color="dark"
        @click="exchange_policy_vue = true"
      />
    </div>
    <q-dialog v-model="register">
      <AddressRegister />
    </q-dialog>
    <q-dialog v-model="coupon_vue">
      <CouponList
        class="bg-dark absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <q-dialog v-model="address_vue">
      <AddressList
        class="absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <q-dialog v-model="privacy_policy_vue">
      <PrivacyPolicy
        class="bg-dark absolute-top q-mx-lg q-pa-sm q-mt-xl"
        style="max-height: 500px"
      />
    </q-dialog>

    <q-dialog v-model="service_policy_vue">
      <ServicePolicy
        class="bg-dark absolute-top q-mx-lg q-pa-sm q-mt-xl"
        style="max-height: 500px"
      />
    </q-dialog>

    <q-dialog v-model="delivery_policy_vue">
      <DeliveryPolicy
        class="bg-dark absolute-top q-mx-lg q-pa-sm q-mt-xl"
        style="max-height: 500px"
      />
    </q-dialog>

    <q-dialog v-model="exchange_policy_vue">
      <ExchangePolicy
        class="bg-dark absolute-top q-mx-lg q-pa-sm q-mt-xl"
        style="max-height: 500px"
      />
    </q-dialog>
    <q-dialog
      v-model="checkPasswordDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-white text-black" style="width: 300px">
        <q-card-section>
          <div class="text-h6">
            {{ selected_local.confirmpassword }}
          </div>
        </q-card-section>

        <q-form @submit="checkpw" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            readonly
            disable
            v-model="user.USER_ID"
            :label="selected_local.identity"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || selected_local.essential,
            ]"
          />

          <q-input
            filled
            v-model="userPw"
            :type="isPwd ? 'password' : 'text'"
            :label="selected_local.password"
            label-color="black"
            lazy-rules
            :rules="[
              val => (val && val.length > 0) || selected_local.essential,
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="q-gutter-sm q-py-sm">
            <q-btn
              :label="selected_local.confirm"
              type="submit"
              color="positive"
              outline
              v-close-popup
            />
            <q-btn
              :label="selected_local.cancel"
              color="negative"
              outline
              v-close-popup
            />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="changeInfoDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><ChangeInfo
    /></q-dialog>
    <q-dialog
      v-model="changePasswordDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
      ><ChangePassword
    /></q-dialog>
    <q-dialog
      v-model="orderHistoryDialog"
      style="width: 70%; height: fit-content"
    >
      <q-card
        class="my-card"
        v-for="order in orderHistory"
        :key="order.product_id"
        v-bind="order"
      >
        <ProductInfo
          class="col-xs-4 col-sm-3 col-md-1 q-pa-xs"
          v-for="product in product_all.filter(
            p => p.product_id == order.product_id,
          )"
          :key="product.product_id"
          v-bind="product"
          @setbuyoption="product.buyoption = $event"
          @setquantity="product.quantity = $event"
          @sendOrderItem="
            this.$store.dispatch('cart/addProductToCart', product)
          "
          @sendRemoveItem="
            this.$store.dispatch('cart/removeProductFromCart', product)
          "
        />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import {defineComponent, ref} from 'vue';
  import {mapGetters, mapState, mapActions} from 'vuex';
  import user from 'src/store/user/userInfo';
  import LoginPage from 'components/LoginPage.vue';
  import AddressRegister from './AddressRegister.vue';
  import AddressList from 'components/AddressList.vue';
  import ChangeInfo from 'components/ChangeInfo.vue';
  import ChangePassword from 'components/ChangePassword.vue';
  import axios from 'axios';
  import validation from 'src/util/data/validation';
  import alert from 'src/util/modules/alert';
  import CouponList from 'components/CouponList.vue';
  import PrivacyPolicy from './policy/PrivacyPolicy.vue';
  // import PrivacyPolicy_cn from './policy/PrivacyPolicy_cn.vue';
  import ServicePolicy from './policy/ServicePolicy.vue';
  // import ServicePolicy_cn from './policy/ServicePolicy_cn.vue';
  import DeliveryPolicy from './policy/DeliveryPolicy.vue';
  import ExchangePolicy from './policy/ExchangePolicy.vue';
  import configs from 'src/configs/';
  import {date} from 'quasar';
  import {Dialog} from 'quasar';
  const {addToDate} = date;
  // import security from 'src/util/modules/security';
  import ProductInfo from './ProductInfo.vue';

  export default defineComponent({
    name: 'UserInfo',
    components: {
      LoginPage,
      ChangeInfo,
      ChangePassword,
      CouponList,
      PrivacyPolicy,
      // PrivacyPolicy_cn,
      ServicePolicy,
      // ServicePolicy_cn,
      DeliveryPolicy,
      ExchangePolicy,
      AddressRegister,
      AddressList,
      ProductInfo,
    },
    data: function () {
      return {
        userPw: '',
        persistent: ref(false),
        checkPasswordDialog: ref(false),
        changeInfoDialog: ref(false),
        changePasswordDialog: ref(false),
        user_option: ref(false),
        addr_option: ref(false),
        register: ref(false),
        coupon_option: ref(false),
        coupon_vue: ref(false),
        address_vue: ref(false),
        service_policy_vue: ref(false),
        // service_policy_cn_vue: ref(false),
        privacy_policy_vue: ref(false),
        // privacy_policy_cn_vue: ref(false),
        delivery_policy_vue: ref(false),
        exchange_policy_vue: ref(false),
        isPwd: ref(true),
        orderHistory: [],
        orderHistoryDialog: ref(false),
      };
    },
    computed: {
      ...mapState({
        user_status: state => state.user.status,
        user: state => state.user.USER,
        address_status: state => state.address.status,
        addressList: state => state.address.items,
        couponList: state => state.coupon.items,
        coupon_status: state => state.coupon.status,
        selected_local: state => state.ui_local.status,
        product_all: state => state.products.all,
      }),
    },
    mounted() {
      this.read_coupon();
    },
    watch: {
      user_status: function (user_status_new) {
        if (user_status_new) {
          this.reload_addr_info();
          this.read_coupon();
        }
      },
      address_status: function (addr_status_new) {
        if (this.user_status) {
          console.log('주소 불러오기 로그 ' + addr_status_new);
          this.reload_addr_info();
        }
      },
    },

    methods: {
      checkpw() {
        const userData = {
          user_id: this.user.USER_ID,
          user_pw: this.userPw,
          // user_pw: security.encryptRsaContent(this.userPw),
        };

        axios({
          url: `${configs.server}/checkpw`,
          method: 'POST',
          data: userData,
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
        })
          .then(res => {
            // console.log(JSON.stringify(res.status));
            if (res.status == 200) {
              // 정보변경창(ChangeInfo.vue)을 열어줘야 함.
              this.changeInfoDialog = true;
            } else {
              alert.confirm(
                this.selected_local.notice,
                this.selected_local.wrongpw,
              );
            }
          })

          .catch(res => {
            alert.confirm(
              this.selected_local.err,
              this.selected_local.err + ': ' + this.selected_local.wrongpw,
            );
            console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
          });
      },
      coupon_info_dialog() {
        alert.confirm(
          this.selected_local.coupon_info + this.selected_local.notice,
          this.selected_local.coupon_use_info +
            '\n ' +
            this.selected_local.coupon_use_condition,
        );
      },

      read_coupon() {
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
              if (res.data.results.length > 0) {
                res.data.results.forEach(coupon => {
                  if (coupon.available === 1) {
                    this.$store.dispatch('coupon/addCouponAction', coupon);
                  }
                });
              }
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
      },
      limit_date(day, plus_day) {
        return addToDate(new Date(day), {day: plus_day}).toLocaleString(
          'ko-KR',
          {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          },
        );
      },
      confirm_logout() {
        Dialog.create({
          title: this.selected_local.notice,
          message: this.selected_local.confirm_logout,
          // cancel: true,
          persistent: false,
        })
          .onOk(data => {
            // console.log('>>>> OK, received', data)
            this.$store.dispatch('user/logoutAction');
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      },

      reload_addr_info() {
        if (!validation.isNull(this.address_status)) {
          axios({
            url: `${configs.server}/addressInfo`,
            method: 'POST',
            // httpsAgent: new https.Agent({
            //   rejectUnauthorized: false,
            // }),
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
                this.$store.dispatch('address/emptyAddressAction');
                res.data.results.forEach(addr => {
                  if (addr.address_active === 1) {
                    this.$store.dispatch('address/addAddressAction', addr);
                  }
                });
                this.is_addr_added = true;
                this.$store.dispatch('address/setStatusAction', null);
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
      readOrderHistory() {
        const userData = {
          user_id: this.user.USER_ID,
        };

        axios({
          url: `${configs.server}/orderHistory`,
          method: 'POST',
          data: userData,
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
        })
          .then(res => {
            // console.log(JSON.stringify(res.status));
            if (res.status == 200) {
              // res.data.results.forEach(product => {
              //   this.product_all.forEach(p => {
              //     if (p.product_id == product.product_id) {
              //       this.orderHistory.push(p);
              //     }
              //   });
              // });
              // console.log(JSON.stringify(this.orderHistory));
              this.orderHistory = res.data.results;
              this.orderHistoryDialog = true;
            } else {
              alert.confirm(this.selected_local.notice, '구매기록이 없습니다.');
            }
          })

          .catch(res => {
            alert.confirm(this.selected_local.notice, '구매기록이 없습니다.');
            console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
          });
      },
    },
  });
</script>
