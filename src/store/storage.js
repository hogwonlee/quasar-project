/**
 * Mocking client-server processing
 */

const _products = [
  {
    id: 1,
    productImg: 'https://picsum.photos/256',
    title: '음료수',
    price: 1500,
    inventory: 99,
  },
  {
    id: 2,
    productImg: 'https://picsum.photos/257',
    title: '과자',
    price: 2500,
    inventory: 99,
  },
  {
    id: 3,
    productImg: 'https://picsum.photos/258',
    title: '아이스크림',
    price: 1900,
    inventory: 99,
  },
  {
    id: 4,
    productImg: 'https://picsum.photos/259',
    // productImg: 'https://picsum.photos/1024',
    title: '생크림빵',
    price: 5500,
    inventory: 99,
  },
];

const _address = [
  {
    id: 0,
    recipient: '', //수령인
    recipientPhone: '', //수령인 전화번호
    postCode: '', //우편번호
    address: '', //상세주소
    selected: false,
  },
  {
    id: 1,
    recipient: '호권', //수령인
    recipientPhone: '010-8492-0526', //수령인 전화번호
    postCode: '08080', //우편번호
    address: '천왕로 56', //상세주소
    selected: false,
  },
  {
    id: 2,
    recipient: '용철', //수령인
    recipientPhone: '010-8492-1234', //수령인 전화번호
    postCode: '08011', //우편번호
    address: '구로구 부평동', //상세주소
    selected: true,
  },
];

export default {
  async getProducts() {
    await wait(100);
    return _products;
  },
  async getAddress() {
    await wait(100);
    return _address;
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
