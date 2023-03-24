import Vuex from 'vuex';

const state = {
  items: [],
};
const getters = {};

const actions = {
  setOrder({commit}, products) {
    commit('cartItemToOrder', {products});
  },
};

const mutations = {
  cartItemToOrder(state, {items}) {
    state.items = items;
  },
};

export default new Vuex.Store({
  namespaced: true,

  state,
  mutations,
  actions,
  getters,
});
