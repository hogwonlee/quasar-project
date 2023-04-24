<template>
  <q-page class="q-pa-md">
    <div v-if="order_count > 0">
      <q-card
        class="my-card"
        v-for="order in orderGroupList"
        :key="order.id"
        v-bind="order"
      >
        <div class="q-gutter-sm q-ma-xs">
          <q-card-section>
            <!-- <div class="text-h6">주문 번호: {{ order.id }}</div> -->
            <!-- <div class="text-h6">주문 위치: {{ order.address_tag }}</div>
          <div class="text-h6">수령인: {{ order.recipient }}</div> -->
            <div class="row">
              <q-input
                class="col-3"
                :model-value="order.order_date"
                mask="####-##-##"
                label="주문 날짜"
                readonly
              ></q-input>
              <q-input
                class="col-3"
                :model-value="order.order_time"
                readonly
                label="주문 시간"
              ></q-input>

              <q-input
                class="col-6"
                :model-value="get_address_tag(order.address_id)"
                label="배송지 이름"
                readonly
              ></q-input>

              <q-input
                class="col-3"
                :model-value="order.delivery_code"
                readonly
                label="택배사코드"
              ></q-input>
              <!-- <div class="text-subtitle2">
            주문 시점: {{ order.order_date + order.order_time }}
          </div> -->

              <q-input
                class="col-9"
                :model-value="order.delivery_invoice"
                label="송장번호"
                readonly
                mask="###/####/###/####"
              ></q-input>
            </div>
            <!-- <div class="text-subtitle2">
            배송송장: {{ order.delivery_invoice }}
          </div> -->
            <div class="absolute-top-right q-pa-sm q-gutter-sm">
              <q-btn
                color="warning"
                label="배송조회 - 스윗트래커 키값 새로 받아야 함."
                @click="
                  this.tracker_info(order.delivery_code, order.delivery_invoice)
                "
              ></q-btn>
              <q-btn
                color="primary"
                label="주문 상세정보"
                @click="get_order_list(order.orderGroup_id)"
              ></q-btn>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
    <div v-else>
      <q-input
        v-model="info_title"
        class="text-h3"
        input-class="text-center"
      ></q-input>
      <q-input
        v-model="info_text"
        class="text-body2"
        input-class="text-center"
      ></q-input>
      <!-- <q-page class="flex flex-center">
        <img
          alt="Shop logo"
          src="~assets/online_shop_logo.jpg"
          style="width: 80px; height: 180px"
        />
      </q-page> -->
    </div>
    <q-dialog v-model="search_order">
      <q-card>
        <q-card-section class="row">
          <q-input class="col-3" label="품명 / 品名" readonly></q-input>
          <q-input class="col-3" label="설명 / 简介" readonly></q-input>
          <q-input class="col-2" label="단가 / 单价" readonly></q-input>
          <q-input class="col-2" label="수량 / 数量" readonly></q-input>
          <q-input class="col-2" label="가격 / 价格" readonly></q-input>
        </q-card-section>
        <q-card-section
          class="row"
          v-for="order in this.res_order[search_order_id]"
          :key="order.id"
        >
          <q-input
            class="col-3"
            :model-value="order.product_name"
            readonly
          ></q-input>
          <q-input class="col-3" :model-value="order.tag" readonly></q-input>
          <q-input class="col-2" :model-value="order.price" readonly></q-input>
          <q-input
            class="col-2"
            :model-value="order.quantity"
            readonly
          ></q-input>
          <q-input
            class="col-2"
            :model-value="order.quantity * order.price"
            readonly
          ></q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="tracker">
      <SweetTrackerInfo
        v-bind:delivery_code="this.child_code"
        v-bind:delivery_invoice="this.child_invoice"
      />
    </q-dialog>
  </q-page>
</template>

<script>
  import SweetTrackerInfo from 'components/SweetTrackerInfo.vue';
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapState, mapActions, mapGetters} from 'vuex';
  import validation from 'src/util/data/validation';
  import alert from 'src/util/modules/alert';

  export default defineComponent({
    name: 'DeliveryInfo',
    components: {SweetTrackerInfo},
    data() {
      return {
        tracker: false,
        search_order: false,
        search_order_id: 0,
        child_code: '',
        child_invoice: '',
        info_title: '안내 / 提醒',
        info_text: '주문내역이 없습니다. / 暂无订单',
        center_text: '中国食品',
        res_order: [],
      };
    },
    computed: {
      ...mapState({
        addressList: state => state.address.items,
        order: state => state.order.items,
        order_status: state => state.order.status,
        user: state => state.user.USER,
        orderGroupList: state => state.order.items,
      }),
      ...mapActions([
        ('order', ['setEmptyAction']),
        ('order', ['setStatusAction']),
        ('order', ['pushOrderAction']),
      ]),
      ...mapGetters('order', {
        order_count: 'getOrderLength',
      }),
    },
    mounted() {
      if (
        !validation.isNull(this.user.USER_ID) &&
        !validation.isNull(this.order_status)
      ) {
        // 최근 주문 리스트 읽어오기. 이 페이지가 로드될 때, 주문 내역이 변경되었을 때마다 새로 불러와야 함.  &&
        axios({
          url: 'http://localhost:3001/deliveryInfo',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: {
            user_id: this.user.USER_ID,
            user_name: this.user.USER_NAME,
          },
        })
          .then(res => {
            // order.dispatch('setEmptyAction');
            this.$store.dispatch('order/setEmptyAction');

            res.data.results.forEach(order_group_info => {
              // console.log('주문그룹 정보: ' + JSON.stringify(order_group_info));
              // order.dispatch('pushOrderAction', order_group_info);
              this.$store.dispatch('order/pushOrderAction', order_group_info);
            });
            // order.dispatch('setStatusAction', null);
            this.$store.dispatch('order/setStatusAction', null);
          })
          .catch(res => {
            console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
          });
      }
    },
    methods: {
      tracker_info(code, invoice) {
        if (validation.isNull(invoice)) {
          alert.confirm('알림', '송장이 등록되지 않았습니다.');
        } else {
          this.child_code = code;
          this.child_invoice = invoice;
          this.tracker = true;
        }
      },
      get_address_tag(address_id) {
        // console.log(JSON.stringify(address.state.items));
        var return_tag;
        this.addressList.map(function (ele) {
          if (ele.address_id == address_id) {
            return_tag = ele.address_tag;
          }
        });
        return return_tag;
      },
      get_order_list(orderGroup_id) {
        this.search_order_id = orderGroup_id;
        if (validation.isNull(this.res_order[this.search_order_id])) {
          const postData = {
            user_id: this.user.USER_ID,
            order_group: orderGroup_id,
          };

          // 배송지 등록 요청 보내기
          axios({
            url: 'http://localhost:3001/orderList',
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: this.user.USER_TOKEN,
            },

            data: postData,
          })
            .then(res => {
              this.res_order[orderGroup_id] = res.data.results;
              console.log(JSON.stringify(res.data.results));
              this.search_order = true;
            })
            .catch(res => console.log('에러: ' + res));
        } else {
          this.search_order = true;
        }
      },
    },
  });
</script>
