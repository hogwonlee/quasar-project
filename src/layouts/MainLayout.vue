<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          {{ selected_local.chinafood }}

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
