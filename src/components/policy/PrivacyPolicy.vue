<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">개인정보취급방침</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">
          1. 개인정보 수집 항목 및 목적과 보유 기간
        </div>
        <div class="text-body2">
          쿠팡은 서비스 이용에 필요한 최소한의 개인정보를 수집합니다. 이용자의
          개인정보와 서비스 방문 및 검색, 서비스 이용을 통해 이용자의 관심,
          흥미, 기호 등을 분석하여 개인 성향에 맞춤화된 서비스를 제공하고
          이용자가 원하는 시간, 장소 및 방식에 맞게 상품을 배송하는 혁신적인
          쇼핑 경험을 제공합니다.
        </div>
        <div class="text-body1 text-bold">2. 개인정보의 안전성 확보조치</div>
        <div class="text-body2">
          쿠팡은 이용자의 개인정보를 처리함에 있어 개인정보가 도난, 유출, 변조,
          또는 훼손되지 않도록 기술적 관리적 보호조치를 강구하고 있습니다.
          기술적 보호조치: 해킹시도 및 유출에 대한 실시간 모니터링 및 차단,
          접근통제 적용, 접속기록의 보관 및 위변조 방지 적용, 비밀번호 및
          개인정보 암호화 저장, 전송 시 암호화 관리적 보호조치: 개인정보보호
          전담조직 운영, 개인정보취급자 대한 정기적인 교육 수행, 직원을 대상으로
          한 인식제고 활동, 규정 준수상태 정기적 점검
        </div>
        <div class="text-body1 text-bold">3. 개인위치정보의 처리</div>
        <div class="text-body2">
          쿠팡은 위치정보법에 따라 이용자의 개인위치정보를 안전하게 관리합니다.
          개인위치정보의 처리목적 및 보유기간 쿠팡이츠 서비스의 ‘위치기반서비스
          이용약관 제8조’에 따라 위치기반 서비스 제공을 위해 필요한 경우
          이용목적 달성을 위해 필요한 최소한의 기간동안 개인 위치정보를 보유할
          수 있습니다.
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'PrivacyPolicy',
  });
</script>
