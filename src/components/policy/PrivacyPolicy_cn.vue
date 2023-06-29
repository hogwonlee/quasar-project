<template>
  <div class="q-pa-none q-ma-none">
    <!-- <q-btn label="reset" @click="resetcouponList"></q-btn> -->
    <q-card class="transparent" flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">个人信息使用方针</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <div class="text-body1 text-bold">
          1. 个人信息收集项目、目的及保存期限
        </div>
        <div class="text-body2">
          收集使用该服务所需的最低限度的个人信息。创新购物，通过用户的个人信息、服务访问和搜索、服务使用等情况，分析用户的兴趣、兴趣和偏好，提供适合个人喜好的服务，并按照用户期望的时间、地点和方式交付产品。
        </div>
        <div class="text-body1 text-bold">2. 确保个人信息安全的措施</div>
        <div class="text-body2">
          在处理用户个人信息时，采取技术和管理保护措施，防止个人信息被窃取、泄露、篡改或毁损。技术保护措施：实时监控和阻止黑客攻击和泄密、访问控制的应用、访问记录的存储和防伪的应用、密码和个人信息的加密、存储和传输过程的加密管理保护措施：操作致力于个人信息保护的组织、个人信息保护
          信息处理人员定期培训、员工意识提升活动、合规状况定期检查
        </div>
        <div class="text-body1 text-bold">3. 个人信息使用方针的处理</div>
        <div class="text-body2">
          根据《位置信息法》安全管理用户的个人位置信息。个人位置信息的处理目的和保留期限如果需要根据我们的服务的“基于位置的服务的使用条款”提供基于位置的服务，个人位置信息可能会保留达到实现目的所需的最短期限使用目的
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
