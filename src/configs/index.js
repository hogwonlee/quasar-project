export default {
  server: process.env.BACKEND_SERVER || 'http://175.119.224.213:3000', //'http://182.215.249.216:3000', // 'http://localhost:3000',
  clientKey: process.env.TOSS_CLIENT_KEY,
  secretKey: process.env.TOSS_SECRET_KEY,
};
