<template>
  <q-page class="q-pa-md">
    <div class="col-12 text-h6 text-bold">
      {{ selected_local.deliver_info_title }}
    </div>
    <p>
      {{
        selected_local.chinafood == '洽洽中国食品'
          ? '在浏览器上打开以下链接，可以在NAVER上查询配送情况。'
          : '웹 브라우저에서 다음 링크를 접속하시면 네이버에서 배송 상황을 조회할 수 있습니다.'
      }}
      (
      <span class="url-text text-subtitle2"> {{ url_naver.slice(0, 30) }} </span
      >...)
    </p>
    <q-btn
      @click="copyToClipboard(url_naver)"
      class="text-bold q-ma-sm"
      color="positive"
      outline
      >{{
        selected_local.chinafood == '洽洽中国食品' ? '复制链接' : 'URL복사'
      }}</q-btn
    >

    <div>
      {{
        selected_local.chinafood == '洽洽中国食品'
          ? '*以发货日为准，一般情况下需要1~2天到货。若有库存不足情况发生，我们将尽量在3天内补充并联系您。'
          : '*일반적으로 1~2일 사이에 배송됩니다. 만약 재고부족으로 바로 배송이 안될 경우, 3일내에 배송하고 연락드리겠습니다.'
      }}
    </div>
    <div>
      {{
        selected_local.chinafood == '洽洽中国食品'
          ? '*如果，收件地址在富川地区内，当天下午3点之前的订单，当天送货。'
          : '*만약 택배수령지가 부천 시내라면, 당일 오후 3시전까지의 주문은 당일 배송해드립니다.'
      }}
    </div>
    <div v-if="order_count > 0">
      <q-card
        class="my-card"
        v-for="order in orderGroupList.slice().reverse()"
        :key="order.orderGroup_id"
        v-bind="order"
      >
        <div class="q-gutter-sm q-ma-xs">
          <q-card-section>
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
            </div>

            <div class="absolute-top-right q-pa-sm q-gutter-sm">
              <q-btn
                color="positive"
                outline
                :label="selected_local.tracedeliver"
                @click="
                  this.tracker_info(order.delivery_code, order.delivery_invoice)
                "
              ></q-btn>
              <q-btn
                color="positive"
                outline
                :label="selected_local.detailorder"
                @click="get_order_list(order.orderGroup_id)"
              ></q-btn>
              <q-btn
                color="positive"
                outline
                :label="selected_local.claim"
                @click="show_claim()"
              ></q-btn>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
    <!-- <div v-else>
      <div class="text-subtitle2 q-ml-md">
        {{ selected_local.deliver_info_text }}
      </div>
    </div> -->
    <q-separator />

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
      <SweetTrackerInfo
        v-bind:delivery_code="this.child_code"
        v-bind:delivery_invoice="this.child_invoice"
      />
    </q-dialog>
    <div v-if="user.USER_ID == 'master'" class="q-pa-md">
      <div class="col-12 text-h6 text-bold">주문리스트</div>
      <q-btn label="조회" @click="load_order_all()"></q-btn>
      <q-table
        :rows="all_order.slice().sort().reverse()"
        row-key="id"
        selection="single"
        v-model:selected="selected"
      />
      <q-table
        v-show="order_address.length > 0"
        :rows="order_address"
        row-key="address_id"
      />
      <q-table
        v-show="order_detail.length > 0"
        :rows="order_detail"
        row-key="product_id"
        selection="multiple"
        v-model:selected="multi_selected"
      />
    </div>
  </q-page>
</template>

<script>
  import SweetTrackerInfo from 'components/SweetTrackerInfo.vue';
  import {defineComponent, ref} from 'vue';
  import axios from 'axios';
  import {mapState, mapActions, mapGetters} from 'vuex';
  import validation from 'src/util/data/validation';
  import alert from 'src/util/modules/alert';
  import configs from '/src/configs';
  import {Notify} from 'quasar';

  export default defineComponent({
    name: 'DeliveryInfo',
    components: {
      SweetTrackerInfo,
    },
    data() {
      return {
        tracker: ref(false),
        search_order: ref(false),
        search_order_id: 0,
        child_code: '',
        child_invoice: '',
        res_order: [],
        columns: [],
        delivery_policy_vue: ref(false),
        delivery_policy_cn_vue: ref(false),
        exchange_policy_vue: ref(false),
        exchange_policy_cn_vue: ref(false),
        url_naver:
          'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%27%ED%83%9D%EB%B0%B0%EC%A1%B0%ED%9A%8C%27',
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
      if (!validation.isNull(this.user.USER_ID)) {
        this.load_order_info();
      }
    },

    watch: {
      selected: function (new_a) {
        this.load_order_detail(new_a[0].id);
        this.load_order_address(new_a[0].address_id);
      },
    },
    methods: {
      copyToClipboard(copyText) {
        try {
          navigator.clipboard.writeText(copyText);
          Notify.create({
            position: 'top',
            message:
              (this.selected_local.chinafood == '洽洽中国食品'
                ? '复制完成'
                : '복사완료') +
              ':(' +
              copyText.slice(0, 30) +
              ') ',
            color: 'green',
          });
          //alert('(' + name + ')' + amount + '개를 장바구니에 넣었습니다.');
        } catch (e) {
          console.log(e);
          throw e;
        }
      },
      load_order_info() {
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
      },
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
            name: 'tag',
            required: true,
            label: this.selected_local.productname,
            align: 'left',
            field: row => row.tag,
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
          // {
          //   name: 'bulk_buy',
          //   align: 'center',
          //   label: this.selected_local.product_bundle,
          //   field: 'bulk_buy',
          //   format: val =>
          //     val == 1
          //       ? this.selected_local.product_bundle
          //       : this.selected_local.product_unit,
          // },
          // {
          //   name: 'boxcapacity',
          //   align: 'center',
          //   label:
          //     this.selected_local.product_bundle + this.selected_local.quantity,
          //   field: 'boxcapacity',
          // },
        ];
      },
      load_order_all() {
        axios({
          url: `${configs.server}/orderGroup`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: {
            user_id: this.user.USER_ID,
          },
        })
          .then(res => {
            if (res.status == 200) {
              this.all_order = res.data.results;
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
      },
      load_order_detail(order_group) {
        // 최근 주문 리스트 읽어오기. 이 페이지가 로드될 때, 주문 내역이 변경되었을 때마다 새로 불러와야 함.  &&
        axios({
          url: `${configs.server}/orderDetail`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: {
            user_id: this.user.USER_ID,
            order_group_id: order_group,
          },
        })
          .then(res => {
            if (res.status == 200) {
              this.order_detail = res.data.results;
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
      },
      load_order_address(address_id) {
        // 최근 주문 리스트 읽어오기. 이 페이지가 로드될 때, 주문 내역이 변경되었을 때마다 새로 불러와야 함.  &&
        axios({
          url: `${configs.server}/orderAddressInfo`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: {
            user_id: this.user.USER_ID,
            address_id: address_id,
          },
        })
          .then(res => {
            if (res.status == 200) {
              this.order_address = res.data.results;
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
      },
    },
    setup() {
      return {
        selected: ref([]),
        multi_selected: ref([]),
        all_order: ref([]),
        order_detail: ref([]),
        order_address: ref([]),
      };
    },
  });
</script>
