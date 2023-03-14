<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h3" lang="zh-CN">배송현황/快递现状</div>
      <div class="text-h6">3일 뒤 도착 예정</div>
      <div class="text-h3">주문한 상품 리스트</div>
    </section>
    <!-- <div name="viewer"></div> -->
    <!-- <q-form
      action="http://info.sweettracker.co.kr/tracking/6"
      method="post"
      target="_self"
    >
      <div class="form-group">
        <q-input
          label="API Key"
          v-model="t_key"
          type="text"
          class="form-control"
          id="t_key"
          name="t_key"
          placeholder="제공받은 APIKEY"
        />
      </div>
      <div class="form-group">
        <q-input
          v-model="t_code"
          label="택배사코드"
          type="text"
          class="form-control"
          name="t_code"
          id="t_code"
          placeholder="택배사 코드"
        />
      </div>
      <div class="form-group">
        <q-input
          v-model="t_invoice"
          label="운송장 번호"
          type="text"
          class="form-control"
          name="t_invoice"
          id="t_invoice"
          placeholder="운송장 번호"
        />
      </div>
      <q-btn type="submit" class="btn btn-default" label="조회하기" />
    </q-form> -->
  </q-page>

  <AddressRegister />
</template>

<script>
  import axios from 'axios';
  // import {json} from 'body-parser';
  import {defineComponent} from 'vue';
  import AddressRegister from 'components/AddressRegister.vue';

  export default defineComponent({
    name: 'DeliveryInfo',
    components: {
      AddressRegister,
    },
    data() {
      return {
        traceNumber: '601234567890',
      };
    },
    mounted() {
      this.checkDelivery(this.traceNumber);
    },
    methods: {
      checkDelivery(traceNumber) {
        // 스윗트랙커를 이용한 택배 조회.
        axios
          .post('http://trace-api-dev.sweettracker.net:8102/add_invoice/', {
            // 개발용 http://trace-api-dev.sweettracker.net:8102/add_invoice/
            // 운영   http://trace-api.sweettracker.net/add_invoice/
            params: {
              data: {
                num: traceNumber,
                code: '04', // cj대한통운
                fid: traceNumber,
                callback_url: 'localhost', //뭘 넣어야 할지 모르겠음
                callback_type: 'json', //기본 map, 'json,xml'도 가능
                tier: 'sweet', // 문서 예시 따라 넣음. 뭘 넣을지 모름.
                key: 'XPrmI9vGFcc8x97uZrpEPg', //스윗트랙커에서 받은 무료 조회키 (매달 1000개 제한)
                // type: 'json', //기본 json, 'xml'도 가능
              },
            },
          })
          .then(res => {
            console.log(res);
          })
          .catch(res => {
            // var jsonData = JSON.parse(res);
            console.log('에러 발생:' + res);
          });
      },
    },
  });
</script>
