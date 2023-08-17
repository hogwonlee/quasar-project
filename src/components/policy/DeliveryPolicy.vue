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
        <div class="text-body1 text-bold">배송 방법</div>
        <div>- 택배</div>
        <div class="text-body1 text-bold">배송 지역</div>
        <div>- 전국지역</div>
        <div class="text-body1 text-bold">배송 비용</div>
        <div>- 조건부 무료</div>
        <div>- 주문 금액 30,000원 미만일 때 배송비 2,800원을 추가합니다.</div>
        <div class="text-body1 text-bold">배송 기간</div>
        <div>- 2일 ~ 3일</div>
        <div class="text-body1 text-bold">배송 안내</div>
        <div>
          - 발송일 기준으로 1~3일 소요됩니다. (토, 일 공휴일 제외되며, 물류
          사정에 따라 다소 차이가 날 수 있는 점 양해 부탁드립니다.)
        </div>
        <div>
          - 배송준비중 상태일 경우, 포장 및 발송 작업이 완료되어 주문취소가
          불가합니다. (단,'상품준비중'상태일 경우 취소가능)
        </div>
        <div>
          - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야 하는 경우가
          있습니다.
        </div>
        <div>
          - 냉동식품의 경우, 수령이 지연되면 상할 수 있으니 배송이 완료되면
          되도록 빨리 수령하여 주시기 바랍니다.
        </div>
        <div>
          - 고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만,
          상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
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
