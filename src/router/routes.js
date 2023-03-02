const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/IndexPage.vue')},
      {
        path: 'ProductList',
        component: () => import('components/ProductList.vue'),
      },
      {
        path: 'OrderList',
        component: () => import('components/OrderList.vue'),
      },
      {
        path: 'DeliveryInfo',
        component: () => import('components/DeliveryInfo.vue'),
      },
      {
        path: 'UserInfo',
        component: () => import('components/UserInfo.vue'),
      },
      {
        path: 'Success',
        component: () => import('components/checkoutpage/PaySuccess.vue'),
      },
      {
        path: 'Fail',
        component: () => import('components/checkoutpage/PayFail.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
