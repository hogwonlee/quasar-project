<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary" style="height: min-content">
      <q-toolbar>
        <q-toolbar-title class="text-black text-bold row justify-start">
          <q-item clickable tag="a" to="/HomePage" class="col-2">
            <q-avatar>
              <q-img src="~assets/icons/app-icon.png" />
            </q-avatar>
          </q-item>
          <!-- {{ selected_local.chinafood }} -->
          <!-- <q-btn flat size="lg" tag="a" to="/HomePage"> -->
          <!-- <q-input
            class="col-3 text-h6 text-bold"
            co
            readonly
            :model-value=""
          >
          </q-input> -->
          <!-- </q-btn> -->
          <q-item class="col-2">
            <q-btn-toggle
              v-model="ui_local"
              glossy
              rounded
              class="text-bold"
              toggle-color="secondary"
              color="grey-8"
              text-color="black"
              toggle-text-color="primary"
              :options="[
                {label: '한', value: 'ko'},
                {label: '汉', value: 'cn'},
              ]"
            />
          </q-item>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <!-- <div v-if="!loaded">
        <q-circular-progress
          indeterminate
          size="90px"
          :thickness="0.2"
          color="lime"
          center-color="grey-8"
          track-color="transparent"
          class="q-ma-md"
        />
      </div>
      <div v-else> -->
      <router-view />
      <!-- </div> -->
    </q-page-container>
    <q-footer>
      <q-toolbar class="row justify-center bg-secondary">
        <q-item class="col-3" clickable tag="a" to="/ProductList">
          <q-item-section>
            <q-btn
              size="16px"
              style="width: 60px"
              icon="home"
              flat
              no-wrap
              stack
              :label="selected_local.food"
            ></q-btn>
          </q-item-section>
        </q-item>
        <q-item class="col-3" clickable tag="a" to="/OrderList">
          <q-item-section>
            <q-btn
              size="16px"
              style="width: 60px"
              icon="shopping_cart"
              flat
              no-wrap
              stack
              :label="selected_local.couter"
            ></q-btn>
          </q-item-section>
        </q-item>
        <q-item class="col-3" clickable tag="a" to="/DeliveryInfo">
          <q-item-section>
            <q-btn
              size="16px"
              style="width: 60px"
              icon="local_shipping"
              flat
              no-wrap
              stack
              :label="selected_local.deliver"
            ></q-btn>
          </q-item-section>
        </q-item>
        <q-item class="col-3" clickable tag="a" to="/UserInfo">
          <q-item-section>
            <q-btn
              size="16px"
              style="width: 60px"
              icon="contacts"
              flat
              no-wrap
              stack
              :label="selected_local.myinfo"
            ></q-btn>
          </q-item-section>
        </q-item>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
  import {defineComponent, ref} from 'vue';
  import {mapState} from 'vuex';
  import axios from 'axios';
  import configs from 'src/configs/';
  // import appIcon from '/icons/app-icon.png';

  export default defineComponent({
    name: 'MainLayout',

    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
        user: state => state.user.USER,
        products: state => state.products.all,
        storeversion: state => state.products.version,
        products_status: state => state.products.status,
      }),
    },
    data: function () {
      return {
        ui_local: ref('cn'),
      };
    },
    watch: {
      ui_local: function (newValues) {
        // console.log(newValues, prevValues);
        this.change_local(newValues);
      },
    },
    mounted() {
      if (this.user.USER_PW != '') {
        this.serverLogin();
      }
      if (this.selected_local == '') {
        this.change_local('cn');
      }
      axios
        .get(`${configs.server}/storeVersion`)
        .then(res => {
          const dbStoreVersion = res.data.results;
          console.log(
            '상점버전: ' +
              dbStoreVersion +
              ' / results' +
              JSON.stringify(res.data.results),
          );

          if (dbStoreVersion > this.storeversion) {
            this.$store.dispatch('category/resetStoreAction');
            this.$store.dispatch('products/emptyStoreAction');
            const firstParams = {
              list_index_min: 0,
              list_index_max: 20000,
            };
            try {
              axios({
                url: `${configs.server}/productList`,
                method: 'GET',
                params: firstParams,
              })
                .then(res => {
                  if (res.data.results.length > 0) {
                    // this.$store.dispatch(
                    //   'category/getCategoryAction',
                    //   res.data.results[0].category,
                    // );
                    res.data.results.map(element => {
                      this.$store.dispatch(
                        'products/getProductAction',
                        element,
                      );
                    });
                    this.$store.dispatch(
                      'products/getVersionAction',
                      dbStoreVersion,
                    );
                  } else {
                    // this.hasMore = false;
                    console.log('error: ' + '업데이트 받을 상품이 없습니다.');
                  }
                  // done();
                })
                .catch(error => {
                  if (error.response) {
                    // 서버가 응답을 했고, 그 응답이 2xx 범위를 벗어난 경우
                    if (error.response.status === 400) {
                      console.error(
                        'Error 400: Bad Request. Check your request parameters (params).',
                        error.response.data,
                      );
                      // 사용자에게 구체적인 오류 메시지를 보여줄 수 있습니다.
                      // 예: alert('상품 목록을 불러오는 데 실패했습니다: 잘못된 요청입니다.');
                    } else {
                      console.error(
                        `Error ${error.response.status}:`,
                        error.response.data,
                      );
                    }
                  } else if (error.request) {
                    // 요청이 전송되었으나 응답을 받지 못한 경우 (네트워크 문제 등)
                    console.error(
                      'No response received from the server. Please check your network connection.',
                    );
                  } else {
                    // 요청 설정 중 오류가 발생한 경우
                    console.error('Error during request setup:', error.message);
                  }
                  // this.hasMore = false; // 에러 발생 시 더 이상 로딩하지 않음
                  // done(); // 에러 발생해도 로딩 완료 처리
                });
            } catch (error) {
              console.error('Error fetching products:', error);
              // this.hasMore = false; // 에러 발생 시 더 이상 로딩하지 않음
              // done(); // 에러 발생해도 로딩 완료 처리
            }
          } else {
            console.log('이미 모든 상품을 가져왔습니다.');
          }
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    methods: {
      change_local(val) {
        if (val == 'cn') {
          this.ui_local = 'cn';
          this.$store.dispatch('ui_local/setcnAction');
        } else {
          this.ui_local = 'ko';
          this.$store.dispatch('ui_local/setkoAction');
        }
      },
      // googleLogin() {
      //   let url = new URL(window.location.href);
      //   const accessToken = url.searchParams.get('access_token');
      //   console.log('구글 액세스 토큰: ' + accessToken);
      //   if (accessToken != '') {
      //     axios
      //       .get(
      //         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      //       )
      //       .then(function (response) {
      //         console.log(
      //           'get요청: ' + response + JSON.stringify(response.data),
      //         );
      //       })
      //       .catch(function (error) {
      //         console.log('url: ' + url + '' + 'get요청: ' + error);
      //       });
      //   }
      // },
      async serverLogin() {
        const userData = {
          user_id: this.user.USER_ID,
          user_pw: this.user.USER_PW,
        };
        try {
          let response = await axios({
            url: `${configs.server}/login`,
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': '*',
              'Content-Type': 'application/json',
            },
            data: userData,
          });
          // If the request is successful, you can process the response here
          console.log('Login successful:', response.data);
          var json = response.data;
          json.user_pw = userData.user_pw;
          this.$store.dispatch('user/loginAction', {
            data: json,
            that: this,
          });
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 400) {
              console.error(
                'Error 400: Bad Request. Please check your input data.',
              );
              // You might want to display a user-friendly message
              // e.g., alert('Invalid username or password.');
            } else {
              console.error(
                `Error ${error.response.status}:`,
                error.response.data,
              );
            }
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.error(
              'No response received from the server. Please check your network connection.',
            );
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error during request setup:', error.message);
          }
        }
      },
    },
    setup() {
      return {
        tab: ref('food'),
      };
    },
  });
</script>
