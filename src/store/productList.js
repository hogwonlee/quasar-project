import shop from './storage';

// initial state
const state = () => ({
  all: [],
});

// getters
const getters = {};

// actions
const actions = {
  async getAllProducts({commit}) {
    const products = await shop.getProducts();
    commit('setProducts', products);
  },
  getProductAction({commit}, products) {
    commit('addToState', products);
  },
  emptyStoreAction({commit}) {
    commit('setProducts', []);
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },
  addToState(state, products) {
    state.all.push({
      id: products.id,
      product_name: products.product_name,
      price: products.price,
      img: 'src/assets/' + products.img + '.jpg',
      quantity: 99,
    });
  },
  decrementProductInventory(state, {id}) {
    const product = state.all.find(product => product.id === id);
    product.inventory--;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
