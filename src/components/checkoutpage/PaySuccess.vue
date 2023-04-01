<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h1">결제성공</div>
      <q-btn
        label="주문 현황 확인"
        tag="a"
        to="/DeliveryInfo"
        color="primary"
      ></q-btn>
    </section>
  </q-page>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'PaySuccess',
    mounted() {
      this.paymentAuthorizationRequest();
    },
    data() {
      return {
        postJsonData: [{paymentkey: '', amount: 0, orderId: ''}],
      };
    },
    methods: {
      readResData() {
        let url = new URL(window.location.href);
        this.postJsonData = {
          paymentKey: url.searchParams.get('paymentKey'),
          amount: url.searchParams.get('amount'),
          orderId: url.searchParams.get('orderId'),
        };
        // console.log(this.postJsonData);
      },

      paymentAuthorizationRequest() {
        //클라이언트 요청 오류: 오류번호 400
        this.readResData();
        const requestData = JSON.parse(JSON.stringify(this.postJsonData));

        // console.log(requestData);
        axios({
          url: 'https://api.tosspayments.com/v1/payments/confirm',
          method: 'POST',

          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization:
              'Basic dGVzdF9za19PNkJZcTdHV1BWdk12a0piTHB3M05FNXZibzFkOg==',
            // 'Basic base64(test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R:)', //test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R / test_sk_O6BYq7GWPVvMvkJbLpw3NE5vbo1d
          },

          data: requestData,
        })
          .then(res => {
            // console.log(JSON.stringify(res.data));
          })
          .catch(e => console.error(e));
      },
    },
  });
</script>
