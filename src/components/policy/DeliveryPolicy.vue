<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">배송 안내</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">1. 배송비</div>
        <div class="text-body2">
          3만원 이상 무료 배송 (주문 금액 3만원 미만일 때 배송비 2,800원) *
          도서, 산간, 오지 등 일부 지역은 별도의 추가 금액을 지불하셔야 하는
          경우가 있습니다.
        </div>
        <div class="text-body1 text-bold">2. 배송기간</div>
        <div class="text-body2">
          평균 배송일은 (입금 확인 후) 2~3일입니다. 다만, 주문량 혹은 주문 제품
          입고 일정에 따라 추가시간이 소요될 수 있으며 도서, 산간, 오지 등 일부
          지역은 배송 기간이 더 소요될 수 있습니다.
        </div>
        <div class="text-body1 text-bold">3. 냉동식품</div>
        <div class="text-body2">
          냉동식품의 경우, 수령이 지연되면 상할 수 있으니 배송이 완료되면 되도록
          빨리 수령하여 주시기 바랍니다.
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'DeliveryPolicy',
  });
</script>
