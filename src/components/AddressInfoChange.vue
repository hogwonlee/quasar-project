<template>
  <div class="bg-white">
    <div>
      <q-card-section class="row items-center q-pa-none">
        <div class="q-pl-sm text-h6 text-bold">
          {{ selected_local.changeaddrinfo }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <!-- <h4 class="row justify-center">주소 등록</h4> -->

      <q-input
        standout
        dense
        outlined
        v-model="recipient_edit"
        class="q-ma-sm"
        :label="selected_local.recipient"
        :hint="selected_local.recipienthint"
        lazy-rules
        :rules="[
          val =>
            (!!val && val.length <= 20) || '请输入收件人姓名（小于20字节）',
        ]"
      ></q-input>

      <q-input
        standout
        dense
        outlined
        class="q-ma-sm"
        v-model="recipient_phone_edit"
        mask="(###)####-####"
        :label="selected_local.recipientphone"
        :hint="selected_local.telhint"
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
          color="positive"
          outline
          :label="selected_local.postcoderegister"
          @click="addr_search_api_card = !addr_search_api_card"
        />
        <q-input
          standout
          dense
          v-model="post_code_edit"
          filled
          class="q-ma-sm col"
          for="daum_postCode"
          :placeholder="selected_local.postcodeandhint"
          readonly
          disable
        />
      </div>
      <q-card-section v-show="addr_search_api_card">
        <q-toolbar class="text-white rounded-borders">
          <q-btn
            round
            standout
            dense
            flat
            icon="arrow_back"
            color="positive"
            class="q-mr-xs"
            @click="addr_search_api_card = !addr_search_api_card"
          />
          <q-input
            standout
            dense
            :label="selected_local.search_addr"
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
                    color="positive"
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
          * 关键词示例：도로명(반포대로 (空格)58), 건물명(독립기념관),
          지번(삼성동 (空格)25)
        </q-card-section>
      </q-card-section>
      <q-input
        standout
        dense
        v-model="address1_edit"
        filled
        class="q-ma-sm"
        for="daum_addr"
        :placeholder="selected_local.addrandhint"
        readonly
        disable
      />

      <q-input
        standout
        dense
        v-model="address2_edit"
        filled
        class="q-ma-sm"
        for="daum_extraAddr"
        readonly
        disable
        :placeholder="selected_local.addrdetailandhint"
      />

      <q-input
        standout
        dense
        outlined
        v-model="address3_edit"
        class="q-ma-sm"
        for="daum_detailAddress"
        :label="selected_local.addrextra"
        :hint="selected_local.addrextraandhint"
        lazy-rules
        :rules="[val => !!val || '请输入附加信息']"
      />
      <q-input
        standout
        dense
        outlined
        class="q-ma-sm"
        v-model="address_tag_edit"
        :label="selected_local.addrtag"
        :hint="selected_local.addrtagandhint"
        lazy-rules
        :rules="[
          val => (!!val && val.length <= 20) || '请输入任意代称（小于20字节）',
        ]"
      ></q-input>
      <div class="row q-ma-sm q-py-none">
        <q-radio
          class="col-6"
          color="positive"
          v-model="doorScretKey"
          val="free"
          :label="selected_local.gate_free"
        />
        <q-radio
          class="col-6"
          color="positive"
          v-model="doorScretKey"
          val="password"
          :label="selected_local.gate_password"
        />

        <q-input
          standout
          dense
          style="width: 100%"
          :disable="doorScretKey == 'password' ? false : true"
          outlined
          v-model="outdoorpassword_edit"
          :label="selected_local.gate_password"
          :hint="selected_local.outdoorpasswordhint"
          lazy-rules
          :rules="[val => !!val || '请输入附加信息']"
        />
        <q-btn
          class="q-ma-sm col-12"
          color="positive"
          outline
          size="md"
          style="width: 200px"
          :label="selected_local.changeaddrinfo"
          @click="exeAddrInfoChange"
          v-close-popup
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';
  import {mapActions, mapMutations, mapState} from 'vuex';
  import axios from 'axios';
  import alert from 'src/util/modules/alert';
  import configs from 'src/configs/';
  import {Dialog} from 'quasar';

  export default defineComponent({
    name: 'AddressRegister',
    data() {
      return {
        post_code_edit: '',
        address1_edit: '',
        address2_edit: '',
        address3_edit: '',
        address_tag_edit: '',
        recipient_edit: '',
        recipient_phone_edit: '',
        cheked: ref(true),
        addr_search_api_card: ref(false),
        keyword: '',
        outdoorpassword_edit: '',
        doorScretKey: 'password',
      };
    },
    setup() {
      return {
        selected: ref([]),
      };
    },
    props: {
      recipient: {
        type: String,
        default: '',
      },
      recipient_phone: {
        type: String,
        default: '',
      },
      address_tag: {
        type: String,
        default: '',
      },
      post_code: {
        type: String,
        default: '',
      },
      address1: {
        type: String,
        default: '',
      },
      address2: {
        type: String,
        default: '',
      },
      address3: {
        type: String,
        default: '',
      },
      outdoorpassword: {
        type: String,
        default: '',
      },
      address_id: {
        type: String,
        default: '',
      },
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
    computed: {
      ...mapState({
        user: state => state.user.USER,
        api_addr: state => state.api_addr.api_address,
        selected_local: state => state.ui_local.status,
      }),
    },
    mounted() {
      this.onReset();
    },

    methods: {
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
          url: 'https://www.juso.go.kr/addrlink/addrLinkApiJsonp.do',
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
      exeAddrInfoChange() {
        if (this.user.USER_ID != '') {
          const addressData = {
            address_tag: this.address_tag_edit,
            recipient: this.recipient_edit,
            recipient_phone: this.recipient_phone_edit,
            post_code: document.getElementById('daum_postCode').value,
            address1: document.getElementById('daum_addr').value,
            address2: document.getElementById('daum_extraAddr').value,
            address3: this.address3_edit,
            gate_password:
              this.doorScretKey == 'free' ? '' : this.outdoorpassword_edit,
            address_id: this.address_id,
            user_id: this.user.USER_ID,
          };

          // 배송지 등록 요청 보내기
          axios({
            url: `${configs.server}/addressInfoChange`,
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
                // console.log(res.data.results);
                this.$store.dispatch(
                  'address/updateAddressAction',
                  addressData,
                );
                alert.confirm(
                  this.selected_local.notice,
                  this.selected_local.addrchangesuccess,
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
      onReset() {
        this.post_code_edit = this.post_code;
        this.address1_edit = this.address1;
        this.address2_edit = this.address2;
        this.address3_edit = this.address3;
        this.outdoorpassword_edit = this.outdoorpassword;
        this.doorScretKey = this.outdoorpassword == '' ? 'free' : 'password';
        this.address_tag_edit = this.address_tag;
        this.recipient_edit = this.recipient;
        this.recipient_phone_edit = this.recipient_phone;
      },
    },
  });
</script>
