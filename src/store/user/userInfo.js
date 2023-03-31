import Cookie from 'js-cookie';
// import store from '../index';
import Vuex from 'vuex';

const state = {
  USER: {
    USER_ID: '',
    USER_NAME: '',
    USER_VERIFY: '',
    USER_TOKEN: '',
    USER_PHONE: '',
  },
};

const getters = {
  getMyId: state => () => {
    return state.USER.USER_ID;
  },
  getMyName: state => () => {
    return state.USER.USER_NAME;
  },
  getMyPhone: state => () => {
    return state.USER.USER_PHONE;
  },
  getMyToken: state => () => {
    return state.USER.USER_TOKEN;
  },
  getMyVerify: state => () => {
    return state.USER.USER_VERIFY;
  },

  // getMyName: function ({state}) {
  //   if (Cookie.get('user') != null) {
  //     return state.USER_NAME;
  //   } else {
  //     return '로그인 정보가 없습니다.';
  //   }
  // },
  // getMyPhone: function (state) {
  //   if (Cookie.get('user') != null) {
  //     return state.USER_PHONE;
  //   } else {
  //     return '로그인 정보가 없습니다.';
  //   }
  // },
};

const actions = {
  loginAction({commit}, user) {
    // console.log('userInfo액션에서 ' + typeof user);
    // console.log('userInfo액션에서 출력' + user);
    // console.log('userInfo액션에서 접근' + user.user_id);
    // console.log('login return 값: ' + commit('login', user));
    commit('login', user);
  },
  logoutAction({commit}) {
    // console.log('userInfo액션에서 ' + typeof user);
    // console.log('userInfo액션에서 출력' + user);
    // console.log('userInfo액션에서 접근' + user.user_id);
    // console.log('login return 값: ' + commit('login', user));
    commit('logout');
  },
};

const mutations = {
  logout(state) {
    state.USER.USER_ID = '';
    state.USER.USER_NAME = '';
    state.USER.USER_VERIFY = '';
    state.USER.USER_PHONE = '';
    state.USER.USER_TOKEN = '';
    Cookie.remove('token');
    Cookie.remove('user');
    Cookie.remove('verify');

    // store.state.cart.cart = null;
    // store.state.order.order = null;

    alert('로그아웃 되었습니다.');
  },
  login(state, data) {
    // console.log('userInfo에서 ' + typeof data);
    // console.log('userInfo에서 출력' + data);
    // console.log('userInfo에서 접근' + JSON.stringify(data.results[0]));
    state.USER.USER_ID = data.results[0].user_id;
    state.USER.USER_NAME = data.results[0].user_name;
    state.USER.USER_VERIFY = data.results[0].user_name;
    state.USER.USER_PHONE = data.results[0].user_phone;
    Cookie.set('token', data.token);
    Cookie.set('verify', data.results[0].user_name);
    Cookie.set('user', JSON.stringify(data.results[0]));
    state.USER.USER_TOKEN = Cookie.get('token');

    // console.log('userInfo Cookie 생겼나?' + state.USER_TOKEN);
    // return data.token;
    // state = data;
    console.log('state 적용 완료 이후' + JSON.stringify(state));
    // Cookie.set('token', data.user_name);
    // Cookie.set('verify', data.user_name);
    // Cookie.set('user', data.user_name);
    // state.USER_TOKEN = Cookie.get('token');
    // return data.token;
  },
};

export default new Vuex.Store({
  namespaced: true,

  state,
  getters,
  actions,
  mutations,
});
