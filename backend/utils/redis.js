const Redis = require('ioredis');

const redis = new Redis();

const thirtyMinuteOnSecond = 1800;
module.exports = {
  // 세션을 30분 연장하고 유저정보 입력
  setToken: async (token, user) => {
    return await redis.setex(token, thirtyMinuteOnSecond, JSON.stringify(user));
  },
  // 세션을 찾고 있으면 30분 연장
  getToken: async token => {
    if (!token) return null;
    let sUser = await redis.get(token);
    if (!sUser) {
      await redis.setex(token, thirtyMinuteOnSecond, sUser);
    }
    return JSON.parse(sUser);
  },
};
