import Vuex from 'vuex';

const state = {
  items: [],
};
const getters = {
  // orderProducts: (state, getters, rootState) => {
  //   return state.items.map(({product_id, quantity}) => {
  //     const product = rootState.products.all.find(
  //       product => product.id === product_id,
  //     );
  //     return {
  //       product_id: product.id,
  //       productImg: product.productImg,
  //       title: product.title,
  //       price: product.price,
  //       quantity,
  //     };
  //   });
  // },
};

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
