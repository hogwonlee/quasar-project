<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn flat size="lg" tag="a" to="/">
            {{ selected_local.chinafood }}
          </q-btn>
          <q-btn-toggle
            v-model="ui_local"
            glossy
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
    <q-separator />
    <q-page-container>
      <div class="q-gutter-md row inline">
        <q-btn flat outline tag="a" to="/ServicePolicy">
          {{ selected_local.use_policy }}
        </q-btn>
        <q-btn flat outline tag="a" to="/PrivacyPolicy">
          {{ selected_local.privacy_policy }}
        </q-btn>
      </div>
      <q-separator />
      <div class="q-gutter-md row inline">
        <q-field label="상호명" stack-label style="max-width: fit-content">
          <template v-slot:control>
            <div>중국식품온라인</div>
          </template>
        </q-field>
        <q-field label="대표자" stack-label style="max-width: fit-content">
          <template v-slot:control>
            <div>이호권</div>
          </template>
        </q-field>
        <q-field label="전화번호" stack-label style="max-width: fit-content">
          <template v-slot:control>
            <div>010-8492-0526</div>
          </template>
        </q-field>
        <q-field
          label="사업자등록번호"
          stack-label
          style="max-width: fit-content"
        >
          <template v-slot:control>
            <div>306-37-32411</div>
          </template>
        </q-field>
        <q-field label="사업장 주소" stack-label style="max-width: fit-content">
          <template v-slot:control>
            <div>서울시 구로구 천왕로 56 이펜하우스 3단지 303-1503</div>
          </template>
        </q-field>
      </div>
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

  export default defineComponent({
    name: 'MainLayout',

    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
    data: function () {
      return {
        ui_local: ref('cn'),
      };
    },
    watch: {
      ui_local: function (newValues, prevValues) {
        console.log(newValues, prevValues);
        this.change_local(newValues);
      },
    },
    mounted() {
      this.change_local(this.ui_local);
    },
    methods: {
      change_local(val) {
        if (val == 'cn') {
          this.$store.dispatch('ui_local/setcnAction');
        } else {
          this.$store.dispatch('ui_local/setkoAction');
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
