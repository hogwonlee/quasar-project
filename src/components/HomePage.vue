<template>
  <div>
    <q-carousel
      v-model="slide"
      vertical
      transition-prev="slide-down"
      transition-next="slide-up"
      swipeable
      animated
      control-color="white"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      arrows
      style="width: 100%; height: max-content"
      class="bg-teal-2 text-white shadow-1 rounded-borders"
    >
      <template v-slot:navigation-icon="{active, btnProps, onClick}">
        <q-btn
          v-if="active"
          size="lg"
          icon="home"
          color="primary"
          flat
          round
          dense
          @click="onClick"
        />
        <q-btn
          v-else
          size="sm"
          :icon="btnProps.icon"
          color="white"
          flat
          round
          dense
          @click="onClick"
        />
      </template>
      <q-carousel-slide name="style" class="row justify-center">
        <!-- 문제제기 -->
        <div class="col-lg-5 col-md-12 row column justify-center">
          <div class="text-h5 text-black text-bold">
            인천 거주 중국인이 중국 식료품을 사려면?
          </div>
          <div class="text-body1 text-black">
            1. 지하철을 타고 대림역으로 출발.
          </div>
          <div class="text-body1 text-black">
            2. 12번 출구에서 300M걸어 중국식품점에 도착.
          </div>
          <div class="text-body1 text-black">
            3. 간식거리를 골라 결제를 하려는데 현금 거절.
          </div>
          <div class="text-body1 text-black">
            4. 만원 미만이라 카드결제 불가…
          </div>
          <div class="text-body1 text-black">
            5. 몇개 더 골라 양손 가득… (집가기 힘들겠다.)
          </div>
          <div class="text-body1 text-black"></div>
          <div class="text-h5 text-black text-bold">
            이런 고생을 하는 이유는?
          </div>
          <div class="text-body1 text-black">
            1.중국인 밀집 지역에만 있는 중국식품점.
          </div>
          <div class="text-body1 text-black">
            2.중국어를 지원하는 중국식품 취급 앱이 없어서.
          </div>
        </div>

        <q-img class="col-lg-5 col-md-12" src="images\a_gotoderim.png"></q-img>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="row justify-center q-gutter-sm">
        <!-- 앱 특징 소개 -->
        <div class="col-lg-5 col-md-12 row column justify-center">
          <div class="text-h5 text-bold text-black">
            그래서 우리는 무엇을 하는 것인가?
          </div>

          <div class="text-body1 text-black">
            1. 어디서든 주문할 수 있도록 모바일 주문 서비스 제공
          </div>
          <div class="text-body1 text-black">
            2. 중국인들에게 친숙한 중국어 환경 제공
          </div>
          <div class="text-body1 text-black">
            3. 최대한 많은 종류의 중국식품을 입고
          </div>
        </div>

        <q-img
          class="col-lg-3 col-md-5"
          src="images\ui_checkout.png"
          fit="contain"
          style="max-height: 500px"
        ></q-img>
        <q-img
          class="col-lg-3 col-md-5"
          src="images\ui_productlist.png"
          fit="contain"
          style="max-height: 500px"
        ></q-img>
      </q-carousel-slide>
      <q-carousel-slide
        name="apk"
        style="height: 600px"
        class="row justify-center q-gutter-sm"
      >
        <!-- 앱 다운로드 링크 -->
        <div class="col-12 text-h5 text-bold text-black row justify-center">
          어서 다운로드 해주세요!
        </div>
        <div class="col-12 row justify-center">
          <q-icon name="download"></q-icon>
          <a
            href="https://drive.google.com/drive/folders/1koaFbQEh1sQdb30aHmqspJainYLBiagC?usp=sharing"
            _blank
            download
          >
            중국식품 주문 앱 apk 다운로드
          </a>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
  import {ref} from 'vue';

  export default {
    setup() {
      return {
        slide: ref('style'),
      };
    },
  };
  // import {mapGetters, mapState, mapActions} from 'vuex';
  // import OrderItemInfo from 'components/OrderItemInfo.vue';
  // import CouponList from 'components/CouponList.vue';
  // import LoginPage from 'components/LoginPage.vue';
  // import {defineComponent, ref} from 'vue';
  // import {loadTossPayments} from '@tosspayments/payment-sdk';
  // import validation from 'src/util/data/validation';
  // import AddressList from './AddressList.vue';
  // import AddressRegister from './AddressRegister.vue';
  // import {date} from 'quasar';
  // import axios from 'axios';
  // import alert from 'src/util/modules/alert';
  // import configs from 'src/configs/';

  // export default defineComponent({
  //   name: 'HomePage',
  //   components: {

  //   },

  //   data: function () {
  //   },

  //   computed: {

  //   },
  //   methods: {

  //   },
  //   mounted() {

  //   },
  // });
</script>
