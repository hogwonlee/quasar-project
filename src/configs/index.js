import jsonFile from './index.json';

process.env.VUE_APP_BACKEND_SERVER = jsonFile.VUE_APP_BACKEND_SERVER;
process.env.VUE_APP_TOSS_CLIENT_KEY = jsonFile.VUE_APP_TOSS_CLIENT_KEY;
process.env.VUE_APP_TOSS_SECRET_KEY = jsonFile.VUE_APP_TOSS_SECRET_KEY;
process.env.VUE_APP_BRANDPAY_CLIENT_KEY = jsonFile.VUE_APP_BRANDPAY_CLIENT_KEY;
process.env.VUE_APP_BRANDPAY_SECRET_KEY = jsonFile.VUE_APP_BRANDPAY_SECRET_KEY;
export default {
  server: process.env.VUE_APP_BACKEND_SERVER || 'http://175.119.224.213:3000', //'http://182.215.249.216:3000', // 'http://localhost:3000',
  clientKey: process.env.VUE_APP_TOSS_CLIENT_KEY,
  secretKey: process.env.VUE_APP_TOSS_SECRET_KEY,
  brandpayClientKey: process.env.VUE_APP_BRANDPAY_CLIENT_KEY,
  brandpaySecretKey: process.env.VUE_APP_BRANDPAY_SECRET_KEY,
};
