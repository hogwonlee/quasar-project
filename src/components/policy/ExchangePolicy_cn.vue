<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">交换、返货政策</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">1. 交换、返货条件</div>
        <div class="text-body2">- 收件后7天以内</div>
        <div class="text-body2">
          * 如果已拆封或者已损害商品价值，则不能交换或返货。
        </div>
        <div class="text-body1 text-bold">2. 交换、返货</div>
        <div class="text-body2">
          - 如果由于客户的责任而导致产品丢失或损坏。然而，产品
          包装等破损、检查内容物的情况除外
        </div>
        <div class="text-body2">
          - 如果包装被打开或包装损坏，产品的价值就会损失（例如：
          家电、食品、唱片等、单液晶屏笔记本电脑、液晶显示器、
          数码相机等像素缺陷导致的退货/换货须遵守制造商标准。 跟随。）
        </div>
        <div class="text-body2">
          - 如果产品的价值因您的使用或部分消耗而显着下降
          然而，在化妆品等的情况下，仅限于提供试用产品的情况。
        </div>
        <div class="text-body2">
          - 由于时间的推移，产品等的价值显着恶化，以至于难以转售时
        </div>
        <div class="text-body2">
          - 由于时间的推移，商品等的价值显着下降，难以转售时
        </div>
        <div class="text-body1 text-bold">3. 交换、返货费用</div>
        <div class="text-body2">
          * 如果您改变主意换货或退货，则需承担退货费用。
          （包括颜色交换、尺寸交换等）
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
