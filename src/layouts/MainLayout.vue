<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated>
      <q-toolbar>
        <q-tabs
          v-model="tab"
          inline-label
          class="bg-primary text-white shadow-2"
        >
          <q-tab name="mails" icon="mail" label="Mails" />
          <q-tab name="alarms" icon="alarm" label="Alarms" />
          <q-tab name="movies" icon="movie" label="Movies" />
          <q-tab name="photos" icon="photo" label="Photos" />
          <q-tab name="videos" icon="slow_motion_video" label="Videos" />
          <q-tab name="addressbook" icon="people" label="Address Book" />
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
      };
    },
  });
</script>
