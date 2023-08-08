// import shop from './storage';

// initial state
const state = {
  api_address: [],
};

// getters
const getters = {};

// actions
const actions = {
  // async getAllProducts({commit}) {
  //   const products = await shop.getProducts();
  //   commit('setProducts', products);
  // },
  loadAddressAction({commit}, addr) {
    commit('addToState', {addr});
  },
  emptyAddressAction({commit}) {
    commit('setItems', []);
  },
};

// mutations
const mutations = {
  setItems(state, items) {
    state.api_address = items;
  },
  addToState(state, {addr}) {
    state.api_address.push({
      zipNo: addr.zipNo,
      roadAddrPart1: addr.roadAddrPart1,
      roadAddrPart2: addr.roadAddrPart2,
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
