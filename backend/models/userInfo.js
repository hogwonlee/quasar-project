'use strict'

const { DataTypes } = require('sequelize')

module.exports = sequelize => {

  const model = sequelize.define('User', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_pw: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    tableName: 'userinfo',
    timestamps: false
  })

  model.findByIdAndPw = async userPwObj => {
    return await model.findOne({
      attributes: ['user_id', 'user_phone', 'user_name'],
      where: {
        user_id: userPwObj.user_id,
        user_pw: userPwObj.user_pw
      },
    })
  }


  return model

}
