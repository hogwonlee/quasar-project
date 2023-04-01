import {createStore, createLogger} from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './user/userInfo';
import cart from './cartList';
import products from './productList';
import address from './user/addressInfo';
import order from './orderList';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    cart,
    order,
    products,
    address,
  },
  strict: false,
  plugins: debug
    ? [
        createLogger(),
        createPersistedState({
          paths: ['user', 'cart', 'products', 'address', 'order'],
        }),
      ]
    : [],
});
