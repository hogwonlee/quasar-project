import {createStore, createLogger} from 'vuex';
import cart from './cartList';
import products from './productList';
import addresses from './addressList';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    cart,
    products,
    addresses,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
