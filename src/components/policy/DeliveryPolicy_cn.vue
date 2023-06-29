<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">快递政策</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">1. 运费</div>
        <div class="text-body2">
          满3万，免运费 (购买额不足3万时，需支付运费2800韩元)
        </div>
        <div class="text-body2">*局部偏远、山间地区，需要另外支付额外运费</div>
        <div class="text-body1 text-bold">2. 运送所需日</div>
        <div class="text-body2">一般需要2~3日（购买确定后）。</div>
        <div class="text-body2">
          *极少有可能入库日程发生问题，此时会延迟1~2天
        </div>
        <div class="text-body2">*局部偏远、山间地区，可能延迟1~2天</div>
        <div class="text-body1 text-bold">3. 冷冻食品</div>
        <div class="text-body2">
          需注意:冷冻食品需尽快领取放入冰箱。不然有可能变质。
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
