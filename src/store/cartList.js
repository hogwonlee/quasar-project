// initial state
// shape: [{ id, quantity }]
const state = () => ({
  items: [],
  checkoutStatus: null,
  isLocation_BUCHEON: false,
  deliveryFee: 3500,
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
        water_delivery: product.water_delivery,
        production_date: product.production_date,
        boxdeliveryfee: product.boxdeliveryfee,
        buyoption,
        // stored: product.stored,
        quantity,
      };
    });
  },

  getCartItems: state => {
    let order_item = state.items.map(item => {
      if (item.buyoption == 1) {
        return {
          product_id: item.product_id,
          quantity: item.quantity * item.boxcapacity,
        };
      } else
        return {
          product_id: item.product_id,
          quantity: item.quantity + item.bonus_quantity,
        };
    });
    return order_item;
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      if (product.buyoption == false) {
        return total + (product.price - product.cutprice) * product.quantity;
      } else {
        return state.isLocation_BUCHEON == true
          ? total + product.boxprice * product.quantity
          : total +
              (product.boxprice + product.boxdeliveryfee) * product.quantity;
      }
    }, 0);
  },
  shipmentPrice: (state, getters) => {
    return getters.cartTotalPrice >= 30000 || getters.cartTotalPrice === 0
      ? 0
      : state.deliveryFee;
  },
  freeze_shipmentPrice: (state, getters) => {
    var freeze_product;
    freeze_product = state.items.find(product => product.water_delivery == 4);
    return freeze_product == undefined
      ? 0
      : getters.cartTotalPrice >= 50000
      ? 0
      : state.deliveryFee;
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

  addProductToCart({state, commit}, product, quantity) {
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
      quantity: quantity,
      bonus_quantity: bonus,
      cut_money: product.cutprice * quantity,
      product_name: product.product_name,
      price: product.price,
      category: product.category,
      tag: product.tag,
      img: product.img,
      cutprice: product.cutprice,
      bonuscondition: product.bonuscondition,
      boxprice: product.boxprice,
      boxcapacity: product.boxcapacity,
      boxdeliveryfee: product.boxdeliveryfee,
    };
    if (!cartItem) {
      commit('pushProductToCart', pushItem);
    } else {
      let newItem = {
        product_id: cartItem.product_id,
        buyoption: cartItem.buyoption,
        quantity: quantity,
        bonus_quantity: bonus,
        cut_money: product.cutprice * quantity,

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
        boxdeliveryfee: product.boxdeliveryfee,
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
  setBUCHEONBooleanAction({commit}, BUCHEON_Boolean) {
    commit('setBUCHEONBoolean', BUCHEON_Boolean);
  },
};

// mutations
const mutations = {
  pushProductToCart(state, item) {
    state.items.push(item);
    console.log(JSON.stringify(state.items));
  },
  incrementItemQuantity(state, {index, item}) {
    state.items.splice(index, 1, item);
    console.log(JSON.stringify(state.items));
  },
  setBUCHEONBoolean(state, BUCHEON_Boolean) {
    state.isLocation_BUCHEON = BUCHEON_Boolean;
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
