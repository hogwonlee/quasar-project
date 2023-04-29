<template>
  <div>
    <div :v-model="is_addr_added">
      <q-card
        class="my-card"
        :class="addr.is_default ? 'bg-info' : 'bg-grey-3'"
        v-for="addr in addressList"
        :key="addr.address_id"
        v-bind="addr"
      >
        <div class="q-ma-xs">
          <q-card-section>
            <div class="absolute-top-right q-gutter-sm q-pt-md q-pr-sm">
              <q-btn
                color="primary"
                :label="selected_local.changeaddrinfo"
                @click="confirm_change_address_info(addr.address_tag, addr)"
              ></q-btn>

              <q-btn
                v-if="!addr.is_default"
                color="negative"
                :label="selected_local.del"
                @click="confirm_delete(addr.address_tag, addr.address_id)"
              ></q-btn>
            </div>
            <q-radio
              v-if="addr.is_default"
              v-model="shape"
              :val="check_default_address(addr)"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              :label="selected_local.defaultaddr"
            />
            <q-btn
              v-if="!addr.is_default"
              color="primary"
              :label="selected_local.changedefaultaddr"
              @click="confirm_change_default(addr.address_tag, addr.address_id)"
            ></q-btn>
            <!-- <div class="text-h6">배송지 이름: {{ addr.address_tag }}</div> -->
            <!-- <div class="text-subtitle2">수령인: {{ addr.recipient }}</div> -->
            <!-- <div class="text-h6">배송지 ID: {{ addr.address_id }}</div> -->
            <!-- <q-input
              label="배송지 이름: "
              readonly
              v-model:model-value="addr.address_tag"
            >
            </q-input> -->
            <div class="row">
              <q-input
                class="col-md-3 col-sm-6 col-xs-6"
                :label="selected_local.addrname"
                readonly
                :model-value="addr.address_tag"
              >
              </q-input>
              <q-input
                class="col-md-3 col-sm-6 col-xs-6"
                :label="selected_local.recipient"
                readonly
                :model-value="addr.recipient"
              >
              </q-input>
              <q-input
                class="col-md-3 col-sm-6 col-xs-6"
                :label="selected_local.tel"
                readonly
                :model-value="addr.recipient_phone"
                mask="(###)####-####"
              >
              </q-input>
              <q-input
                class="col-md-3 col-sm-6 col-xs-6"
                :label="selected_local.postcode"
                readonly
                :model-value="addr.post_code"
                mask="###-##"
              >
              </q-input>
              <q-input
                class="col-md-9 col-sm-12 col-xs-12"
                :label="selected_local.addr"
                readonly
                :model-value="
                  addr.address1 + ' ' + addr.address2 + ' ' + addr.address3
                "
              >
              </q-input>
            </div>
            <!-- <div class="text-subtitle2">우편번호: {{ addr.post_code }}</div>
            <div class="text-subtitle2">
              주소:
              {{ addr.address1 + ' ' + addr.address2 + ' ' + addr.address3 }}
            </div> -->
            <!-- <div class="text-subtitle2">기본 배송지: {{ addr.is_default }}</div> -->
            <!-- <q-separator color="primary"></q-separator> -->
          </q-card-section>
        </div>
      </q-card>
      <div class="q-py-sm row">
        <q-btn
          icon="add"
          color="primary"
          class="col-12"
          :label="selected_local.registernewaddr"
          @click="register = true"
        ></q-btn>
      </div>
      <q-dialog v-model="register">
        <AddressRegister />
      </q-dialog>
      <q-dialog v-model="changeAddress">
        <AddressInfoChange v-bind="this.change_addr" />
      </q-dialog>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapActions, mapState} from 'vuex';
  import {ref} from 'vue';
  import {Cookies, useQuasar} from 'quasar';
  import validation from 'src/util/data/validation';
  import AddressRegister from './AddressRegister.vue';
  import AddressInfoChange from './AddressInfoChange.vue';

  export default defineComponent({
    name: 'AddressList',
    data: function () {
      return {
        is_addr_added: ref(false),
        register: ref(false),
        changeAddress: ref(false),
        change_addr: {},
      };
    },
    components: {AddressRegister, AddressInfoChange},
    computed: {
      ...mapState({
        user: state => state.user.USER,
        addressList: state => state.address.items,
        address_status: state => state.address.status,
        selected_local: state => state.ui_local.status,
      }),
    },
    watch: {},
    created() {},
    mounted() {
      this.reload_addr_info();
    },
    methods: {
      reload_addr_info() {
        if (
          !validation.isNull(this.user.USER_ID) &&
          !validation.isNull(this.address_status)
        ) {
          axios({
            url: 'http://localhost:3001/addressInfo',
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
              this.$store.dispatch('address/emptyAddressAction');

              // address.dispatch('emptyAddressAction');
              res.data.results.forEach(addr => {
                // console.log('주소 조회 => 수령인 확인: ' + addr.recipient);
                if (addr.address_active === 1) {
                  // console.log('주소 활성화 확인: ' + addr.address_active);
                  this.$store.dispatch('address/addAddressAction', addr);

                  // address.dispatch('addAddressAction', addr);
                }
              });
              this.is_addr_added = true;
              this.$store.dispatch('address/setStatusAction', null);

              // address.dispatch('setStatusAction', null);
              // console.log(address.state.status);
            })
            .catch(res => {
              console.log('에러:' + res); // 회원 가입 후 주소 등록하지 않으면 여기서 요청 오류가 남.
            });
        }
      },
      check_default_address(addr) {
        if (addr.is_default == 1) {
          return 'line';
        } else {
          return '';
        }
      },
      change_default_address(address_id) {
        axios({
          url: 'http://localhost:3001/addressChangeDefaultAddress',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: {user_id: this.user.USER_ID, address_id: address_id},
        })
          .then(res => {
            this.$store.dispatch('address/emptyAddressAction');
            // address.dispatch('emptyAddressAction');
            res.data.results.forEach(addr => {
              // console.log('수령인 확인: ' + addr.recipient);
              if (addr.address_active == 1) {
                this.$store.dispatch('address/addAddressAction', addr);
                // address.dispatch('addAddressAction', addr);
              }
            });
          })
          .catch(res => {
            console.log('에러:' + res);
          });
      },
      delete_address(address_id) {
        axios({
          url: 'http://localhost:3001/deleteAddress',
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: {user_id: this.user.USER_ID, address_id: address_id},
        })
          .then(res => {
            console.log(JSON.stringify(res));
            var deleteIndex = this.addressList.findIndex(
              ele => ele.address_id === address_id,
            );
            console.log('찾은 주소 배열 인덱스 값: ' + deleteIndex);
            this.$store.dispatch('address/deleteAddressAction', deleteIndex);

            // address.dispatch('deleteAddressAction', deleteIndex);
          })
          .catch(res => {
            console.log('에러:' + res);
          });
      },
    },
    setup() {
      const $q = useQuasar();
      function confirm_change_default(address_tag, address_id) {
        $q.dialog({
          title: this.selected_local.confirm,
          message:
            this.selected_local.confirmchangedefault + '(' + address_tag + ')',
          cancel: true,
          persistent: false,
        }).onOk(() => {
          this.change_default_address(address_id);
        });
      }
      function confirm_change_address_info(address_tag, addr) {
        $q.dialog({
          title: this.selected_local.confirm,
          message:
            this.selected_local.confirmchangeaddrinfo + '(' + address_tag + ')',
          cancel: true,
          persistent: false,
        }).onOk(() => {
          this.change_addr = addr;
          this.changeAddress = true;
          // console.log(address_id);
          // this.change_address_info(address_id); //미구현
        });
      }
      function confirm_delete(address_tag, address_id) {
        $q.dialog({
          title: this.selected_local.confirm,
          message:
            this.selected_local.confirmdeleteaddr + '(' + address_tag + ')',
          cancel: true,
          persistent: false,
        }).onOk(() => {
          this.delete_address(address_id);
        });
      }
      return {
        confirm_delete,
        confirm_change_default,
        confirm_change_address_info,
        shape: ref('line'),
        checkPasswordDialog: ref(false),
      };
    },
  });
</script>
