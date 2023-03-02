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

export default {
  async getProducts() {
    await wait(100);
    return _products;
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
