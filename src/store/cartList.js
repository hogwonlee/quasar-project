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
    return state.items.map(({id, quantity}) => {
      const product = rootState.products.all.find(product => product.id === id);
      return {
        id: product.id,
        productImg: product.productImg,
        title: product.title,
        price: product.price,
        quantity,
      };
    });
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
  shipmentPrice: (state, getters) => {
    return getters.cartTotalPrice >= 20000 || getters.cartTotalPrice === 0
      ? 0
      : 3000;
  },
};

// actions
const actions = {
  async checkout({commit, state}, products) {
    const savedCartItems = [...state.items];
    commit('setCheckoutStatus', null);
    // empty cart
    commit('setCartItems', {items: []});
    try {
      await shop.buyProducts(products);
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
    console.log(product.title + 'ProductName' + product.quantity + 'Number');
    commit('setCheckoutStatus', null);
    // if (product.inventory > 0) {
    const cartItem = state.items.find(item => item.id === product.id);
    if (!cartItem) {
      commit('pushProductToCart', {id: product.id, quantity: number});
    } else {
      commit('incrementItemQuantity', cartItem);
    }

    // }
  },
  removeProductFromCart({state, commit}, product) {
    if (product.quantity > 0) {
      commit('setCheckoutStatus', null);
      const cartItem = state.items.find(item => item.id === product.id);
      commit('decrementItemQuantity', cartItem);
    }
  },
  deleteProductFromCart({state, commit}, product) {
    commit('setCheckoutStatus', null);
    const savedCartItems = state.items.filter(item => item.id != product.id);
    commit('setCartItems', {items: savedCartItems});
    commit('setCheckoutStatus', 'deleted');
  },
};

// mutations
const mutations = {
  pushProductToCart(state, {id, quantity}) {
    state.items.push({
      id,
      quantity,
    });
  },
  incrementItemQuantity(state, {id}) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
  },

  decrementItemQuantity(state, {id}) {
    const cartItem = state.items.find(item => item.id === id);
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
