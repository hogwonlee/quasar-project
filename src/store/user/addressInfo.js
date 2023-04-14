import Vuex from 'vuex';

const state = {
  items: [],
  status: '',
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
  deleteAddressAction({commit}, index) {
    commit('deleteAddressFromState', index);
  },
  updateAddressAction({commit}, address) {
    commit('updateAddress', {address});
  },
  setStatusAction({commit}, status) {
    commit('setStatus', status);
  },
};

const mutations = {
  pushAddressToState(state, {address}) {
    state.items.push({
      address_id: address.address_id,
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
    state.status = 'push';
    // console.log('vuex에 추가한 주소 정보: ' + state.items.recipient);
  },

  updateAddress(state, {address}) {
    state.items.map(item =>
      item.address_id == address.address_id
        ? {
            // ...item,
            address_tag: address.address_tag,
            recipient: address.recipient,
            recipient_phone: address.recipient_phone,
            post_code: address.post_code,
            address1: address.address1,
            address2: address.address2,
            address3: address.address3,
          }
        : item,
    );
    state.status = 'up date';
  },

  deleteAddressFromState(state, index) {
    state.items.splice(index, 1);
    state.status = 'delete';
    // console.log('vuex에 추가한 주소 정보: ' + state.items.recipient);
  },
  setAddressItems(state, {items}) {
    state.items = items;
  },
  setStatus(state, status) {
    state.status = status;
  },
};

export default new Vuex.Store({
  namespaced: true,

  state,
  mutations,
  actions,
  getters,
});
