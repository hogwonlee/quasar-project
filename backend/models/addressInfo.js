'use strict'

const { Sequelize, DataTypes } = require('sequelize')

module.exports = sequelize => {

  const model = sequelize.define('Address', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    is_default: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    post_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_active: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipient: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    recipient_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    tableName: 'addressinfo',
    timestamps: false
  })

  model.findAllByUserId = async userId => {
    return await model.findAll({
      where: {
        user_id: userId,
      }
    })
  }


  return model

}
