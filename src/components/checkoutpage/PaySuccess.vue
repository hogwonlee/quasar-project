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
    data() {
      return {};
    },
    methods: {
      paymentAuthorizationRequest() {
        //클라이언트 요청 오류: 오류번호 400
        axios
          .post(
            'https://api.tosspayments.com/v1/payments/confirm',
            {
              headers: {
                Authorization:
                  'Basic dGVzdF9za19PNkJZcTdHV1BWdk12a0piTHB3M05FNXZibzFkOg==',
                'Content-Type': 'application/json',
              },
            },
            {
              data: {
                paymentKey: 'PoxJmeD4pZORzdMaqN3wE00kb5oGJBr5AkYXQGwyEb21W9v7',
                amount: 3000,
                orderId: 'gO43carKfiyo7_KPPa-YM',
              },
            },
          )
          .then(res => console.log(res.data))
          .catch(e => console.error(e));
      },
    },
  });
</script>
