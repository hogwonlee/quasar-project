<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">{{ selected_local.coupon_info }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
        <div class="text-body2 q-ml-md">
          {{ selected_local.coupon_use_info }}
        </div>
        <div class="text-body2 q-ml-md">
          {{ selected_local.coupon_use_condition }}
        </div>
      </q-card-section>
    </q-card>
    <!-- <div class="text-body2 q-pl-sm text-bold">안내:</div>
    <div class="text-body2 q-pl-sm">
      조건에 맞는 쿠폰은 자동으로 사용됩니다.
    </div> -->

    <div v-if="couponList.length > 0" class="q-gutter-xs q-pa-none q-ma-xs">
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
        <q-card-section class="bg-deep-purple q-px-none q-pt-xs q-pb-none">
          <div class="text-h3 text-bold text-white q-mx-sm">
            <q-icon name="img:src\assets\icons\currency-krw-white.png" />
            {{ coupon.coupon_price / 1000 }} {{ selected_local.won000 }}
          </div>
          <q-separator dark />
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
    </div>
    <div v-else>
      <q-card class="my-card q-pa-none q-ma-xs">
        <q-card-section class="bg-grey-3 q-pa-none">
          <div class="text-subtitle2 text-bold text-deep-purple q-ml-md">
            {{ selected_local.coupon_name_none }}
          </div>
        </q-card-section>
        <q-card-section class="bg-deep-purple q-px-none q-pt-xs q-pb-none">
          <div class="text-h3 text-bold text-white q-mx-sm">
            <q-icon name="img:src\assets\icons\currency-krw-white.png" />
            {{ selected_local.coupon_value_none }}
          </div>
          <q-separator dark />
          <div class="text-caption text-grey-3 q-ml-md">사용조건:</div>
          <div class="text-caption text-grey-3 q-ml-md">사용기한:</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapState} from 'vuex';
  import configs from '/src/configs';
  import {date} from 'quasar';

  const {addToDate} = date;

  export default defineComponent({
    name: 'CouponList',
    data: function () {
      return {};
    },
    computed: {
      ...mapState({
        user: state => state.user.USER,
        couponList: state => state.coupon.items,
        coupon_status: state => state.coupon.status,
        selected_local: state => state.ui_local.status,
      }),
    },
    props: {
      food_price: {
        type: Number,
        default: 0,
      },
    },
    watch: {},
    mounted() {
      this.read_coupon();
    },
    methods: {
      read_coupon() {
        if (this.coupon_status === '') {
          console.log('쿠폰데이터 불러오기');
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
      coupon_use_reserve(usecoupon) {
        this.$store.dispatch('coupon/reserveUseCouponAction', usecoupon);
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
    setup() {
      return {};
    },
  });
</script>
