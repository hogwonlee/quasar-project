import shop from './storage';

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  items: [],
  checkoutStatus: null,
});

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({product_id, quantity}) => {
      const product = rootState.products.all.find(
        product => product.product_id === product_id,
      );
      return {
        product_id: product.product_id,
        img: product.img,
        product_name: product.product_name,
        price: product.price,
        tag: product.tag,
        quantity,
      };
    });
  },

  getCartItems: state => state.items,

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
  shipmentPrice: (state, getters) => {
    return getters.cartTotalPrice >= 30000 || getters.cartTotalPrice === 0
      ? 0
      : 2800;
  },
};

// actions
const actions = {
  async checkout({commit, state}) {
    const savedCartItems = [...state.items];
    commit('setCheckoutStatus', null);
    // empty cart
    commit('setCartItems', {items: []});
    try {
      // await shop.buyProducts();
      // order.dispatch('setOrder', {items: savedCartItems});
      commit('setCheckoutStatus', 'successful');
    } catch (e) {
      console.error(e);
      commit('setCheckoutStatus', 'failed');
      // rollback to the cart saved before sending the request
      commit('setCartItems', {items: savedCartItems});
    }
  },

  addProductToCart({state, commit}, product, number) {
    number = 1;

    commit('setCheckoutStatus', null);
    // if (product.inventory > 0) {
    const cartItem = state.items.find(
      item => item.product_id === product.product_id,
    );
    if (!cartItem) {
      commit('pushProductToCart', {
        product_id: product.product_id,
        quantity: number,
      });
    } else {
      commit('incrementItemQuantity', cartItem);
    }

    // }
  },
  removeProductFromCart({state, commit}, product) {
    if (product.quantity > 0) {
      commit('setCheckoutStatus', null);
      const cartItem = state.items.find(
        item => item.product_id === product.product_id,
      );
      commit('decrementItemQuantity', cartItem);
      commit('setCheckoutStatus', 'decrement');
    }
  },
  deleteProductFromCart({state, commit}, product) {
    commit('setCheckoutStatus', null);
    const savedCartItems = state.items.filter(
      item => item.product_id != product.product_id,
    );
    commit('setCartItems', {items: savedCartItems});
    commit('setCheckoutStatus', 'deleted');
  },
};

// mutations
const mutations = {
  pushProductToCart(state, {product_id, quantity}) {
    state.items.push({
      product_id,
      quantity,
    });
  },
  incrementItemQuantity(state, {product_id}) {
    const cartItem = state.items.find(item => item.product_id === product_id);
    cartItem.quantity++;
  },

  decrementItemQuantity(state, {product_id}) {
    const cartItem = state.items.find(item => item.product_id === product_id);
    cartItem.quantity--;
  },

  setCartItems(state, {items}) {
    state.items = items;
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
