<template>
  <q-page>
    <div v-if="orderGroupList.length > 0">
      <q-card class="my-card">
        <q-card-section
          v-for="order in orderGroupList"
          :key="order.id"
          v-bind="order"
        >
          <div class="absolute-top-right q-ma-md">
            <q-btn color="primary" label="배송조회"></q-btn>
          </div>
          <div class="text-h6">주소아이디: {{ order.address_id }}</div>
          <div class="text-subtitle2">주문날짜: {{ order.order_date }}</div>
          <div class="text-subtitle2">주문시간: {{ order.order_time }}</div>
          <div class="text-subtitle2">
            배송송장: {{ order.delivery_invoice }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>아직 주문 내역이 없습니다.</div>

    <SweetTrackerInfo />
  </q-page>
</template>

<script>
  import SweetTrackerInfo from 'components/SweetTrackerInfo.vue';
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapState, mapActions} from 'vuex';
  import address from 'src/store/user/addressInfo';
  import order from 'src/store/orderList';
  import user from 'src/store/user/userInfo';
  import validation from 'src/util/data/validation';
  import check from 'src/util/modules/check';

  export default defineComponent({
    name: 'DeliveryInfo',
    components: {SweetTrackerInfo},
    data() {
      return {};
    },
    computed: {
      ...mapState({
        address: state => state.all,
        order: state => state.all,
        user: state => state.all,
      }),
      user_id_get: user.getters.getMyId,
      user_token_get: user.getters.getMyToken,
      user_name_get: user.getters.getMyName,
      addressList: address.getters.getAddressList,
      orderGroupList: order.getters.getOrderGroupList,
    },
    mounted() {
      console.log(this.user_token_get + this.user_id_get + this.user_name_get);
      console.log(order.state.status);
      console.log(JSON.stringify(this.orderGroupList));
      if (check.check_login() && validation.isNull(order.state.status)) {
        // 최근 주문 리스트 읽어오기. 이 페이지가 로드될 때, 주문 내역이 변경되었을 때마다 새로 불러와야 함.
        axios({
          url: 'http://localhost:3001/deliveryInfo',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user_token_get,
          },
          data: {
            user_id: this.user_id_get,
            user_name: this.user_name_get,
          },
        })
          .then(res => {
            order.dispatch('setEmptyAction');

            res.data.results.forEach(order => {
              console.log('주문그룹 정보: ' + JSON.stringify(order));
              order.dispatch('pushOrderAction', order);
            });
            order.dispatch('setStatusAction', null);
          })
          .catch(res => {
            console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
          });
      }
    },
    methods: {},
  });
</script>
