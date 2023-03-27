<template>
  <q-page class="q-pa-xl">
    <q-form
      action="http://info.sweettracker.co.kr/tracking/5"
      method="post"
      target="_parent"
    >
      <q-input
        outlined
        label="API Key"
        v-model="t_key"
        for="t_key"
        placeholder="제공받은 APIKEY"
      />
      <q-input
        outlined
        v-model="t_code"
        label="택배사코드"
        for="t_code"
        placeholder="택배사 코드"
      />
      <q-input
        outlined
        v-model="t_invoice"
        label="운송장 번호"
        for="t_invoice"
        placeholder="운송장 번호"
      />
      <q-btn type="submit" class="btn btn-default" label="조회하기" />
    </q-form>
  </q-page>
  <div name="link"></div>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';

  export default defineComponent({
    name: 'SweetTrackerInfo',
    components: {},
    data() {
      return {
        t_key: 'XPrmI9vGFcc8x97uZrpEPg',
        t_code: '04', // cj대한통운
        t_invoice: '655123092251',
      };
    },
    mounted() {
      this.setdata();
    },
    methods: {
      setdata() {
        this.t_key = 'XPrmI9vGFcc8x97uZrpEPg';
        this.t_code = '04'; // cj대한통운
        this.t_invoice = '655123092251';

        const data = {
          t_key: this.t_key,
          t_code: this.t_code,
          t_invoice: this.t_invoice,
        };
        axios({
          url: 'http://info.sweettracker.co.kr/api/v1/trackingInfo',
          method: 'GET',
          params: data, //GET 사용할 때는 params, POST 사용할 때는 data
        })
          .then(res => console.log(JSON.stringify(res.data)))
          .catch(e => console.log(e));
      },
    },
  });
</script>
