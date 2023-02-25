import {createStore, createLogger} from 'vuex';
import cart from './cartList';
import products from './productList';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    cart,
    products,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
