<template>
  <div class="bg-secondary">
    <div>
      <!-- <h4 class="row justify-center">주소 등록</h4> -->
      <div class="row">
        <q-input
          v-model="post_code_edit"
          filled
          class="q-ma-sm col"
          for="daum_postCode"
          placeholder="우편번호 (안내: 주소 선택하면 자동으로 등록)"
          readonly
          disable
        />
        <q-btn
          class="q-ma-sm col"
          color="primary"
          label="우편번호 찾기"
          @click="sample2_execDaumPostcode"
        />
      </div>
      <q-input
        v-model="address1_edit"
        filled
        class="q-ma-sm"
        for="daum_addr"
        placeholder="주소 (안내: 주소 선택하면 자동으로 등록)"
        readonly
        disable
      />

      <q-input
        v-model="address2_edit"
        filled
        class="q-ma-sm"
        for="daum_extraAddr"
        readonly
        disable
        placeholder="상세주소 (안내: 주소 선택하면 자동으로 등록)"
      />

      <q-input
        outlined
        v-model="address3_edit"
        class="q-ma-sm"
        for="daum_detailAddress"
        label="추가 항목 (안내: 301호/204호 또는 공동현관 비밀번호)"
      />

      <q-input
        outlined
        class="q-ma-sm"
        v-model="address_tag_edit"
        label="주소별칭 (안내: 집/회사 등과 같은 별칭)"
      ></q-input>
      <q-input
        outlined
        v-model="recipient_edit"
        class="q-ma-sm"
        label="수령인 (안내: 받는 사람 이름)"
      ></q-input>

      <q-input
        outlined
        class="q-ma-sm"
        v-model="recipient_phone_edit"
        label="수령인 전화번호 (안내: 받는 사람 전화번호)"
      ></q-input>

      <div align="right">
        <q-btn
          class="q-ma-sm"
          color="primary"
          size="lg"
          style="width: 200px"
          label="주소 정보 변경하기"
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
      address_id: {
        type: String,
        default: '',
      },
    },
    computed: {
      ...mapState({
        user: state => state.user.USER,
      }),
    },
    mounted() {
      this.onReset();
      // this.sample2_execDaumPostcode();
    },

    methods: {
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
            address_id: this.address_id,
            user_id: this.user.USER_ID,
          };

          // 배송지 등록 요청 보내기
          axios({
            url: 'http://localhost:3001/addressInfoChange',
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: this.user.USER_TOKEN,
            },

            data: addressData,
          })
            .then(res => {
              console.log(res.data.results);
              this.$store.dispatch('address/updateAddressAction', addressData);
              alert.confirm('알림', '주소 변경 완료했습니다.');
            })
            .catch(res => console.log('에러: ' + res));
        } else {
          alert('로그인이 필요합니다.');
        }
      },

      sample2_execDaumPostcode() {
        new daum.Postcode({
          oncomplete: function (data) {
            // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var addr = ''; // 주소 변수
            var extraAddr = ''; // 참고항목 변수

            //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') {
              // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
            } else {
              // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
            }

            // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
            if (data.userSelectedType === 'R') {
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if (data.buildingName !== '' && data.apartment === 'Y') {
                extraAddr +=
                  extraAddr !== ''
                    ? ', ' + data.buildingName
                    : data.buildingName;
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if (extraAddr !== '') {
                extraAddr = ' (' + extraAddr + ')';
              }
              document.getElementById('daum_extraAddr').value = extraAddr;
            } else {
              document.getElementById('daum_extraAddr').value = '';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('daum_addr').value = addr;
            document.getElementById('daum_postCode').value = data.zonecode;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById('daum_detailAddress').focus();
          },
        }).open();
      },
      onReset() {
        this.post_code_edit = this.post_code;
        this.address1_edit = this.address1;
        this.address2_edit = this.address2;
        this.address3_edit = this.address3;
        this.address_tag_edit = this.address_tag;
        this.recipient_edit = this.recipient;
        this.recipient_phone_edit = this.recipient_phone;
      },
    },
  });
</script>
