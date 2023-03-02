<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-orange">
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated class="bg-orange">
      <q-toolbar>
        <q-tabs
          v-model="tab"
          inline-label
          class="bg-orange text-white shadow-2"
        >
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
  import {defineComponent, ref} from 'vue';
  import EssentialLink from 'components/EssentialLink.vue';

  const linksList = [
    {
      title: '상품',
      caption: 'ProductList',
      icon: 'home',
      to: '/ProductList',
    },
    {
      title: '장바구니',
      caption: 'OrderList',
      icon: 'shopping_cart',
      to: '/OrderList',
    },
    {
      title: '배송정보',
      caption: 'DeliveryInfo',
      icon: 'local_shipping',
      to: '/DeliveryInfo',
    },
    {
      title: '내 정보',
      caption: 'UserInfo',
      icon: 'contacts',
      to: '/UserInfo',
    },
  ];

  export default defineComponent({
    name: 'MainLayout',

    components: {
      EssentialLink,
    },

    setup() {
      const leftDrawerOpen = ref(false);

      return {
        essentialLinks: linksList,
        leftDrawerOpen,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        },
        tab: ref('mails'),
      };
    },
  });
</script>
