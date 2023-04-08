<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-toolbar-title> 中国食品 / 중국식품 </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view class="bg-teal-2" />
    </q-page-container>
    <q-footer reveal elevated class="bg-primary">
      <q-toolbar>
        <q-tabs
          v-model="tab"
          inline-label
          class="bg-secondary text-grey-5 shadow-2"
          lang="zh-CN"
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
      title: '상품/商品',
      caption: 'ProductList',
      icon: 'home',
      to: '/ProductList',
    },
    {
      title: '장바구니/购物车',
      caption: 'OrderList',
      icon: 'shopping_cart',
      to: '/OrderList',
    },
    {
      title: '배송정보/查看发货信息',
      caption: 'DeliveryInfo',
      icon: 'local_shipping',
      to: '/DeliveryInfo',
    },
    {
      title: '내 정보/我的信息',
      caption: 'UserInfo',
      icon: 'contacts',
      to: '/UserInfo',
    },
    // 임시 테스트용
    // {
    //   title: '주소 등록',
    //   caption: 'AddressResigster',
    //   icon: 'contacts',
    //   to: '/AddressRegister',
    // },
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
