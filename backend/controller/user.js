'use strict'
const User = require('../models/index').UserInfo


const getUserByIdAndPw = async (userIdPwObj) => {
  return await User.findByIdAndPw(userIdPwObj)
}

module.exports = {
  getUserByIdAndPw
}
