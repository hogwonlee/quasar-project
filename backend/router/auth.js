'use strict'

const jwt = require('jsonwebtoken');

const userController = require('../controller/user')
const addressController = require('../controller/address')
const redisController = require('../utils/redis')

let jwtObj = {
  secret: 'mysecrettoken', // 원하는 시크릿 키
  option: {
    algorithm: 'HS256', // 해싱 알고리즘
    expiresIn: '300m', // 토큰 유효 기간 (테스트 기간 5시간으로 변경)
    issuer: 'issuer', // 발행자
  },
};

module.exports = {
  checkAuth: async (req, res, next) => {

    if (req.headers.authorization == null) {
      res.status(401).send({ msg: 'error', content: 'no authrozation' })
      return
    }
    let userInfo = await redisController.getToken(req.headers.authorization)
    if (!userInfo) {
      res.status(401).send({ msg: 'error', content: 'session time out.' })
      return
    }

    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ msg: 'error', content: err })
        return
      }

      next()
    })
  },

  login: async (req, res) => {
    // console.log('로그인 함수가 실행됩니다.')
    const body = req.body
    if (req.session.user) {
      // 세션에 유저가 존재한다면
      console.log('이미 로그인 돼있습니다~')
      res.writeHead(200, { 'Content-Type': 'text/html charset=utf8' })
      res.write('<h1> already Login</h1>')
      res.end()
      return
    }
    if (!body.user_id || !body.user_pw) {
      // 파라미터 없음
      console.log('로그인 정보가 부족합니다')
      res.writeHead(400, { 'Content-Type': 'text/html charset=utf8' })
      res.write('<h1> already Login</h1>')
      res.end()
      return
    }
    let user
    try {
      user = await userController.getUserByIdAndPw({ user_id: body.user_id, user_pw: body.user_pw })
    } catch (error) {
      console.error(error)
    }
    if (!user) {
      console.log('로그인 유저 정보 없음')
      res.status(404).send({ msg: 'error', content: 'id or password is wrong.' })
    } else {
      // console.log(user.user_id)
      req.session.cookie.user = {
        id: user.user_id,
        pw: user.user_pw,
        name: user.user_name,
        authorized: true,
      }
      const token = jwt.sign(
        {
          USER_ID: user.user_id, //페이로드
        },
        jwtObj.secret,
        jwtObj.option,
      )

      await redisController.setToken(token, user)

      let address = await addressController.getAddressByUserId(user.user_id)
      res.status(200).send({ token, results: { user, address } })
    }
  }
}
