<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary" style="height: min-content">
      <q-toolbar>
        <q-toolbar-title class="text-black text-bold row justify-start">
          <q-item clickable tag="a" to="/ProductList" class="col-2">
            <q-img
              src="icons\app-icon.png"
              class="rounded-borders q-pa-xs"
              :ratio="1"
            ></q-img>
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
        <q-item
          class="col-3"
          clickable
          tag="a"
          to="/ProductList"
          @click="loadingProducts"
        >
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
            <q-chip
              removable
              v-model="tip"
              @remove="log('tip')"
              color="white"
              text-color="black"
            >
              {{
                selected_local.chinafood == '洽洽中国食品'
                  ? '食品页面商品数量超过500种，因此读取商品过程中会有3至5秒的延迟。敬请谅解。'
                  : '식품페이지에는 상품이 500가지를 넘습니다. 그래서 상품 로딩 중 3~5초간 지연이 발생할 수 있습니다. 양해부탁드립니다.'
              }}
            </q-chip>
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

  export default defineComponent({
    name: 'MainLayout',

    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
        user: state => state.user.USER,
      }),
    },
    data: function () {
      return {
        ui_local: ref('cn'),
        tip: ref(true),
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
      // this.googleLogin();
      setTimeout(() => {
        this.tip = false;
      }, 5000);
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
      loadingProducts() {
        this.loaded = false;
        setTimeout((this.loaded = true), 3000);
      },
    },
    setup() {
      return {
        tab: ref('food'),
        loaded: ref(false),
      };
    },
  });
</script>
