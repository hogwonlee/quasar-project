<template>
  <div class="window-width row justify-center items-center">
    <div style="width: 600px">
      <h4 class="row justify-center">주소 등록</h4>
      <q-checkbox
        class="q-ma-sm"
        left-label
        v-model="cheked"
        label="기본 배송지"
      />
      <q-input
        outlined
        class="q-ma-sm"
        v-model="address_tag"
        label="주소별칭 (안내: 집/회사 등과 같은 별칭)"
      ></q-input>
      <q-input
        outlined
        v-model="recipient"
        class="q-ma-sm"
        label="수령인 (안내: 받는 사람 이름)"
      ></q-input>

      <q-input
        outlined
        class="q-ma-sm"
        v-model="recipient_phone"
        label="수령인 전화번호 (안내: 받는 사람 전화번호)"
      ></q-input>
      <q-input
        v-model="post_code"
        filled
        class="q-ma-sm"
        for="daum_postCode"
        placeholder="우편번호 (안내: 주소 선택하면 자동으로 등록)"
        readonly
        disable
      />

      <q-input
        v-model="address1"
        filled
        class="q-ma-sm"
        for="daum_addr"
        placeholder="주소 (안내: 주소 선택하면 자동으로 등록)"
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
        placeholder="상세주소 (안내: 주소 선택하면 자동으로 등록)"
      />

      <q-input
        outlined
        v-model="address3"
        class="q-ma-sm"
        for="daum_detailAddress"
        label="추가 항목 (안내: 301호/204호 등과 같은 추가 내용)"
      />

      <q-btn
        class="q-ma-sm row justify-center"
        color="primary"
        size="xl"
        style="width: 200px"
        label="주소 등록하기"
        @click="exeAddrRegister"
      />
      <q-btn
        class="q-ma-sm row justify-center"
        color="primary"
        size="xl"
        style="width: 200px"
        label="주소 다시 불러오기"
        @click="sample2_execDaumPostcode"
      />
    </div>
  </div>
</template>

<script>
  import {defineComponent} from 'vue';
  import {ref} from 'vue';
  import {mapActions, mapMutations, mapState} from 'vuex';
  import user from '../store/user/userInfo';
  import axios from 'axios';
  import address from 'src/store/user/addressInfo';

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
        cheked: ref(true),
      };
    },
    computed: {
      ...mapState({
        user: state => state.all,
      }),
    },
    mounted() {
      this.sample2_execDaumPostcode();
    },
    methods: {
      exeAddrRegister() {
        if (user.state.USER_ID != '') {
          const addressData = {
            address_tag: this.address_tag,
            recipient: this.recipient,
            recipient_phone: this.recipient_phone,
            post_code: document.getElementById('daum_postCode').value,
            address1: document.getElementById('daum_addr').value,
            address2: document.getElementById('daum_extraAddr').value,
            address3: this.address3,
            user_id: user.state.USER_ID,
            is_default: this.cheked,
          };

          //회원가입 등록 요청 보내기
          axios({
            url: 'http://localhost:3001/addressRegister',
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
              authorization: user.state.USER_TOKEN,
            },

            data: addressData,
          })
            .then(res => {
              console.log(
                '주소 등록 응답값: ' + JSON.stringify(res.data.results),
              );
              // address.dispatch('addAddressAction', res.data.results);
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
    },
  });
</script>
