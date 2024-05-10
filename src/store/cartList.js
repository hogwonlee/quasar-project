import {pushScopeId} from 'vue';
import shop from './storage';

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  items: [],
  checkoutStatus: null,
});

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({product_id, buyoption, quantity}) => {
      const product = rootState.products.all.find(
        product => product.product_id === product_id,
      );
      JSON.stringify(product);
      return {
        product_id: product.product_id,
        product_name: product.product_name,
        price: product.price,
        category: product.category,
        tag: product.tag,
        img: product.img,
        // stock: product.stock,
        // keyword: product.keyword,
        cutprice: product.cutprice,
        bonuscondition: product.bonuscondition,
        boxprice: product.boxprice,
        boxcapacity: product.boxcapacity,
        shelf_life: product.shelf_life,
        production_date: product.production_date,
        buyoption,
        // stored: product.stored,
        quantity,
      };
    });
  },

  getCartItems: state => state.items,

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      if (product.buyoption == false) {
        return total + (product.price - product.cutprice) * product.quantity;
      } else {
        return total + product.boxprice * product.quantity;
      }
    }, 0);
  },
  shipmentPrice: (state, getters) => {
    return getters.cartTotalPrice >= 30000 || getters.cartTotalPrice === 0
      ? 0
      : 4200;
  },
  freeze_shipmentPrice: (state, getters) => {
    var freeze_product;
    freeze_product = state.items.find(
      product => product.category == '速冻冷藏l냉동냉장',
    );
    return freeze_product == undefined
      ? 0
      : getters.cartTotalPrice >= 50000
      ? 0
      : 4200;
  },
};

// actions
const actions = {
  async checkout({commit, state}) {
    const savedCartItems = [...state.items];
    commit('setCheckoutStatus', null);
    // empty cart
    commit('setCartItems', {items: []});
    try {
      // await shop.buyProducts();
      // order.dispatch('setOrder', {items: savedCartItems});
      commit('setCheckoutStatus', 'successful');
    } catch (e) {
      console.error(e);
      commit('setCheckoutStatus', 'failed');
      // rollback to the cart saved before sending the request
      commit('setCartItems', {items: savedCartItems});
    }
  },

  addProductToCart({state, commit}, product) {
    commit('setCheckoutStatus', null);
    // if (product.inventory > 0) {
    const cartItem = state.items.find(
      item =>
        item.product_id == product.product_id &&
        item.buyoption == product.buyoption,
    );
    console.log(JSON.stringify(cartItem));
    var bonus;
    if (product.bonuscondition != 0) {
      bonus = parseInt(product.quantity / product.bonuscondition);
    } else {
      bonus = 0;
    }
    let pushItem = {
      product_id: product.product_id,
      buyoption: product.buyoption,
      quantity: product.quantity,
      bonus_quantity: bonus,
      cut_money: product.cutprice * product.quantity,
      product_name: product.product_name,
      price: product.price,
      category: product.category,
      tag: product.tag,
      img: product.img,
      cutprice: product.cutprice,
      bonuscondition: product.bonuscondition,
      boxprice: product.boxprice,
      boxcapacity: product.boxcapacity,
    };
    if (!cartItem) {
      commit('pushProductToCart', pushItem);
    } else {
      let newItem = {
        product_id: cartItem.product_id,
        buyoption: cartItem.buyoption,
        quantity: product.quantity,
        bonus_quantity: bonus,
        cut_money: product.cutprice * product.quantity,

        product_name: product.product_name,
        price: product.price,
        category: product.category,
        tag: product.tag,
        img: product.img,
        // stock: product.stock,
        // keyword: product.keyword,
        cutprice: product.cutprice,
        bonuscondition: product.bonuscondition,
        boxprice: product.boxprice,
        boxcapacity: product.boxcapacity,
        // stored: product.stored,
      };
      var index = state.items.indexOf(cartItem);
      commit('incrementItemQuantity', {index, item: newItem});
    }
    // }
  },
  deleteProductFromCart({state, commit}, product) {
    commit('setCheckoutStatus', null);
    const savedCartItems = state.items.filter(
      item =>
        item.product_id != product.product_id ||
        item.buyoption != product.buyoption,
    );
    commit('setCartItems', {items: savedCartItems});
    commit('setCheckoutStatus', 'deleted');
  },
};

// mutations
const mutations = {
  pushProductToCart(state, item) {
    state.items.push(item);
  },
  incrementItemQuantity(state, {index, item}) {
    state.items.splice(index, 1, item);
  },

  setCartItems(state, {items}) {
    state.items = items;
  },

  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },
  setBonus(cartItem, quantity) {
    cartItem.bonus_quantity = quantity / bonuscondition;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
