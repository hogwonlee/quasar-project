import Cookie from 'js-cookie';
// import store from '../index';

const state = {
  USER: {
    USER_ID: '',
    USER_NAME: '',
    USER_VERIFY: '',
    USER_TOKEN: '',
    USER_PHONE: '',
  },
  status: false,
};

const getters = {};

const actions = {
  async loginAction({commit}, user) {
    // console.log('userInfo액션에서 ' + typeof user);
    // console.log('userInfo액션에서 출력' + user);
    // console.log('userInfo액션에서 접근' + user.user_id);
    // console.log('login return 값: ' + commit('login', user));
    return await commit('login', user);
  },
  logoutAction({commit}) {
    // console.log('userInfo액션에서 ' + typeof user);
    // console.log('userInfo액션에서 출력' + user);
    // console.log('userInfo액션에서 접근' + user.user_id);
    // console.log('login return 값: ' + commit('login', user));
    commit('logout');
    // console.log('user status: ' + state.status);
  },
  updateAction({commit}, changeuserinfo) {
    // console.log('userInfo액션에서 ' + typeof user);
    // console.log('userInfo액션에서 출력' + user);
    // console.log('userInfo액션에서 접근' + user.user_id);
    // console.log('login return 값: ' + commit('login', user));
    commit('update', changeuserinfo);
    // console.log('user status: ' + state.status);
  },
};

const mutations = {
  logout(state) {
    // state.USER = {
    //   USER_ID: '',
    //   USER_NAME: '',
    //   USER_VERIFY: '',
    //   USER_TOKEN: '',
    //   USER_PHONE: '',
    // };
    state.USER.USER_ID = '';
    state.USER.USER_NAME = '';
    state.USER.USER_VERIFY = '';
    state.USER.USER_TOKEN = '';
    state.USER.USER_PHONE = '';
    Cookie.remove('token');
    Cookie.remove('user');
    Cookie.remove('verify');
    state.status = false;
    // store.state.cart.cart = null;
    // store.state.order.order = null;

    alert('로그아웃 되었습니다.');
  },
  login(state, data) {
    // console.log('userInfo에서 ' + typeof data);
    // console.log('userInfo에서 출력' + data);
    // console.log('userInfo에서 접근' + JSON.stringify(data.results[0]));
    Cookie.set('token', data.token);
    Cookie.set('verify', data.results[0].user_name);
    Cookie.set('user', JSON.stringify(data.results[0].user_id));
    // state.USER = {
    //   USER_ID: data.results[0].user_id,
    //   USER_NAME: data.results[0].user_name,
    //   USER_VERIFY: data.results[0].user_name,
    //   USER_PHONE: data.results[0].user_phone,
    //   USER_TOKEN: Cookie.get('token'),
    // };
    state.USER.USER_ID = data.results[0].user_id;
    state.USER.USER_NAME = data.results[0].user_name;
    state.USER.USER_VERIFY = data.results[0].user_name;
    state.USER.USER_PHONE = data.results[0].user_phone;
    state.USER.USER_TOKEN = Cookie.get('token');
    state.status = true;
    // console.log('userInfo Cookie 생겼나?' + state.USER_TOKEN);
    // return data.token;
    return state.status;
    // state = data;
    // console.log('state 적용 완료 이후' + JSON.stringify(state));
    // Cookie.set('token', data.user_name);
    // Cookie.set('verify', data.user_name);
    // Cookie.set('user', data.user_name);
    // state.USER_TOKEN = Cookie.get('token');
    // return data.token;
  },
  update(state, data) {
    // console.log('user info Update 이전' + JSON.stringify(state.USER));
    state.USER.USER_NAME = data.user_name;
    state.USER.USER_PHONE = data.user_phone;
    // console.log('user info Update 이후' + JSON.stringify(state));
  },
};

export default {
  namespaced: true,

  state,
  getters,
  actions,
  mutations,
};
