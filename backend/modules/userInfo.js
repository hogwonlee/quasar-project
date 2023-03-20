/**
 * Mocking client-server processing
 */

const _users = [
  {
    id: 202300001,
    userNickName: '호권',
    userPassword: '1234',
    userAuthority: 99,
    shipAddress: '서울시 구로구',
    userPhoneNumber: '010-8492-0526',
  },
];

export default {
  async getUsers() {
    await wait(100);
    return _users;
  },

  async buyProducts(products) {
    await wait(100);
    if (
      // simulate random checkout failure.

      Math.random > 0.5 ||
      navigator.webdriver
    ) {
      return;
    } else {
      throw new Error('Checkout error');
    }
  },
};

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
