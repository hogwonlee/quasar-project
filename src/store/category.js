// import shop from './storage';

// initial state
const state = {
  items: [],
};

// getters
const getters = {};

// actions
const actions = {
  // async getAllProducts({commit}) {
  //   const products = await shop.getProducts();
  //   commit('setProducts', products);
  // },
  getCategoryAction({commit}, category) {
    commit('addToState', category);
  },
  emptyStoreAction({commit}) {
    commit('setProducts', []);
  },
};

// mutations
const mutations = {
  setProducts(state, category) {
    state.items = category;
  },
  addToState(state, category) {
    state.items.push(category);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
