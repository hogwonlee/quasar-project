<template>
  <div>
    <div class="column">
      <div class="row">
        <p class="text-h1">
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? '中国食品APP下载-챠챠'
              : '중국식품App설치-챠챠'
          }}
        </p>
        <p class="text-body1">
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? '点击下载，安装‘챠챠’中国食品APP，从此轻松在家购买麻辣烫、干豆腐、水饺。'
              : '자신의 폰 환경에 맞춰 아래 버튼을 클릭하여 챠챠 앱을 설치해주세요. 이제부터는 중국식품을 집에서 편하게 주문하고 배달받으세요!'
          }}
        </p>
      </div>
      <div class="row">
        <q-img src="icon-512.png" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <a
          href="https://play.google.com/store/apps/details?id=com.cfomarket.mobileapp&pcampaignid=web_share"
          >{{
            selected_local.chinafood == '洽洽中国食品'
              ? '安卓下载'
              : '안드로이드 설치'
          }}</a
        >
      </div>
      <div class="col">
        <a
          href="https://apps.apple.com/kr/app/%EC%B1%A0%EC%B1%A0/id6744727789"
          >{{
            selected_local.chinafood == '洽洽中国食品'
              ? '苹果下载'
              : '아이폰 설치'
          }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    name: 'DownloadLink',
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
    setup() {
      return {
        androidDownLink: ref(''),
        iphoneDownLink: ref(''),
      };
    },
  };
</script>
