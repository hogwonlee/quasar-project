<template>
  <q-page class="q-pa-md bg-teal-2">
    <div v-if="order_count > 0">
      <q-card
        class="my-card"
        v-for="order in orderGroupList.slice().reverse()"
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
                class="col-md-6 col-sm-12 col-xs-12"
                :model-value="order.orderGroup_id"
                :label="selected_local.ordergroup"
                readonly
              ></q-input>
              <q-input
                class="col-md-3 col-sm-6 col-xs-6"
                :model-value="get_address_tag(order.address_id)"
                :label="selected_local.addrname"
                readonly
              ></q-input>
              <q-input
                class="col-md-3 col-sm-6 col-xs-6"
                :model-value="order.order_date"
                mask="####-##-##"
                :label="selected_local.orderdate"
                readonly
              ></q-input>
              <!-- <q-input
                class="col-md-3 col-sm-6 col-xs-6"
                :model-value="order.order_time"
                readonly
                :label="selected_local.ordertime"
              ></q-input> -->

              <!-- <q-input
                class="col-3"
                :model-value="order.delivery_code"
                readonly
                :label="selected_local.delivercompany"
              ></q-input> -->
            </div>

            <div class="absolute-top-right q-pa-sm q-gutter-sm">
              <q-btn
                color="warning"
                :label="selected_local.tracedeliver"
                @click="
                  this.tracker_info(order.delivery_code, order.delivery_invoice)
                "
              ></q-btn>
              <q-btn
                color="primary"
                :label="selected_local.detailorder"
                @click="get_order_list(order.orderGroup_id)"
              ></q-btn>
              <q-btn
                color="primary"
                :label="selected_local.claim"
                @click="show_claim()"
              ></q-btn>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
    <div v-else>
      <div class="col-12 text-h6 text-bold">
        {{ selected_local.deliver_info_title }}
      </div>
      <div class="text-subtitle2 q-ml-md">
        {{ selected_local.deliver_info_text }}
      </div>
    </div>
    <q-separator />

    <!-- <div class="row q-mt-sm">
      <q-btn
        class="col-6"
        outline
        :label="selected_local.deliver_info_title + '(한국어)'"
        color="white"
        text-color="teal"
        @click="delivery_policy_vue = true"
      />
      <q-btn
        class="col-6"
        outline
        :label="selected_local.deliver_info_title + '(中文)'"
        color="white"
        text-color="teal"
        @click="delivery_policy_cn_vue = true"
      />
      <q-btn
        class="col-6"
        outline
        :label="selected_local.claim_info + '(한국어)'"
        color="white"
        text-color="teal"
        @click="exchange_policy_vue = true"
      />
      <q-btn
        class="col-6"
        outline
        :label="selected_local.claim_info + '(中文)'"
        color="white"
        text-color="teal"
        @click="exchange_policy_cn_vue = true"
      />
    </div> -->
    <!-- <q-dialog v-model="delivery_policy_vue">
      <DeliveryPolicy
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <q-dialog v-model="delivery_policy_cn_vue">
      <DeliveryPolicy_cn
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
      />
    </q-dialog>
    <q-dialog v-model="exchange_policy_vue">
      <ExchangePolicy
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog>
    <q-dialog v-model="exchange_policy_cn_vue">
      <ExchangePolicy_cn
        class="bg-teal-2 absolute-top q-mx-lg q-pa-sm"
        style="margin-top: 28%; max-height: 500px"
      />
    </q-dialog> -->
    <q-dialog v-model="search_order">
      <q-table
        :title="
          selected_local.ordergroup +
          ': ' +
          res_order[search_order_id][0].order_group
        "
        :rows="res_order[search_order_id]"
        :columns="columns"
        row-key="name"
      />
    </q-dialog>
    <q-dialog v-model="tracker">
      <!-- <q-input
                class="col-9"
                :model-value="order.delivery_invoice"
                :label="selected_local.shippingnum"
                readonly
                mask="###/####/###/####"
              ></q-input> -->
      <SweetTrackerInfo
        v-bind:delivery_code="this.child_code"
        v-bind:delivery_invoice="this.child_invoice"
      />
    </q-dialog>
  </q-page>
</template>

