<template>
  <div class="q-pa-none q-ma-none text-white">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">运送须知</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">运送方式</div>
        <div>- 快递</div>
        <div>- 直接送货</div>
        <div class="text-body1 text-bold">运送地区</div>
        <div>- 全国</div>
        <div class="text-body1 text-bold">运费</div>
        <div>- 满X万免费</div>
        <div>- 购买额未满3万时，收取运费2800韩元。</div>
        <div>- 包含冷冻冷藏食品时，购买额未满5万时，额外收取运费2200韩元。</div>
        <div class="text-body1 text-bold">运送时间</div>
        <div>- 2天~3天</div>
        <div class="text-body1 text-bold">运送须知</div>
        <div>
          -
          以发货日为准，需要一天至三天。（除周六周日公休日，随物流情况会有所差异。敬请谅解。）
        </div>
        <div>
          -
          ‘运送准备中’状态，说明已经包装并交给快递公司，此时订单无法取消。（未输入订单号之前可以取消。）
        </div>
        <div>- 山涧或者岛屿地区额外收取运费。</div>
        <div>
          -
          冷冻、冷藏食品容易腐坏，因此到货后请尽快收领。此类商品，我们在18点至22点之间直接送货，防止商品暴露在常温之下。
        </div>
        <div>
          - 我们将确认入款以后发货。按商品种类的不同，商品的发货时间会有所差异。
        </div>
      </q-card-section>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">배송 안내</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">배송 방법</div>
        <div>- 택배</div>
        <div>- 직접배송</div>
        <div class="text-body1 text-bold">배송 지역</div>
        <div>- 전국지역</div>
        <div class="text-body1 text-bold">배송 비용</div>
        <div>- 조건부 무료</div>
        <div>- 주문 금액 30,000원 미만일 때 배송비 2,800원을 추가합니다.</div>
        <div>
          - 냉동/냉장 식품 포함시, 주문 금액 50,000원 미만일 때 별도로 배송비
          2,200원을 추가합니다.
        </div>
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
          되도록 빨리 수령하여 주시기 바랍니다. - 냉동식품의 경우, 상품이 상온에
          오래 노출되는것을 방지하기 위해 우리가 직접 배송해드립니다. 일반적으로
          저녁 6시에서 10시 사이에 배송해드립니다.
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
