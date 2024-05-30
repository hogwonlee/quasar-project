<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary" style="height: min-content">
      <q-toolbar>
        <q-toolbar-title class="text-black text-bold">
          {{ selected_local.chinafood }}
          <!-- <q-btn flat size="lg" tag="a" to="/HomePage"> -->
          <!-- <q-input
            class="col-3 text-h6 text-bold"
            co
            readonly
            :model-value=""
          >
          </q-input> -->
          <!-- </q-btn> -->
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
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer>
      <q-toolbar class="row justify-center bg-secondary">
        <q-item class="col-3" clickable tag="a" to="/ProductList">
          <q-item-section>
            <q-btn
              size="10px"
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
              size="10px"
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
              size="10px"
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
              size="10px"
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
      this.change_local(this.ui_local);
      // this.googleLogin();
    },
    methods: {
      change_local(val) {
        if (val == 'cn') {
          this.$store.dispatch('ui_local/setcnAction');
        } else {
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
        let response = await axios({
          url: `${configs.server}/login`,
          method: 'POST',
          headers: {
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',
          },
          data: userData,
        });
        var json = response.data;
        json.user_pw = userData.user_pw;
        this.$store.dispatch('user/loginAction', {
          data: json,
          that: this,
        });
      },
    },
    setup() {
      return {
        tab: ref('food'),
      };
    },
  });
</script>
