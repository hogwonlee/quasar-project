<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">교환/반품 안내</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section
        ><div class="text-body1 text-bold">교환 및 반품 주소</div>
        <div>
          - [08365] 서울특별시 구로구 천왕로 56 천왕이펜하우스 3단지 303동
          1503호
        </div>
        <div></div>
        <div class="text-body1 text-bold">교환 및 반품 택배비 안내</div>
        <div>
          - 상품 불량 및 오배송 등의 이유로 반품하실 경우, 반품 배송비는
          무료입니다.
        </div>
        <div>
          - 단순변심 및 구매하신 고객님의 사정으로 인한 반품, 교환의 경우는
          고객님의 부담 왕복택배비 5,600원 부과로 처리됩니다. (구매하신 금액에서
          차감한 후, 나머지 금액을 환불해 드립니다.)
        </div>
        <div>
          - 무료배송상품(이벤트)의 반품 및 환불의 경우에는 왕복 택배비
          5,600원(반품 수거비 2,800원 포함)를 구매하신 금액에서 차감한 후,
          나머지 금액을 환불해 드립니다.
        </div>
        <div></div>
        <div class="text-body1 text-bold">교환 및 반품이 가능한 경우</div>
        <div>
          - 상품을 공급 받으신 날로부터 7일이내. (단,경우 포장을 개봉하였거나
          포장이 훼손되어 상품가치가 상실된 경우에는 교환/반품이 불가능합니다.)
        </div>
        <div>
          - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 다르게
          이행된 경우에는 공급받은 날로부터 3개월이내, 그 사실을 알게 된
          날로부터 30일이내
        </div>
        <div>- 제품의 불량 및 하자가 있는 경우</div>
        <div>- 주문한 제품의 오배송인 경우</div>
        <div>- 구매자의 주문 실수로 인한 경우 (택배비 고객부담)</div>
        <div></div>
        <div class="text-body1 text-bold">교환 및 반품이 불가능한 경우</div>
        <div>
          - 신선/냉장/냉동 식품 재판매가 불가한 상품의 특성상, 단순 변심, 주문
          착오 시 교환 및 반품이 어렵습니다.
        </div>
        <div>
          - 상품에 따라, 개인의 기호에 따라 같은 주관적으로 다르게 느끼실 수
          있으며 이는 반품사유가 될 수 없습니다.
        </div>
        <div>- 구입 후 7일 지난 경우 (단순변심)</div>
        <div>
          - 제품박스, 봉지, 파우치 등을 개봉하였거나, 내용물을 사용한 경우
        </div>
        <div>
          - 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. (단,
          상품의 내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외)
        </div>
        <div>- 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우</div>
        <div>
          - 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한
          경우
        </div>
        <div>
          - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히
          감소한 경우
        </div>
        <div>- 복제가 가능한 상품등의 포장을 훼손한 경우</div>
        <div>
          (자세한 내용은 고객만족센터 1:1 E-MAIL상담을 이용해 주시기 바랍니다.)
        </div>
        <div></div>
        <div>
          ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은
          고객님께서 부담하셔야 합니다.
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'ExchangePolicy',
  });
</script>
