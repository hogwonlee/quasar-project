'use strict'
const Address = require('../models/index').AddressInfo


const getAddressByUserId = async userId => {
  return await Address.findAllByUserId(userId)
}

module.exports = {
  getAddressByUserId,
}
