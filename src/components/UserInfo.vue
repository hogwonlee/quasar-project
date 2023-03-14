<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h1">내 정보</div>
      <div class="text-h3">수령인: {{}}</div>
      <div class="text-h3">전화번호: {{}}</div>
      <div class="text-h3">주소: {{}}</div>
    </section>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'UserInfo',
  });
</script>
