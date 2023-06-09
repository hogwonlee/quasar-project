<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">교환/반품 안내</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">1. 교환 및 반품이 가능한 경우</div>
        <div class="text-body2">
          - 상품을 공급 받으신 날로부터 7일이내 단, 가전제품의 경우 포장을
          개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는 교환/반품이
          불가능합니다.
        </div>
        <div class="text-body2">
          - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나 다르게
          이행된 경우에는 공급받은 날로부터 3월이내, 그사실을 알게 된 날로부터
          30일이내
        </div>
        <div class="text-body1 text-bold">2. 교환 및 반품이 불가능한 경우</div>
        <div class="text-body2">
          - 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. 단, 상품의
          내용을 확인하기 위하여 포장 등을 훼손한 경우는 제외
        </div>
        <div class="text-body2">
          - 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우 (예 :
          가전제품, 식품, 음반 등, 단 액정화면이 부착된 노트북, LCD모니터,
          디지털 카메라 등의 불량화소에 따른 반품/교환은 제조사 기준에
          따릅니다.)
        </div>
        <div class="text-body2">
          - 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한
          경우 단, 화장품등의 경우 시용제품을 제공한 경우에 한 합니다.
        </div>
        <div class="text-body2">
          - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히
          감소한 경우
        </div>
        <div class="text-body2">
          - 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히
          감소한 경우
        </div>
        <div class="text-body1 text-bold">3. 교환 및 반품 비용</div>
        <div class="text-body2">
          ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은
          고객님께서 부담하셔야 합니다. (색상 교환, 사이즈 교환 등 포함)
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
