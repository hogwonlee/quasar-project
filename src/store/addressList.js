import addresses from './storage';

// initial state
const state = () => ({
  items: [],
  totalAddr: 0,
});

// getters
const getters = {
  addressInfo: (state, getters, rootState) => {
    return state.items.map(({address}) => {
      const addr = rootState.addresses.items.find(
        addr => addr.selected === true,
      );
      return {
        address: addr.address,
        address,
      };
    });
  },
};

// actions
const actions = {
  async getAllAddress({commit}) {
    const allAddr = await addresses.getAddress();
    commit('setAddr', allAddr);
  },
  addNewAddress(
    {state, commit},
    {recipient, recipientPhone, postCode, address, selected},
  ) {
    console.log('추가중...');
    commit('pushNewAddrToAddress', {
      recipient,
      recipientPhone,
      postCode,
      address,
      selected,
    });
  },
  deleteAddress({state, commit}, address) {
    const savedAddrItems = state.items.filter(item => item.id != address.id);
    commit('setAddr', {items: savedAddrItems});
  },
};

// mutations
const mutations = {
  pushNewAddrToAddress(
    state,
    {recipient, recipientPhone, postCode, address, selected},
  ) {
    state.totalAddr++;
    state.items.push({
      id: state.totalAddr,
      recipient, //수령인
      recipientPhone, //수령인 전화번호
      postCode, //우편번호
      address, //상세주소
      selected,
    });
  },

  setAddr(state, allAddr) {
    state.items = allAddr;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
