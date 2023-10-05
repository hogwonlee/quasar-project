<template>
  <q-page class="q-pa-md">
    <div class="bg-primary">
      <q-chip outline color="grey-1" class="text-body3 text-grey-1">
        {{ selected_local.shippingnum }}
      </q-chip>
      <div class="text-h3 text-grey-1">{{ t_invoice }}</div>
      <div class="text-body3 text-grey-1">{{ code_name[t_code] }}</div>
    </div>
    <q-stepper
      class="bg-secondary"
      v-model="step"
      ref="stepper1"
      alternative-labels
      color="primary"
      animated
    >
      <q-step
        :name="1"
        :title="selected_local.prepareproduct"
        icon="shelves"
        active-icon="shelves"
        done-icon="shelves"
        :done="step >= 1"
      >
        {{ selected_local.deliverlevel1 }}
      </q-step>
      <q-step
        :name="2"
        :title="selected_local.moving"
        icon="zoom_in_map"
        active-icon="zoom_in_map"
        done-icon="zoom_in_map"
        :done="step >= 2"
      >
        {{ selected_local.deliverlevel2 }}
      </q-step>

      <q-step
        :name="3"
        :title="selected_local.arrivalresion"
        icon="warehouse"
        active-icon="warehouse"
        done-icon="warehouse"
        :done="step >= 3"
      >
        {{ selected_local.deliverlevel3 }}
      </q-step>
      <q-step
        :name="5"
        :title="selected_local.deliverstart"
        icon="local_shipping"
        active-icon="local_shipping"
        done-icon="local_shipping"
        :done="step >= 5"
      >
        {{ selected_local.deliverlevel5 }}
      </q-step>
      <q-step
        :name="6"
        :title="selected_local.delivercomplete"
        icon="how_to_reg"
        active-icon="how_to_reg"
        done-icon="how_to_reg"
        :done="step >= 6"
      >
        {{ selected_local.deliverlevel6 }}
      </q-step>
    </q-stepper>
    <div v-if="step >= 2">
      <q-stepper
        v-model="step"
        vertical
        ref="stepper2"
        color="primary"
        animated
      >
        <q-step
          v-for="deli_in in delivery_info.slice().reverse()"
          :key="deli_in.time"
          v-bind="deli_in"
          :name="deli_in.level"
          :title="deli_in.where + '    |    ' + deli_in.kind"
          :done="step >= deli_in.level"
          done-color="grey"
          :caption="deli_in.timeString + '    |    ' + deli_in.telno2"
        >
        </q-step>
      </q-stepper>
    </div>

    <!-- <div v-for="deli_in in delivery_info" :key="deli_in.time" v-bind="deli_in">
      <div>{{ deli_in.kind }}</div>
      <div>{{ deli_in.level }}</div>
      <div>{{ deli_in.manName }}</div>
      <div>{{ deli_in.manPic }}</div>
      <div>{{ deli_in.telno2 }}</div>
      <div>{{ deli_in.timeString }}</div>
    </div> -->
  </q-page>
  <div name="link"></div>
</template>

<script>
  import {defineComponent, ref} from 'vue';
  import axios from 'axios';
  import {mapState} from 'vuex';
  import alert from 'src/util/modules/alert';
  // import https from 'https';

  export default defineComponent({
    name: 'SweetTrackerInfo',
    components: {},
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
    data() {
      return {
        t_key: '',
        t_code: '', // cj대한통운
        t_invoice: '',
        delivery_state: false,
        delivery_info: [],
        code_name: {
          '04': 'CJ대한통운',
          '01': '우체국택배',
          20: '한덱스',
          32: '합동택배',
          16: '한의사랑택배',
          40: '굿투럭',
          45: '우리택배(구호남택배)',
          54: '홈픽택배',
          74: '용마로지스',
          82: '컬리로지스',
          88: '큐런택배',
          92: '지니고 당일배송',
          101: '한샘서비스원 택배',
          107: 'LG전자(판토스)',
          113: '썬더히어로',
          119: '핑퐁',
          125: 'GTS로지스',
          130: 'UFO로지스',
          134: '에이치케이홀딩스',
          137: '더바오',
          142: '탱고앤고',
          148: 'ARGO',
          '05': '한진택배',
          '06': '로젠택배',
          22: '대신택배',
          46: 'CU 편의점택배',
          17: '천일택배',
          43: '애니트랙',
          47: '우리한방택배',
          71: 'IK물류',
          75: '원더스퀵',
          85: '풀앳홈',
          89: '두발히어로',
          94: '오늘의픽업',
          103: 'NDEX KOREA',
          110: '부릉',
          116: '(주)팀프레시',
          120: '발렉스 특수물류',
          127: '로지스팟',
          131: '딜리래빗',
          135: 'HTNS',
          138: '라스트마일',
          143: '투데이',
          151: '자이언트',
          '08': '롯데택배',
          11: '일양로지스',
          23: '경동택배',
          24: 'GS Postbox 택배',
          18: '건영택배',
          44: 'SLX택배',
          53: '농협택배',
          72: '성훈물류',
          79: '로지스밸리택배',
          86: '삼성전자물류',
          90: '위니아딤채',
          96: '로지스밸리',
          104: '도도플렉스(dodoflex)',
          112: '1004홈',
          118: '롯데칠성',
          123: '엔티엘피스',
          129: '홈픽 오늘도착',
          132: '지오피',
          136: '케이제이티',
          139: '오늘회 러쉬',
          145: '현대글로비스',
        },
      };
    },
    props: {
      delivery_code: {
        type: String,
        default: '04',
      },
      delivery_invoice: {
        type: String,
        default: '',
      },
    },
    setup() {
      return {
        step: ref(1),
      };
    },
    mounted() {
      this.setdata();
    },
    methods: {
      setdata() {
        // this.t_key = 'XPrmI9vGFcc8x97uZrpEPg';
        // this.t_code = '04'; // cj대한통운
        // this.t_invoice = '655123092251';
        this.t_key = 'I2uFSQI8NBXDY8caOUnh5A';
        this.t_code = this.delivery_code; // cj대한통운
        this.t_invoice = this.delivery_invoice;
        if (this.t_invoice == '0') {
          this.step = 1;
        } else if (this.t_invoice == '99') {
          this.step = 6;
          this.delivery_info[0] = {
            time: '9999-99-99',
            level: 6,
            where: '집 문앞',
            kind: '배송완료',
            timeString: '전화번호',
            telno2: '010-8492-0526',
          };
        } else {
          const data = {
            t_key: this.t_key,
            t_code: this.t_code,
            t_invoice: this.t_invoice,
          };
          axios({
            url: 'https://info.sweettracker.co.kr/api/v1/trackingInfo',
            method: 'GET',
            // httpsAgent: new https.Agent({
            //            rejectUnauthorized: false,
            //          }),
            params: data, //GET 사용할 때는 params, POST 사용할 때는 data
          })
            .then(res => {
              if (res.status == 200) {
                this.step = res.data.lastDetail.level;
                this.delivery_info = res.data.trackingDetails;
              } else {
                alert.confirm(
                  this.selected_local.err,
                  this.selected_local.err +
                    ': ' +
                    res.data.e_code +
                    res.data.e_message,
                );
              }
            })
            .catch(e => console.log(e));
        }
      },
    },
  });
</script>
