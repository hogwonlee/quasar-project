
const { createClient } = require('redis');

const client = createClient({
  url: 'redis:localhost:6379'
});

const thirtyMinuteOnSecond = 1800;


module.exports = {
  // 세션을 30분 연장하고 유저정보 입력
  setToken: async (token, user) => {
    return await client.setEx(token, thirtyMinuteOnSecond, user)
  },
  // 세션을 찾고 있으면 30분 연장
  getToken: async (token) => {
    return await client.getEx(token, thirtyMinuteOnSecond)
  }
}
