// import shop from './storage';

// initial state
const state = () => ({
  all: [],
  staus: 'update',
  version: 0,
});

// getters
const getters = {};

// actions
const actions = {
  // async getAllProducts({commit}) {
  //   const products = await shop.getProducts();
  //   commit('setProducts', products);
  // },
  getProductAction({commit}, products) {
    commit('addToState', products);
  },
  getVersionAction({commit}, version) {
    commit('setVersion', version);
  },
  emptyStoreAction({commit}) {
    commit('setProducts', []);
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },
  setVersion(state, version) {
    state.version = version;
  },
  addToState(state, products) {
    state.all.push({
      product_id: products.id,
      product_name: products.product_name,
      price: products.price,
      category: products.category,
      tag: products.tag,
      img: 'src/assets/' + products.img + '.jpg',
      stock: products.stock,
      keyword: products.keyword,
      cutprice: products.cutprice,
      bonuscondition: products.bonuscondition,
      boxprice: products.boxprice,
      boxcapacity: products.boxcapacity,
      stored: products.stored,
      shelf_life: products.shelf_life,
      production_date: products.production_date,
      quantity: 0,
      buyoption: false,
    });
    state.staus = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
