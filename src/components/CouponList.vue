<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">내 쿠폰</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
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
        <!-- <q-icon
        name="arrow_forward_ios"
        color="teal-2"
        class="absolute-left q-mt-lg"
      />
      <q-icon
        name="arrow_forward_ios"
        color="teal-2"
        class="absolute-bottom-left q-mb-lg"
      />

      <q-icon
        name="arrow_back_ios"
        color="teal-2"
        class="absolute-right q-mt-lg"
      />
      <q-icon
        name="arrow_back_ios"
        color="teal-2"
        class="absolute-bottom-right q-mb-lg"
      /> -->

        <q-card-section class="bg-grey-3 q-pa-none">
          <div class="text-subtitle2 text-bold text-deep-purple q-ml-md">
            {{ coupon.coupon_name }}
            <q-chip
              v-if="coupon.coupon_use_reserve == 1"
              color="primary"
              label="사용예정"
              icon="star"
            ></q-chip>
          </div>
        </q-card-section>
        <q-card-section class="bg-deep-purple q-px-none q-pt-xs q-pb-none">
          <div class="text-h3 text-bold text-white q-mx-sm">
            <q-icon name="img:src\assets\icons\currency-krw-white.png" />
            {{ coupon.coupon_price }} 원
          </div>
          <q-separator dark />
          <div class="text-caption text-grey-3 q-ml-md">
            사용조건: {{ coupon.use_condition }}
          </div>
          <div class="text-caption text-grey-3 q-ml-md">
            사용기한: {{ coupon.limit_date }} from {{ coupon.gift_day }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <q-card class="my-card q-pa-none q-ma-xs">
        <q-card-section class="bg-grey-3 q-pa-none">
          <div class="text-subtitle2 text-bold text-deep-purple q-ml-md">
            쿠폰 이름 (현재 보유 중인 쿠폰이 없습니다.)
          </div>
        </q-card-section>
        <q-card-section class="bg-deep-purple q-px-none q-pt-xs q-pb-none">
          <div class="text-h3 text-bold text-white q-mx-sm">
            <q-icon name="img:src\assets\icons\currency-krw-white.png" />
            쿠폰 금액
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
    created() {
      // this.setcouponList();
    },
    mounted() {
      this.read_coupon();
    },
    methods: {
      read_coupon() {
        if (this.coupon_status === '') {
          console.log('쿠폰데이터 불러오기');
          axios({
            url: 'http://localhost:3001/mycoupon',
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
              this.$store.dispatch('coupon/emptyCouponAction');

              res.data.results.forEach(coupon => {
                if (coupon.available === 1) {
                  this.$store.dispatch('coupon/addCouponAction', coupon);
                }
              });
              // this.$store.dispatch('coupon/setStatusAction', null);
            })
            .catch(res => {
              console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
            });
        }
      },
      coupon_use_reserve(usecoupon) {
        this.$store.dispatch('coupon/reserveUseCouponAction', usecoupon);
      },
      setcouponList() {
        this.couponList = [
          {
            coupon_id: 1,
            coupon_name: '회원가입 이벤트 쿠폰',
            coupon_point: 3000,
            coupon_desc1: '30000만원 이상 구매시 사용 가능',
            coupon_desc2: '2023-5-1까지 회원가입 시 지급',
            coupon_endday: '2023-10-23까지 (수령 후 3개월 내)',
          },
          {
            coupon_id: 2,
            coupon_name: '5만원 구매 감사 쿠폰',
            coupon_point: 3000,
            coupon_desc1: '50000만원 이상 구매시 사용 가능',
            coupon_desc2: '50000만원 이상 구매시 해당 쿠폰이 지급',
            coupon_endday: '2023-10-23까지 (수령 후 3개월 내)',
          },
          {
            coupon_id: 3,
            coupon_name: '조건 없는 선물 쿠폰',
            coupon_point: 3000,
            coupon_desc1: '조건없이 사용 가능',
            coupon_desc2: '누군가의 선물',
            coupon_endday: '언제나 사용가능',
          },
        ];
      },
      resetcouponList() {
        this.couponList = [];
      },
    },
    setup() {
      return {};
    },
  });
</script>
