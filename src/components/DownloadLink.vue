<template>
  <div>
    <div class="column">
      <div class="row">
        {{
          selected_local.chinafood == '洽洽中国食品'
            ? '欢迎光临！챠챠祝您好运连连！'
            : '안녕하세요!챠챠에서 고객님들이 행운가득하길 빕니다.'
        }}
        <q-banner class="text-bold text-h5 bg-dark col-12 text-red">
          <q-icon name="celebration"></q-icon>
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? '活动进行中'
              : '진행중인 이벤트'
          }}
        </q-banner>
        <q-expansion-item
          class="col-12"
          :label="
            selected_local.chinafood == '洽洽中国食品'
              ? '1. 买食品，拿好运===>赠送福券Lotto'
              : '1. 식품사고 로또 받자! ===> 로또를 선물해드립니다.'
          "
        >
          <q-card>
            <q-card-section>
              {{
                selected_local.chinafood == '洽洽中国食品'
                  ? '通过本APP购买，我们将赠送您一张韩国的福券（即Lotto）。不限支付方式，不限金额。本活动进行时间为：即日起至明年上半年（2026年6月30日）。'
                  : '저희 앱을 통해 구매해주시면(결제수단，결제금액과 상관없이) 로또 한장을 선물해드립니다. 이벤트 기간은 금일부터 내년 상반기(2026/06/30)까지 진행될 예정입니다.'
              }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          class="col-12"
          :label="
            selected_local.chinafood == '洽洽中国食品'
              ? '2. 富川最低价'
              : '2. 부천 최저가'
          "
        >
          <q-card>
            <q-card-section>
              {{
                selected_local.chinafood == '洽洽中国食品'
                  ? '本店提供富川最低价给富川住民。本人直接送货到家，不收取快递附加费用。本活动进行时间为：即日起至明年上半年（2026年6月30日）。'
                  : '부천 고객님에게는 최저가로 제공해드리겠습니다. 제가 직접 배송해드리니 배송부가비용을 받지 않지 않습니다.이벤트 기간은 금일부터 내년 상반기(2026/06/30)까지 진행될 예정입니다.'
              }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
      <div class="row">
        <q-banner class="text-bold text-h5 bg-dark col-12 text-red">
          <q-icon name="download"></q-icon>
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? '中国食品APP下载-챠챠'
              : '중국식품App설치-챠챠'
          }}
        </q-banner>
        <p class="text-body1">
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? '点击下载，安装‘챠챠’中国食品APP，从此轻松在家购买麻辣烫、干豆腐、水饺。'
              : '자신의 폰 환경에 맞춰 아래 버튼을 클릭하여 챠챠 앱을 설치해주세요. 이제부터는 중국식품을 집에서 편하게 주문하고 배달받으세요!'
          }}
        </p>
        <p class="text-body1">
          {{
            selected_local.chinafood == '洽洽中国食品'
              ? '在 GooglePlay 或者 App Store 搜索"챠챠"，也可以下载。'
              : 'GooglePlay 또는 App Store에서 "챠챠"를 직접 검색해서 설치할 수도 있습니다.'
          }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <a
          href="https://play.google.com/store/apps/details?id=com.cfomarket.mobileapp&pcampaignid=web_share"
          class="column"
        >
          <q-img
            src="~assets/images/google_play_icon.jpg"
            class="q-ma-sm row rounded-borders"
            loading="lazy"
          />
          <div class="row justify-center">
            {{
              selected_local.chinafood == '洽洽中国食品'
                ? '安卓下载'
                : '안드로이드 설치'
            }}
          </div>
        </a>
      </div>
      <div class="col">
        <a
          href="https://apps.apple.com/kr/app/%EC%B1%A0%EC%B1%A0/id6744727789"
          class="column"
        >
          <q-img
            src="~assets/images/app_store_icon.jpg"
            class="q-ma-sm row rounded-borders"
            loading="lazy"
          />
          <div class="row justify-center">
            {{
              selected_local.chinafood == '洽洽中国食品'
                ? '苹果下载'
                : '아이폰 설치'
            }}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {ref} from 'vue';
  // import googleDownload from '/images/google_play_icon.jpg';
  // import appleDownload from '/images/app_store_icon.jpg';

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
