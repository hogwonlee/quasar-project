<template>
  <div>
    <q-carousel
      v-model="slide"
      vertical
      transition-prev="slide-down"
      transition-next="slide-up"
      swipeable
      animated
      control-color="white"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      arrows
      style="width: 100%; height: max-content"
      class="bg-white text-white shadow-1 rounded-borders"
    >
      <template v-slot:navigation-icon="{active, btnProps, onClick}">
        <q-btn
          v-if="active"
          size="lg"
          icon="home"
          color="positive"
          flat
          round
          dense
          @click="onClick"
        />
        <q-btn
          v-else
          size="sm"
          :icon="btnProps.icon"
          color="white"
          flat
          round
          dense
          @click="onClick"
        />
      </template>
      <q-carousel-slide name="style" class="row justify-center">
        <q-img class="col-lg-5 col-md-12" src="images\a_gotoderim.png"></q-img>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="row justify-center q-gutter-sm">
        <!-- 앱 특징 소개 -->
        <div class="col-lg-5 col-md-12 row column justify-center">
          <div class="text-h5 text-bold text-black">
            그래서 우리는 무엇을 하는 것인가?
          </div>

          <div class="text-body1 text-black">
            1. 어디서든 주문할 수 있도록 모바일 주문 서비스 제공
          </div>
          <div class="text-body1 text-black">
            2. 중국인들에게 친숙한 중국어 환경 제공
          </div>
          <div class="text-body1 text-black">
            3. 최대한 많은 종류의 중국식품을 입고
          </div>
        </div>

        <q-img
          class="col-lg-3 col-md-5"
          src="images\ui_checkout.png"
          fit="contain"
          style="max-height: 500px"
        ></q-img>
        <q-img
          class="col-lg-3 col-md-5"
          src="images\ui_productlist.png"
          fit="contain"
          style="max-height: 500px"
        ></q-img>
      </q-carousel-slide>
      <q-carousel-slide
        name="apk"
        style="height: 600px"
        class="row justify-center q-gutter-sm"
      >
        <!-- 앱 다운로드 링크 -->
        <div class="col-12 text-h5 text-bold text-black row justify-center">
          어서 다운로드 해주세요!
        </div>
        <div class="col-12 row justify-center">
          <q-icon name="download"></q-icon>
          <a
            href="https://drive.google.com/file/d/1SwYJCZ_c1p-wTCQ9dpNd4dGbsMImREpJ/view?usp=sharing"
            _blank
            download
          >
            중국식품 주문 앱 apk 다운로드
          </a>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="q-gutter-md row inline">
      <q-btn flat outline tag="a" to="/ServicePolicyMax">
        {{ selected_local.use_policy }}
      </q-btn>
      <q-btn flat outline tag="a" to="/PrivacyPolicyMax">
        {{ selected_local.privacy_policy }}
      </q-btn>
    </div>
  </div>
</template>

<script>
  import {ref} from 'vue';
  import {mapState} from 'vuex';

  export default {
    setup() {
      return {
        slide: ref('style'),
      };
    },
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
    methods: {
      products_update() {
        const params =
          this.products.length <= 0
            ? {version: 0}
            : {version: this.storeversion};

        axios
          .get(`${configs.server}/productList`, {params: params})
          .then(res => {
            if (res.status == 200) {
              if (res.data.version == this.storeversion) {
                console.log('no update');
              } else {
                var inserted_category = '';
                this.$store.dispatch('category/emptyStoreAction');
                // res.data.category.map(element => {
                //   this.$store.dispatch('category/getCategoryAction', element);
                // });
                this.$store.dispatch('products/emptyStoreAction');
                res.data.results.map(element => {
                  if (element.category != inserted_category) {
                    this.$store.dispatch(
                      'category/getCategoryAction',
                      element.category,
                    );
                    inserted_category = element.category;
                  }
                  this.$store.dispatch('products/getProductAction', element);
                });
                this.$store.dispatch(
                  'products/getVersionAction',
                  res.data.version,
                );
              }
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
        // }
      },
      setproductbuyoption(product, buyoption) {
        product.buyoption = buyoption;
      },
      showProductLoading() {
        if (this.products.length > 0) {
          this.visible = false;
          this.showSimulatedReturnData = true;

          setTimeout(() => {
            this.products_update();
          }, 1000);
        } else {
          this.visible = true;
          this.showSimulatedReturnData = false;

          setTimeout(() => {
            this.visible = false;
            this.showSimulatedReturnData = true;
            this.products_update();
          }, 1000);
        }
      },
    },
  };
</script>
