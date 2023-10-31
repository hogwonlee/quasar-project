// import shop from './storage';

// initial state
const state = {
  items: [
    {category: '饮料l음료수'},
    {category: '方便速食l간편식'},
    {category: '佐餐类l반찬류'},
    {category: '川味零食l별미간식'},
    {category: '饼干糕点l과자'},
    {category: '炒货坚果l과자견과류'},
    {category: '肉制品l육류가공식품'},
    {category: '冷冻冷藏l냉동냉장류'},
    {category: '干货粉面l건어물면류'},
    {category: '复合调味料l복합조미료'},
    {category: '基本调味料l조미료'},
    {category: '其他l기타'},
    {category: '酸甜零食l세콤달콤'},
  ],
};

// getters
const getters = {};

// actions
const actions = {
  // async getAllProducts({commit}) {
  //   const products = await shop.getProducts();
  //   commit('setProducts', products);
  // },
  getCategoryAction({commit}, category) {
    commit('addToState', category);
  },
  emptyStoreAction({commit}) {
    commit('setProducts', []);
  },
};

// mutations
const mutations = {
  setProducts(state, category) {
    state.items = category;
  },
  addToState(state, category) {
    state.items.push(category);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
