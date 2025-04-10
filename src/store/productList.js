// import shop from './storage';

// initial state
const state = () => ({
  all: [],
  status: 'update',
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
    // if (state.status == 'update')
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
      img: 'images/' + products.img + '.jpg',
      stock: products.stock,
      keyword: products.keyword,
      cutprice: products.cutprice,
      bonuscondition: products.bonuscondition,
      boxprice: products.boxprice,
      boxcapacity: products.boxcapacity,
      stored: products.stored,
      water_delivery: products.water_delivery,
      production_date: products.production_date,
      flavor_refer: products.flavor_refer,
      flavor_refer_ko: products.flavor_refer_ko,
      product_name_ko: products.product_name_ko,
      product_desc: products.product_desc,
      boxdeliveryfee: products.boxdeliveryfee,
      quantity: 0,
      buyoption: false,
    });
    state.status = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
