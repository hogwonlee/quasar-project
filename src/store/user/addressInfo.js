import {getOrderList, updateOrderList, deleteOrderList} from '@/api/Cart';
const state = {
  address: [],
};

const mutations = {
  getAddressList(state, data) {
    state.order = data.data.result;
  },
};

const actions = {
  async getOrderList(context, data) {
    try {
      const response = await getOrderList(data);
      context.commit('getOrderList', response);
    } catch (error) {
      alert(error);
    }
  },
  async updateOrderList(context, data) {
    try {
      await updateOrderList(data);
    } catch (error) {
      alert(error);
    }
  },
  async deleteOrderList(context, data) {
    try {
      await deleteOrderList(data);
    } catch (error) {
      alert(error);
    }
  },
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
