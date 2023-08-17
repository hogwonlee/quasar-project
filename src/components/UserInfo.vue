<template>
  <q-page class="q-pa-md bg-teal-2">
    <section v-if="user_status">
      <!-- <div class="text-h3">내 정보</div> -->
      <q-card class="row bg-teal-2" flat>
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
            text-color="primary"
            color="white"
            padding="sm"
            direction="left"
            class="absolute-top-right"
          >
            <q-fab-action
              color="white"
              text-color="primary"
              padding="none"
              :label="selected_local.changemyinfo"
              @click="this.checkPasswordDialog = true"
            />
            <q-fab-action
              color="white"
              text-color="primary"
              padding="none"
              :label="selected_local.changepassword"
              @click="this.changePasswordDialog = true"
            />
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
              text-color="primary"
              color="white"
              padding="sm"
              direction="left"
              class="absolute-top-right"
            >
              <q-fab-action
                color="white"
                text-color="primary"
                padding="none"
                :label="selected_local.registernewaddr"
                @click="this.register = true"
              />
              <q-fab-action
                color="white"
                text-color="primary"
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
          class="row items-center q-ma-none q-pa-none bg-white"
          style="width: 100%"
          v-for="addr in addressList"
          :key="addr.address_id"
          v-bind="addr"
        >
          <q-card-section v-if="addr.is_default == 1">
            <div class="text-h6 text-bold q-mx-sm q-pa-none q-my-none">
              {{ '(' + addr.address_tag + ') ' + addr.recipient }}
              <q-chip
                class="q-py-none q-my-none"
                v-if="addr.is_default"
                dense
                text-color="primary"
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
            text-color="primary"
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
              <div class="text-subtitle2 text-bold text-deep-purple q-ml-md">
                {{ coupon.coupon_name }}
                <q-chip
                  v-if="coupon.coupon_use_reserve == 1"
                  color="primary"
                  :label="selected_local.use_reserve"
                  icon="star"
                ></q-chip>
              </div>
            </q-card-section>
            <q-card-section class="bg-primary q-px-none q-pt-xs q-pb-none">
              <div class="text-h3 text-bold text-white q-mx-sm">
                <q-icon name="img:icons\kr_won.png" />
                {{ coupon.coupon_price / 1000 }} {{ selected_local.won000 }}
              </div>
              <q-separator class="q-my-sm" />
              <div class="text-caption text-grey-3 q-ml-md">
                {{ selected_local.use_condition }} {{ coupon.use_condition }}
                {{ selected_local.more }}
              </div>
              <div class="text-caption text-grey-3 q-ml-md">
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
              <div class="text-subtitle2 text-bold text-deep-purple q-ml-md">
                {{ selected_local.coupon_name_none }}
              </div>
            </q-card-section>
            <q-card-section class="bg-primary q-px-none q-pt-xs q-pb-none">
              <div class="text-h3 text-bold text-white q-mx-sm">
                <q-icon name="img:icons\kr_won.png" />
                {{ selected_local.coupon_value_none }}
              </div>
              <q-separator class="q-my-sm" />
              <div class="text-caption text-grey-3 q-ml-md">사용조건:</div>
              <div class="text-caption text-grey-3 q-ml-md">사용기한:</div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
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
        text-color="teal"
        @click="service_policy_vue = true"
      />
      <!-- <q-btn
    class="col-6"
    outline
    :label="selected_local.use_policy + '(中文)'"
    color="white"
    text-color="teal"
    @click="service_policy_cn_vue = true"
  /> -->
      <q-btn
        class="col-xl-3 col-lg-3 col-md-6 col-sm-3 col-xs-6"
        outline
        :label="selected_local.privacy_policy"
        color="white"
        text-color="teal"
        @click="privacy_policy_vue = true"
      />
      <!-- <q-btn
    class="col-6"
    outline
    :label="selected_local.privacy_policy + '(中文)'"
    color="white"
    text-color="teal"
    @click="privacy_policy_cn_vue = true"
  /> -->
      <!-- <div class="row q-mt-sm"> -->
      <q-btn
        class="col-xl-3 col-lg-3 col-md-6 col-sm-3 col-xs-6"
        outline
        :label="selected_local.deliver_info_title"
        color="white"
        text-color="teal"
        @click="delivery_policy_vue = true"
      />
      <!-- <q-btn
  class="col-6"
  outline
  :label="selected_local.deliver_info_title + '(中文)'"
  color="white"
  text-color="teal"
  @click="delivery_policy_cn_vue = true"
/> -->
      <q-btn
        class="col-xl-3 col-lg-3 col-md-6 col-sm-3 col-xs-6"
        outline
        :label="selected_local.claim_info"
        color="white"
        text-color="teal"
        @click="exchange_policy_vue = true"
      />
      <!-- <q-btn
  class="col-6"
  outline
  :label="selected_local.claim_info + '(中文)'"
  color="white"
  text-color="teal"
  @click="exchange_policy_cn_vue = true"
/> -->
      <!-- </div> -->
    </div>
    <q-dialog v-model="register">
      <AddressRegister />
    </q-dialog>
    <q-dialog v-model="coupon_vue">
      <CouponList
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <q-dialog v-model="address_vue">
      <AddressList
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <q-dialog v-model="privacy_policy_vue">
      <PrivacyPolicy
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <!-- <q-dialog v-model="privacy_policy_cn_vue">
  <PrivacyPolicy_cn
    class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
    style="margin-top: 28%; max-height: 500px"
  />
</q-dialog> -->
    <q-dialog v-model="service_policy_vue">
      <ServicePolicy
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <!-- <q-dialog v-model="service_policy_cn_vue">
  <ServicePolicy_cn
    class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
  />
</q-dialog> -->
    <q-dialog v-model="delivery_policy_vue">
      <DeliveryPolicy
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <!-- <q-dialog v-model="delivery_policy_cn_vue">
<DeliveryPolicy_cn
  class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
  style="margin-top: 28%; max-height: 500px"
/>
/>
</q-dialog> -->
    <q-dialog v-model="exchange_policy_vue">
      <ExchangePolicy
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <!-- style="margin-top: 28%; max-height: 500px" -->
    <!-- <q-dialog v-model="exchange_policy_cn_vue">
<ExchangePolicy_cn
  class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
  style="margin-top: 28%; max-height: 500px"
/>
</q-dialog> -->
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
              color="primary"
              v-close-popup
            />
            <q-btn
              :label="selected_local.cancel"
              color="primary"
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
  const {addToDate} = date;
  import security from 'src/util/modules/security';

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
      };
    },
    computed: {
      ...mapState({
        user_status: state => state.user.status,
        user: state => state.user.USER,
        addressList: state => state.address.items,
        couponList: state => state.coupon.items,
        selected_local: state => state.ui_local.status,
      }),
    },
    mounted() {
      this.read_coupon();
    },
    watch: {},

    methods: {
      checkpw() {
        const userData = {
          user_id: this.user.USER_ID,
          user_pw: security.encryptRsaContent(this.userPw),
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
        if (this.coupon_status === '' && this.user.USER_ID != '') {
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
    },
  });
</script>
