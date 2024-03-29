<template>
  <div class="bg-white">
    <q-card flat>
      <q-card-section class="row items-center q-pa-none">
        <div class="text-h6 text-bold">{{ selected_local.addr }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
    </q-card>
    <div class="q-ma-sm" :v-model="is_addr_added">
      <q-card class="transparent my-card q-gutter-xs" flat square outlined>
        <AddressInfo
          :class="addr.is_default ? 'bg-white' : 'bg-grey-5'"
          rounded
          v-for="addr in addressList"
          :key="addr.address_id"
          v-bind="addr"
          @send_change_addr="
            confirm_change_address_info(addr.address_tag, addr)
          "
          @send_delete="confirm_delete(addr.address_tag, addr.address_id)"
          @send_change_default="
            confirm_change_default(addr.address_tag, addr.address_id)
          "
        />
      </q-card>
      <q-btn
        icon="add"
        color="positive"
        outline
        style="width: 100%"
        :label="selected_local.registernewaddr"
        @click="register = true"
      ></q-btn>
    </div>
    <!-- <div v-else>배송 받을 주소지를 추가해주세요.</div> -->
    <q-dialog v-model="register">
      <AddressRegister />
    </q-dialog>
    <q-dialog v-model="changeAddress">
      <AddressInfoChange v-bind="this.change_addr" />
    </q-dialog>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import axios from 'axios';
  import {mapActions, mapState} from 'vuex';
  import {ref} from 'vue';
  import {Cookies, useQuasar} from 'quasar';
  import validation from 'src/util/data/validation';
  import alert from 'src/util/modules/alert';
  import AddressRegister from './AddressRegister.vue';
  import AddressInfoChange from './AddressInfoChange.vue';
  import AddressInfo from './AddressInfo.vue';
  import configs from '/src/configs';
  // import https from 'https';

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
    components: {
      AddressRegister,
      AddressInfoChange,
      AddressInfo,
    },
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
            url: `${configs.server}/addressInfo`,
            method: 'POST',
            // httpsAgent: new https.Agent({
            //   rejectUnauthorized: false,
            // }),
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
                this.$store.dispatch('address/emptyAddressAction');
                res.data.results.forEach(addr => {
                  if (addr.address_active === 1) {
                    this.$store.dispatch('address/addAddressAction', addr);
                  }
                });
                this.is_addr_added = true;
                this.$store.dispatch('address/setStatusAction', null);
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
      check_default_address(addr) {
        if (addr.is_default == 1) {
          return 'line';
        } else {
          return '';
        }
      },
      change_default_address(address_id) {
        axios({
          url: `${configs.server}/addressChangeDefaultAddress`,
          method: 'POST',
          // httpsAgent: new https.Agent({
          //   rejectUnauthorized: false,
          // }),
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: {user_id: this.user.USER_ID, address_id: address_id},
        })
          .then(res => {
            if (res.status == 200) {
              this.$store.dispatch('address/emptyAddressAction');
              // address.dispatch('emptyAddressAction');
              res.data.results.forEach(addr => {
                // console.log('수령인 확인: ' + addr.recipient);
                if (addr.address_active == 1) {
                  this.$store.dispatch('address/addAddressAction', addr);
                  // address.dispatch('addAddressAction', addr);
                }
              });
            } else {
              alert.confirm(
                this.selected_local.err,
                this.selected_local.err + ': ' + res.data.content,
              );
            }
          })
          .catch(res => {
            console.log('에러:' + res);
          });
      },
      delete_address(address_id) {
        axios({
          url: `${configs.server}/deleteAddress`,
          method: 'POST',
          // httpsAgent: new https.Agent({
          //            rejectUnauthorized: false,
          //          }),
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
            authorization: this.user.USER_TOKEN,
          },
          data: {user_id: this.user.USER_ID, address_id: address_id},
        })
          .then(res => {
            if (res.status == 200) {
              console.log(JSON.stringify(res));
              var deleteIndex = this.addressList.findIndex(
                ele => ele.address_id === address_id,
              );
              console.log('찾은 주소 배열 인덱스 값: ' + deleteIndex);
              this.$store.dispatch('address/deleteAddressAction', deleteIndex);
            } else {
              alert.confirm(
                this.selected_local.err,
                this.selected_local.err + ': ' + res.data.content,
              );
            }
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
        addr_option: ref(false),
      };
    },
  });
</script>
