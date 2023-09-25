const state = {
  items: [],
  status: 'up date',
};
const getters = {};

const actions = {
  addCouponAction({commit}, coupon) {
    commit('pushCouponToState', {coupon});
  },
  reserveUseCouponAction({state, commit}, id) {
    var c = state.items.find(item => item.coupon_id == id);
    var i = state.items.indexOf(c);
    commit('updateReserveCoupon', i);
  },
  reserveCancleAction({state, commit}) {
    var c = state.items.find(item => item.coupon_use_reserve == 1);
    var i = state.items.indexOf(c);
    console.log('삭제예정' + i);
    commit('cancleReserveCoupon', i);
  },
  emptyCouponAction({commit}) {
    commit('setCouponItems', {items: []});
  },
  deleteCouponAction({commit}, index) {
    commit('deleteCouponFromState', index);
  },
  setStatusAction({commit}, status) {
    commit('setStatus', status);
  },
};

const mutations = {
  pushCouponToState(state, {coupon}) {
    state.items.push({
      coupon_id: coupon.coupon_id,
      coupon_name: coupon.coupon_name,
      coupon_name_ko: coupon.coupon_name_ko,
      gift_condition: coupon.gift_condition,
      coupon_price: coupon.coupon_price,
      use_condition: coupon.use_condition,
      limit_date: coupon.limit_date,
      gift_day: coupon.gift_day,
      available: coupon.available,
      user_id: coupon.user_id, //필요한가?
      coupon_use_reserve: 0,
    });
    state.status = 'push complete';
    // console.log('vuex에 추가한 주소 정보: ' + state.items.recipient);
  },

  updateReserveCoupon(state, index) {
    var update_c = state.items[index];
    update_c.coupon_use_reserve = 1;
    state.items.splice(index, 1, update_c);
    state.status = 'up date complete';
  },
  cancleReserveCoupon(state, index) {
    var update_c = state.items[index];
    update_c.coupon_use_reserve = 0;
    state.items.splice(index, 1, update_c);
    state.status = 'up date complete';
  },
  deleteCouponFromState(state, index) {
    state.items.splice(index, 1);
    state.status = 'delete complete';
    // console.log('vuex에 추가한 주소 정보: ' + state.items.recipient);
  },
  setCouponItems(state, {items}) {
    state.items = items;
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
