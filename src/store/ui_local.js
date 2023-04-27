const state = {
  ko: {
    chinafood: '중국식품',
    food: '식품',
    cart: '장바구니',
    deliver: '배송',
    myinfo: '내정보',
    search: '검색',
    change: '변경',
    del: '삭제',
    changeaddrinfo: '주소 수정',
    defaultaddr: '기본 배송지',
    changedefaultaddr: '배송지 변경',
    addrname: '주소 이름',
    recipient: '수령인',
    tel: '전화번호',
    postcode: '우편번호',
    addr: '주소',
    registernewaddr: '신규 주소 등록',
    confirmchangedefault: '이 배송지로 변경하시겠습니까?',
    confirmchangeaddrinfo: '이 주소지 정보를 변경하시겠습니까?',
    confirmdeleteaddr: '이 주소를 삭제하시겠습니까?',
    confirm: '확인',
  },
  cn: {
    chinafood: '中国食品',
    food: '食品',
    cart: '购物车',
    deliver: '运送',
    myinfo: '个人信息',
    search: '搜索',
    change: '变更',
    del: '删除',
    changeaddrinfo: '变更地址信息',
    defaultaddr: '送货地址',
    changedefaultaddr: '勾选此地址',
    addrname: '地址名称',
    recipient: '收件人',
    tel: '手机',
    postcode: '邮政编码',
    addr: '地址',
    registernewaddr: '登录新地址',
    confirmchangedefault: '确实要变更该地址为基本送货地址吗？',
    confirmchangeaddrinfo: '要变更该地址信息吗？',
    confirmdeleteaddr: '要删除该地址吗？',
    confirm: '确认',
  },
  status: null,
};

const actions = {
  setcnAction({commit, state}) {
    commit('setStatus', state.cn);
  },
  setkoAction({commit, state}) {
    commit('setStatus', state.ko);
  },
};
const mutations = {
  setStatus(state, item) {
    state.status = item;
  },
};
export default {
  namespaced: true,

  state,
  actions,
  mutations,
};
