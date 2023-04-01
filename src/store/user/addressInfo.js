import Vuex from 'vuex';

const state = {
  items: [],
};
const getters = {
  getAddressList: state => () => {
    return state.items;
  },
};

const actions = {
  addAddressAction({commit}, address) {
    commit('pushAddressToState', {address});
  },
  emptyAddressAction({commit}) {
    commit('setAddressItems', {items: []});
  },
};

const mutations = {
  pushAddressToState(state, {address}) {
    state.items.push({
      address_id: address.id,
      address_tag: address.address_tag,
      recipient: address.recipient,
      recipient_phone: address.recipient_phone,
      post_code: address.post_code,
      address1: address.address1,
      address2: address.address2,
      address3: address.address3,
      is_default: address.is_default,
      user_id: address.user_id,
    });
    // console.log('vuex에 추가한 주소 정보: ' + state.items.recipient);
  },
  setAddressItems(state, {items}) {
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
