<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h1">결제성공</div>
      <q-btn
        color="primary"
        label="결제완료"
        @click="paymentAuthorizationRequest"
      ></q-btn>
      <!-- <div>
        <ul>
          <li>결제 상품 {{ payments.orderName }}</li>
          <li>주문번호 {{ payments.orderId }}</li>
          <li>결제금액 {{ card.amount }}</li>
        </ul>
      </div> -->
    </section>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'PaySuccess',
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
    methods: {
      paymentAuthorizationRequest() {
        //클라이언트 요청 오류: 오류번호 400

        axios
          .post(
            'https://api.tosspayments.com/v1/payments/confirm',
            {
              headers: {
                Authorization: `Basic base64(test_sk_O6BYq7GWPVvMvkJbLpw3NE5vbo1d:)`,

                'Content-Type': `application/json`,
              },
            },
            JSON.stringify(this.postJsonData),
          )
          .then(res => console.log(res.data))
          .catch(e => console.error(e));
      },
    },
  });
</script>
