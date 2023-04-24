import Vuex from 'vuex';

const state = {
  items: [],
  status: 'up data',
};
const getters = {
  getOrderLength: state => {
    return state.items.length;
  },
};

const actions = {
  // setOrder({commit}, products) {
  //   commit('cartItemToOrder', {products});
  // },
  pushOrderAction({commit}, orderGroup) {
    commit('pushOrderGroupToState', {orderGroup});
  },
  setStatusAction({commit}, status) {
    commit('setStatus', status);
  },
  setEmptyAction({commit}) {
    commit('setOrderGroup', {items: []});
  },
};

const mutations = {
  pushOrderGroupToState(state, {orderGroup}) {
    state.items.push({
      orderGroup_id: orderGroup.id,
      address_id: orderGroup.address_id,
      delivery_code: orderGroup.delivery_code,
      delivery_invoice: orderGroup.delivery_invoice,
      order_date: orderGroup.order_date,
      order_time: orderGroup.order_time,
      user_id: orderGroup.user_id,
    });
    state.status = 'push';
    // console.log('vuex에 추가한 주소 정보: ' + state.items.recipient);
  },
  // cartItemToOrder(state, {items}) {
  //   state.items = items;
  //   state.status = 'new Order';
  // },
  setOrderGroup(state, {items}) {
    state.items = items;
    state.status = 'reset OrderGroup';
  },
  setStatus(state, status) {
    state.status = status;
  },
};

export default {
  namespaced: true,

  state,
  mutations,
  actions,
  getters,
};
