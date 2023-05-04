<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h3">{{ selected_local.paymentfail }}</div>
      <q-btn
        :label="selected_local.gobackorderlistinfovue"
        tag="a"
        to="/OrderList"
        color="primary"
      ></q-btn>
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
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
    data() {
      return {
        postJsonData: [{paymentkey: '', amount: 0, orderId: ''}],
      };
    },
  });
</script>
