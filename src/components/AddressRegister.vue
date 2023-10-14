<template>
  <div>
    <q-card class="bg-white">
      <q-card-section class="row items-center q-pa-none">
        <div class="q-pl-sm text-h6 text-bold">
          {{ selected_local.registernewaddr }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <!-- <h4 class="row justify-center">주소 등록</h4> -->

      <q-input
        outlined
        v-model="recipient"
        class="q-ma-sm"
        :label="selected_local.recipient"
        lazy-rules
        :rules="[
          val =>
            (!!val && val.length <= 20) || '请输入收件人姓名（小于20字节）',
        ]"
      ></q-input>

      <q-input
        outlined
        class="q-ma-sm"
        v-model="recipient_phone"
        :label="selected_local.recipientphone"
        :hint="selected_local.telhint"
        type="tel"
        mask="(###)####-####"
        lazy-rules
        :rules="[
          val =>
            (!!val && val.length >= 13 && val.length <= 15) ||
            selected_local.telhint,
        ]"
      ></q-input>

      <div class="row">
        <q-btn
          class="q-ma-sm col"
          color="primary"
          :label="selected_local.postcoderegister"
          @click="addr_search_api_card = !addr_search_api_card"
        />

        <q-input
          v-model="post_code"
          filled
          class="q-ma-sm col"
          for="daum_postCode"
          :placeholder="selected_local.postcodeandhint"
          readonly
          disable
        />
      </div>
      <q-card-section class="bg-teal-2" v-show="addr_search_api_card">
        <q-toolbar class="bg-teal text-white rounded-borders">
          <q-btn
            round
            dense
            flat
            icon="arrow_back"
            class="q-mr-xs"
            @click="addr_search_api_card = !addr_search_api_card"
          />
          <q-input
            dense
            label="주소 검색"
            style="width: 100%"
            v-model="keyword"
          >
            <template v-slot:append>
              <q-icon
                v-if="keyword !== ''"
                name="close"
                @click="keyword = ''"
                class="cursor-pointer"
              />
              <q-btn
                icon="search"
                round
                @click="search_addr_api(keyword, this.$store)"
              ></q-btn>
            </template>
          </q-input>
        </q-toolbar>
        <q-table
          :rows="api_addr"
          row-key="roadAddrPart1"
          grid
          hide-header
          hide-no-data
          selection="single"
          v-model:selected="selected"
        >
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
              <q-card flat bordered>
                <q-card-section class="text-center row justify-start">
                  <q-checkbox
                    v-model="props.selected"
                    :label="props.row.zipNo"
                  />
                  <div class="text-subtitle2">
                    {{
                      props.row.roadAddrPart1 + ' ' + props.row.roadAddrPart2
                    }}
                  </div>
                  <div class="text-caption">{{ props.row.jibunAddr }}</div>
                </q-card-section>
              </q-card>
            </div>
          </template>
        </q-table>
        <q-card-section v-show="api_addr.length <= 0">
          * 검색어 예: 도로명(반포대로 (空格)58), 건물명(독립기념관),
          지번(삼성동 (空格)25)
        </q-card-section>
      </q-card-section>

      <!-- <q-card
        id="wrap"
        v-show="addr_search"
        class="z-top bg-primary relative-position"
      >
        <q-card-section class="row items-center q-pa-none">
          <div class="q-ma-md text-h6 text-bold">주소 검색</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="foldDaumPostcode()" />
        </q-card-section>
      </q-card> -->
      <q-input
        :v-model="address1"
        filled
        class="q-ma-sm"
        for="daum_addr"
        :placeholder="selected_local.addrandhint"
        readonly
        disable
      />

      <q-input
        v-model="address2"
        filled
        class="q-ma-sm"
        for="daum_extraAddr"
        readonly
        disable
        :placeholder="selected_local.addrdetailandhint"
      />

      <q-input
        outlined
        v-model="address3"
        class="q-ma-sm"
        for="daum_detailAddress"
        :label="selected_local.addrextraandhint"
        lazy-rules
        :rules="[val => !!val || '请输入附加信息']"
      />
      <q-input
        outlined
        class="q-ma-sm"
        v-model="address_tag"
        :label="selected_local.addrtagandhint"
        lazy-rules
        :rules="[
          val => (!!val && val.length <= 20) || '请输入任意代称（小于20字节）',
        ]"
      ></q-input>
      <div class="row">
        <q-checkbox
          class="q-ma-sm col"
          left-label
          v-model="cheked"
          :label="selected_local.defaultaddr"
        />
        <q-btn
          class="q-ma-sm col"
          color="primary"
          size="md"
          style="width: 200px"
          :label="selected_local.addrresister"
          :disable="
            address_tag == '' ||
            recipient == '' ||
            recipient_phone == '' ||
            recipient_phone.length < 13 ||
            selected == ''
          "
          @click="exeAddrRegister"
          v-close-popup
        />
      </div>
    </q-card>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';
  import {mapActions, mapMutations, mapState} from 'vuex';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import configs from '/src/configs';
  import {Dialog} from 'quasar';
  // import https from 'https';

  export default defineComponent({
    name: 'AddressRegister',
    data() {
      return {
        recipient: '',
        recipient_phone: '',
        address_tag: '',
        post_code: '',
        address1: '',
        address2: '',
        address3: '',
        keyword: '',
        cheked: ref(true),
        addr_search_api_card: ref(false),
      };
    },
    setup() {
      return {
        selected: ref([]),
      };
    },
    computed: {
      ...mapState({
        user: state => state.user.USER,
        api_addr: state => state.api_addr.api_address,
        selected_local: state => state.ui_local.status,
      }),
    },
    watch: {
      selected: function (new_a) {
        if (new_a != '') {
          Dialog.create({
            title: '배송지 선택',
            message: '이 배송지가 맞습니까?',
            cancel: true,
            persistent: true,
          })
            .onOk(data => {
              console.log('data? ' + data);
              document.getElementById('daum_postCode').value = new_a[0].zipNo;
              document.getElementById('daum_addr').value =
                new_a[0].roadAddrPart1;
              document.getElementById('daum_extraAddr').value =
                new_a[0].roadAddrPart2;
              this.$store.dispatch('api_addr/emptyAddressAction');
              this.keyword = '';
              this.addr_search_api_card = false;
              // console.log('>>>> OK, received', data)
            })
            .onCancel(() => {
              // console.log('>>>> Cancel')
            });
        }
      },
    },
    methods: {
      /// @brief 주소검색창 - 특수문자 제거

      checkSearchedWord(obj) {
        if (obj.length > 0) {
          // 특수문자 제거
          var expText = /[%=><]/;
          if (expText.test(obj.value) == true) {
            alert.confirm('오류', '특수문자를 입력 할수 없습니다.');
            obj.value = obj.value.split(expText).join('');
            return false;
          }
          // 특정문자열(sql예약어의 앞뒤공백포함) 제거
          var sqlArray = new Array(
            'OR',
            'SELECT',
            'INSERT',
            'DELETE',
            'UPDATE',
            'CREATE',
            'DROP',
            'EXEC',
            'UNION',
            'FETCH',
            'DECLARE',
            'TRUNCATE',
          );
          // sql 예약어
          var regex = '';
          for (var num = 0; num < sqlArray.length; num++) {
            regex = new RegExp(sqlArray[num], 'gi');
            if (regex.test(obj.value)) {
              alert.confirm(
                '오류',
                '"' +
                  sqlArray[num] +
                  '"와(과) 같은 특정문자로 검색할 수 없습니다.',
              );
              obj.value = obj.value.replace(regex, '');
              return false;
            }
          }
        }
        return true;
      },

      search_addr_api(text, store) {
        // 적용예 (api 호출 전에 검색어 체크)
        if (!this.checkSearchedWord(text)) {
          return;
        }

        jQuery.ajax({
          url: 'https://business.juso.go.kr/addrlink/addrLinkApiJsonp.do',
          type: 'POST',
          data: {
            confmKey: 'U01TX0FVVEgyMDIzMDgwOTEyNTE0NzExNDAwMTg=',
            currentPage: 1,
            countPerPage: 5,
            keyword: text,
            resultType: 'json',
          },
          dataType: 'jsonp',
          crossDomain: true,
          success: function (jsonStr) {
            let errCode = jsonStr.results.common.errorCode;
            let errDesc = jsonStr.results.common.errorMessage;
            if (errCode == '0') {
              if (jsonStr != null) {
                if (jsonStr.results.common.totalCount > 0) {
                  store.dispatch('api_addr/emptyAddressAction');
                  jsonStr.results.juso.forEach(addr => {
                    store.dispatch('api_addr/loadAddressAction', addr);
                  });
                } else {
                  console.log('조회된 데이터가 없습니다.');
                }
              }
            } else {
              alert.confirm('요청성공Error:', errDesc);
            }
          },
          error: function (xhr, status, error) {
            alert.confirm('요청실패Error: ' + '에러발생');
          },
        });
      },

      exeAddrRegister() {
        if (this.user.USER_ID != '') {
          const addressData = {
            address_tag: this.address_tag,
            recipient: this.recipient,
            recipient_phone: this.recipient_phone,
            post_code: document.getElementById('daum_postCode').value,
            address1: document.getElementById('daum_addr').value,
            address2: document.getElementById('daum_extraAddr').value,
            address3: this.address3,
            user_id: this.user.USER_ID,
            is_default: this.cheked,
          };

          // 배송지 등록 요청 보내기
          axios({
            url: `${configs.server}/addressRegister`,
            method: 'POST',
            // httpsAgent: new https.Agent({
            //              rejectUnauthorized: false,
            //            }),
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: this.user.USER_TOKEN,
            },
            data: addressData,
          })
            .then(res => {
              if (res.status == 200) {
                this.reload_addr_info();
                alert.confirm(
                  this.selected_local.notice,
                  this.selected_local.addrresistersuccess,
                );
              } else {
                alert.confirm(
                  this.selected_local.err,
                  this.selected_local.err + ': ' + res.data.content,
                );
              }
            })
            .catch(res => console.log('에러: ' + res));
        } else {
          alert.confirm(
            this.selected_local.notice,
            this.selected_local.needloginfirst,
          );
        }
      },
      reload_addr_info() {
        axios({
          url: `${configs.server}/addressInfo`,
          method: 'POST',
          // httpsAgent: new https.Agent({
          //            rejectUnauthorized: false,
          //          }),
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
      },
    },
  });
</script>
