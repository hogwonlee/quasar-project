import userDB from './userInfo';

// initial state
// shape: [{ id, quantity }]
const state = () => ({
  users: [],
  userCounts: 0,
  userStatus: null,
});

// getters
const getters = {
  registedUsers: (state, getters, rootState) => {
    return state.users.map(({id}) => {
      const user = rootState.users.all.find(user => user.id === id);
      return {
        id: user.id,
        userNickName: user.userNickName,
        userPhoneNumber: user.userPhoneNumber,
        shipAddress: user.shipAddress,
      };
    });
  },
};

// actions
const actions = {
  userSginup({state, commit}, userInfo) {
    // console.log(product.title + 'ProductName' + number + 'Number');
    commit('setUserStatus', null);

    commit('pushUserInfo', {
      userNickName: userInfo.userNickName,
      userPassword: userInfo.userPassword,
      shipAddress: userInfo.shipAddress,
      userPhoneNumber: userInfo.userPhoneNumber,
    });
  },
};

// mutations
const mutations = {
  pushUserInfo(
    state,
    {userNickName, userPassword, shipAddress, userPhoneNumber},
  ) {
    state.userCounts++;
    state.users.push({
      id: state.userCounts + 202300001,
      userNickName,
      userPassword,
      userAuthority: 0,
      shipAddress,
      userPhoneNumber,
    });
  },

  // 권한 상승
  incrementVIPLevel(state, {id}) {
    const userInfo = state.users.find(item => item.id === id);
    userInfo.userAuthority++;
  },

  setUsers(state, {users}) {
    state.users = users;
  },

  setUserStatus(state, status) {
    state.userStatus = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
