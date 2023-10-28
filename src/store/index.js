import {createStore, createLogger} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './user/userInfo';
import cart from './cartList';
import products from './productList';
import category from './category';
import address from './user/addressInfo';
import coupon from './user/couponInfo';
import order from './orderList';
import api_addr from './apiAddressResult';
import ui_local from './ui_local';

// const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    cart,
    order,
    products,
    address,
    ui_local,
    category,
    coupon,
    api_addr,
  },
  strict: false,
  plugins: [
    createLogger(),

    createPersistedState({
      paths: [
        'user',
        'cart',
        'products',
        'address',
        'order',
        // 'ui_local',
        // 'category',
        'coupon',
      ],
    }),
  ],
  // plugins: debug
  //   ? [
  //       createLogger(),
  //       createPersistedState({
  //         paths: ['user', 'cart', 'products', 'address', 'order', 'ui_local'],
  //       }),
  //     ]
  //   : [],
});