<script>
  import SweetTrackerInfo from 'components/SweetTrackerInfo.vue';
  import {defineComponent, ref} from 'vue';
  import axios from 'axios';
  import {mapState, mapActions, mapGetters} from 'vuex';
  import validation from 'src/util/data/validation';
  import alert from 'src/util/modules/alert';
  // import DeliveryPolicy from './policy/DeliveryPolicy.vue';
  // import ExchangePolicy from './policy/ExchangePolicy.vue';
  // import DeliveryPolicy_cn from './policy/DeliveryPolicy_cn.vue';
  // import ExchangePolicy_cn from './policy/ExchangePolicy_cn.vue';
  import configs from '/src/configs';

  export default defineComponent({
    name: 'DeliveryInfo',
    components: {
      SweetTrackerInfo,
      // DeliveryPolicy,
      // ExchangePolicy,
      // DeliveryPolicy_cn,
      // ExchangePolicy_cn,
    },
    data() {
      return {
        tracker: ref(false),
        search_order: ref(false),
        search_order_id: 0,
        child_code: '',
        child_invoice: '',
        center_text: '中国食品',
        res_order: [],
        columns: [],
        delivery_policy_vue: ref(false),
        delivery_policy_cn_vue: ref(false),
        exchange_policy_vue: ref(false),
        exchange_policy_cn_vue: ref(false),
      };
    },
    computed: {
      ...mapState({
        addressList: state => state.address.items,
        order: state => state.order.items,
        order_status: state => state.order.status,
        user: state => state.user.USER,
        orderGroupList: state => state.order.items,
        selected_local: state => state.ui_local.status,
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
        !validation.isNull(this.addressList.address_id) &&
        !validation.isNull(this.order_status)
      ) {
        // 최근 주문 리스트 읽어오기. 이 페이지가 로드될 때, 주문 내역이 변경되었을 때마다 새로 불러와야 함.  &&
        axios({
          url: `${configs.server}/deliveryInfo`,
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
            if (res.status == 200) {
              this.$store.dispatch('order/setEmptyAction');
              res.data.results.forEach(order_group_info => {
                this.$store.dispatch('order/pushOrderAction', order_group_info);
              });
              this.$store.dispatch('order/setStatusAction', null);
            } else {
              alert.confirm(
                this.selected_local.err,
                this.selected_local.err + ': ' + res.data.content,
              );
            }
          })
          .catch(res => {
            console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
          });
      }
    },
    methods: {
      tracker_info(code, invoice) {
        if (validation.isNull(invoice)) {
          alert.confirm(
            this.selected_local.notice,
            this.selected_local.nodeliverinvoice,
          );
        } else {
          this.child_code = code;
          this.child_invoice = invoice;
          this.tracker = true;
        }
      },
      show_claim() {
        alert.confirm(
          this.selected_local.claim_title,
          this.selected_local.claim_body,
        );
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
        this.set_columns();
        this.search_order_id = orderGroup_id;
        if (validation.isNull(this.res_order[this.search_order_id])) {
          const postData = {
            user_id: this.user.USER_ID,
            order_group: orderGroup_id,
          };

          // 배송지 등록 요청 보내기
          axios({
            url: `${configs.server}/orderList`,
            method: 'POST',
            // httpsAgent: new https.Agent({
            //              rejectUnauthorized: false,
            //            }),
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: this.user.USER_TOKEN,
            },

            data: postData,
          })
            .then(res => {
              if (res.status == 200) {
                this.res_order[orderGroup_id] = res.data.results;
                this.search_order = true;
              } else {
                alert.confirm(
                  this.selected_local.err,
                  this.selected_local.err + ': ' + res.data.content,
                );
              }
            })
            .catch(res => console.log('에러: ' + res));
        } else {
          this.search_order = true;
        }
      },
      set_columns() {
        this.columns = [
          {
            name: 'product_name',
            required: true,
            label: this.selected_local.productname,
            align: 'left',
            field: row => row.product_name,
            format: val => `${val}`,
            sortable: true,
          },
          {
            name: 'quantity',
            align: 'center',
            label: this.selected_local.quantity,
            field: 'quantity',
            sortable: true,
          },
          {
            name: 'price',
            align: 'center',
            label: this.selected_local.unitprice,
            field: 'price',
            sortable: true,
          },
        ];
      },
    },
  });
</script>
