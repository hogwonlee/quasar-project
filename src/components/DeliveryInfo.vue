<template>
  <q-page>
    <!-- <section>
      <div class="text-h3" lang="zh-CN">배송현황/快递现状</div>
      <div class="text-h6">3일 뒤 도착 예정</div>
      <div class="text-h3">주문한 상품 리스트</div>
    </section> -->

    <SweetTrackerInfo />
  </q-page>
</template>

<script>
  import SweetTrackerInfo from 'components/SweetTrackerInfo.vue';
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'DeliveryInfo',
    components: {SweetTrackerInfo},
    data() {
      return {};
    },
    mounted() {},
    methods: {},
  });
</script>
