<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h1">결제실패</div>
    </section>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';

  export default defineComponent({
    name: 'PayFail',
    mounted() {
      let url = new URL(window.location.href);
      this.postJsonData = {
        paymentkey: url.searchParams.get('paymentKey'),
        amount: url.searchParams.get('amount'),
        orderId: url.searchParams.get('orderId'),
      };
      // console.log(this.postJsonData);
    },
    data() {
      return {
        postJsonData: [{paymentkey: '', amount: 0, orderId: ''}],
      };
    },
  });
</script>
