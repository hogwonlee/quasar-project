<template>
  <q-layout view="hHh LpR fFf" class="bg-teal-2">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title>
          {{ ui_text.chinafood }}

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
      <!-- <router-view class="bg-teal-2" /> -->
      <q-card>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          class="bg-teal-2 q-pa-none q-ma-none"
        >
          <q-tab-panel name="food" class="q-pa-none q-ma-none">
            <ProductList class="bg-teal-2" />
          </q-tab-panel>
          <q-tab-panel name="cart" class="q-pa-none q-ma-none">
            <OrderList class="bg-teal-2" />
          </q-tab-panel>

          <q-tab-panel name="deliver" class="q-pa-none q-ma-none">
            <DeliveryInfo class="bg-teal-2" />
          </q-tab-panel>

          <q-tab-panel name="myinfo" class="q-pa-none q-ma-none">
            <UserInfo class="bg-teal-2" />
          </q-tab-panel>
        </q-tab-panels>
        <q-footer reveal elevated class="bg-primary">
          <!-- <q-toolbar> -->
          <q-tabs
            v-model="tab"
            animated
            swipeable
            infinite
            active-bg-color="teal-3"
            active-color="primary"
            class="bg-primary text-white row justify-center"
          >
            <q-tab
              class="col-3"
              icon="home"
              name="food"
              :label="ui_text.food"
            ></q-tab>
            <q-tab
              class="col-3"
              icon="shopping_cart"
              name="cart"
              :label="ui_text.cart"
            ></q-tab>
            <q-tab
              class="col-3"
              icon="local_shipping"
              name="deliver"
              :label="ui_text.deliver"
            ></q-tab>
            <q-tab
              class="col-3"
              icon="contacts"
              name="myinfo"
              :label="ui_text.myinfo"
            ></q-tab>
          </q-tabs>
        </q-footer>
      </q-card>
    </q-page-container>
    <!-- </q-toolbar> -->
  </q-layout>
</template>

<script>
  import {defineComponent, ref} from 'vue';
  import {mapState} from 'vuex';
  import ProductList from 'src/components/ProductList.vue';
  import OrderList from 'src/components/OrderList.vue';
  import DeliveryInfo from 'src/components/DeliveryInfo.vue';
  import UserInfo from 'src/components/UserInfo.vue';

  export default defineComponent({
    name: 'MainLayout',
    components: {
      ProductList,
      OrderList,
      DeliveryInfo,
      UserInfo,
    },
    computed: {
      ...mapState({
        selected_local: state => state.ui_local.status,
      }),
    },
    data: function () {
      return {
        ui_text: {},
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
        this.ui_text = this.selected_local;
      },
    },
    setup() {
      return {
        tab: ref('food'),
      };
    },
  });
</script>
