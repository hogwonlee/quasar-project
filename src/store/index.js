import {createStore, createLogger} from 'vuex';
import user from './user/userInfo';
import cart from './cartList';
import products from './productList';
import addresses from './addressList';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    user,
    cart,
    products,
    addresses,
  },
  strict: false,
  plugins: debug ? [createLogger()] : [],
});
