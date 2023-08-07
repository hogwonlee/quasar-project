// import shop from './storage';

// initial state
const state = () => ({
  address: [],
});

// getters
const getters = {};

// actions
const actions = {
  // async getAllProducts({commit}) {
  //   const products = await shop.getProducts();
  //   commit('setProducts', products);
  // },
  loadAddressAction({commit}, addr) {
    commit('addToState', addr);
  },
  emptyAddressAction({commit}) {
    commit('setItems', []);
  },
};

// mutations
const mutations = {
  setItems(state, {items}) {
    state.items = items;
  },
  addToState(state, addr) {
    state.address.push({
      zipNo: addr.zipNo,
      roadAddr: addr.roadAddr,
      jibunAddr: addr.jibunAddr,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
