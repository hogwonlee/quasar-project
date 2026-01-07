const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('components/ProductList.vue'),
      },
      {
        path: 'HomePage',
        component: () => import('components/DownloadLink.vue'),
      },
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
        path: 'LoginPage',
        component: () => import('components/LoginPage.vue'),
      },
      {
        path: 'DownloadLink',
        component: () => import('components/DownloadLink.vue'),
      },
      {
        path: '__/auth/handler',
        component: () => import('components/auth/GoogleLogin.vue'),
      },
      // {
      //   path: 'auth',
      //   component: () => import('components/checkoutpage/CallbackAuth.vue'),
      // },
      // {
      //   path: 'BrandpaySuccess',
      //   component: () => import('components/checkoutpage/BrandpaySuccess.vue'),
      // },
      {
        path: 'Success',
        component: () => import('components/checkoutpage/PaySuccess.vue'),
      },
      {
        path: 'Fail',
        component: () => import('components/checkoutpage/PayFail.vue'),
      },
      {
        path: 'AddressRegister',
        component: () => import('components/AddressRegister.vue'),
      },
      {
        path: 'AddressList',
        component: () => import('components/AddressList.vue'),
      },
      {
        path: 'DeleteAccount',
        component: () => import('components/DeleteAccount.vue'),
      },
      {
        path: 'PrivacyPolicyMax',
        component: () => import('components/policy/PrivacyPolicyFull.vue'),
      },
      {
        path: 'ServicePolicyMax',
        component: () => import('components/policy/ServicePolicyFull.vue'),
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
