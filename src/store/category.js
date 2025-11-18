// import shop from './storage';

// initial state
const state = {
  items: [
    {category: '火锅相关l훠궈재료'},
    {category: '方便面罐头l간편식사류'},
    {category: '冷藏l냉장'},
    {category: '速冻食品l냉동'},
    {category: '饼干虾条薯片l과자'},
    {category: '炒货坚果l견과류'},
    {category: '调味料l조미료'},
    {category: '饮料l음료수'},
    {category: '下饭菜类l반찬류'},
    {category: '零食l간식'},
    {category: '甜食罐头l단음식'},
    {category: '食材干货l마른식재'},
    {category: '娱乐l오락'},
  ],
  /*
  items: [
    {category: '火锅相关l훠궈재료'},
    {category: '饼干虾条薯片l과자'},
    {category: '方便面罐头l간편식사류'},
    {category: '甜食罐头l단음식'},
    {category: '食材干货l마른식재'},
    {category: '炒货坚果l견과류'},
    {category: '调味料l조미료'},
    {category: '冷藏l냉장'},
    {category: '速冻食品l냉동'},
    {category: '零食l간식'},
    {category: '饮料l음료수'},
    {category: '下饭菜类l반찬류'},
    {category: '娱乐l오락'},
  ],
火锅相关l훠궈재료
饼干虾条薯片l과자
方便面罐头l간편식사류
甜食罐头l단음식
食材干货l마른식재
炒货坚果l견과류
调味料l조미료
冷藏l냉장
速冻食品l냉동
零食l간식
饮料l음료수
下饭菜类l반찬류
娱乐l오락
*/
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
  resetStoreAction({commit}) {
    commit('resetProducts');
  },
};

// mutations
const mutations = {
  setProducts(state, category) {
    state.items = category;
  },
  resetProducts(state) {
    state.items = [
      {category: '人气商品l인기상품'},
      {category: '方便面罐头l간편식사류'},
      {category: '冷藏l냉장'},
      {category: '速冻食品l냉동'},
      {category: '饼干虾条薯片l과자'},
      {category: '炒货坚果l견과류'},
      {category: '调味料l조미료'},
      {category: '饮料l음료수'},
      {category: '下饭菜类l반찬류'},
      {category: '零食l간식'},
      {category: '甜食罐头l단음식'},
      {category: '食材干货l마른식재'},
      {category: '娱乐l오락'},
    ];
  },
  addToState(state, category) {
    var same_category = state.items.find(c => c.category == category);
    if (same_category) {
      console.log('이미 추가한 카테고리입니다.');
    } else {
      state.items.push({category});
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
