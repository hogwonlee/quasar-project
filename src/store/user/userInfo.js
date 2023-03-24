import Cookie from 'js-cookie';
import store from '../index';
import Vuex from 'vuex';

const state = () => ({
  USER_ID:
    Cookie.get('user') != null ? JSON.parse(Cookie.get('user')).user_id : '',
  USER_NAME:
    Cookie.get('user') != null ? JSON.parse(Cookie.get('user')).user_name : '',
  USER_VERIFY:
    Cookie.get('user') != null ? JSON.parse(Cookie.get('user')).user_name : '',
  USER_TOKEN: Cookie.get('user') != null ? Cookie.get('token') : '',
  USER_PHONE:
    Cookie.get('user') != null ? JSON.parse(Cookie.get('user')).user_phone : '',
});

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
    state.USER_ID = '';
    state.USER_NAME = '';
    state.USER_VERIFY = '';
    state.USER_PHONE = '';
    state.USER_TOKEN = '';
    Cookie.remove('token');
    Cookie.remove('user');
    Cookie.remove('verify');

    store.state.cart.cart = null;
    // store.state.order.order = null;

    alert('로그아웃 되었습니다.');
  },
  login(state, data) {
    // console.log('userInfo에서 ' + typeof data);
    // console.log('userInfo에서 출력' + data);
    // console.log('userInfo에서 접근' + data.user_id);
    state.USER_ID = data.results[0].user_id;
    state.USER_NAME = data.results[0].user_name;
    state.USER_VERIFY = data.results[0].user_name;
    state.USER_PHONE = data.results[0].user_phone;
    Cookie.set('token', data.token);
    Cookie.set('verify', data.results[0].user_name);
    Cookie.set('user', JSON.stringify(data.results[0]));
    state.USER_TOKEN = Cookie.get('token');
    // console.log('userInfo Cookie 생겼나?' + state.USER_TOKEN);
    return data.token;
    // state = data;
    // console.log('state 적용 완료 이후' + state.user_id);
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
  // getters,
  actions,
  mutations,
});
