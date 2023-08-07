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
        class="q-ma-sm"
        v-model="address_tag"
        :label="selected_local.addrtagandhint"
        lazy-rules
        :rules="[
          val => (!!val && val.length <= 20) || '请输入任意代称（小于20字节）',
        ]"
      ></q-input>
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
      <q-card-section v-show="addr_search_api_card">
        <div class="q-pl-sm text-h6 text-bold">주소 검색 API</div>
        <q-input label="주소입력" v-model="keyword">
          <template v-slot:append>
            <q-icon
              v-if="text !== ''"
              name="close"
              @click="text = ''"
              class="cursor-pointer"
            />
            <q-btn
              icon="search"
              round
              @click="search_addr_api(keyword)"
            ></q-btn>
          </template>
        </q-input>
        <!-- <q-table :rows="api_addr" row-key="zipNo"> </q-table> -->
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
            address_tag.value == null ||
            recipient.value == null ||
            recipient_phone.value == null ||
            (recipient_phone.length >= 13 && recipient_phone.length <= 15) ||
            post_code.value == null ||
            address1.value == null ||
            address2.value == null ||
            address3.value == null
          "
          @click="exeAddrRegister"
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
    setup() {},
    computed: {
      ...mapState({
        user: state => state.user.USER,
        api_addr: state => state.api_addr.address,
        selected_local: state => state.ui_local.status,
      }),
    },
    // watch: {
    //   addr_search: function (new_a, old_a) {
    //     console.log('전: ' + old_a + ', 후: ' + new_a);
    //   },
    // },
    methods: {
      /// @brief 주소검색창 - 특수문자 제거

      checkSearchedWord(obj) {
        console.log(obj);
        if (obj.length > 0) {
          // 특수문자 제거

          var expText = /[%=><]/;

          if (expText.test(obj.value) == true) {
            alert('특수문자를 입력 할수 없습니다.');

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
              alert(
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

      search_addr_api(text) {
        // 적용예 (api 호출 전에 검색어 체크)
        if (!this.checkSearchedWord(text)) {
          return;
        }
        axios({
          url: 'https://business.juso.go.kr/addrlink/addrLinkApi.do',
          method: 'POST',
          data: {
            confmKey: 'devU01TX0FVVEgyMDIzMDgwNzE0MDMyOTExMzk5NTI=',
            currentPage: 1,
            countPerPage: 5,
            keyword: text,
            resultType: 'json',
          },
        })
          .then(res => {
            let errCode = res.results.common.errorCode;

            let errDesc = res.results.common.errorMessage;

            if (errCode == '0') {
              if (res != null) {
                this.load_addr(res);
              }
            } else {
              alert.confirm('Error', errDesc);
            }
            console.log('api_addr: ' + JSON.parse(this.api_addr));
          })
          .catch(err => {
            console.log('Addr_API_Error: ' + err);
          });
      },
      load_addr(juso) {
        if (juso.results.common.totalCount > 0) {
          this.$store.dispatch('api_addr/emptyAddressAction');
          juso.results.juso.forEach(addr => {
            this.$store.dispatch('api_addr/loadAddressAction', addr);
          });
        } else {
          console.log('조회된 데이터가 없습니다.');
        }
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
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: this.user.USER_TOKEN,
            },

            data: addressData,
          })
            .then(res => {
              if (res.status == 200) {
                var insertAddress = addressData;
                insertAddress.address_id = res.data.results.insertId;
                this.$store.dispatch('address/addAddressAction', insertAddress);
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
    },
  });
</script>
