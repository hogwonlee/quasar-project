'use strict';

const jwt = require('jsonwebtoken');

const userController = require('../controller/user');
const addressController = require('../controller/address');
const redisController = require('../utils/redis');
const crypto = require('crypto');
const dbConfig = require('../configs/db');

const mysql = require('mysql');

const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  port: dbConfig.port,
  database: dbConfig.database,
  allowPublicKeyRetrieval: true,
  ssl: false,
});

const salt = '7a5a0c8ff7de664b68600027a591a7a4641dcf2ba3a79140be1f140fc968d366';

function hashpw(password) {
  return crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('hex');
}

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
      res.status(401).send({ msg: 'error', content: 'no authrozation' });
      return;
    }
    let userInfo = await redisController.getToken(req.headers.authorization);
    if (!userInfo) {
      res.status(401).send({ msg: 'error', content: 'session time out.' });
      return;
    }

    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({ msg: 'error', content: err });
        return;
      }

      next();
    });
  },

  login: async (req, res) => {
    // console.log('로그인 함수가 실행됩니다.');
    const sqlCommend =
      'SELECT * FROM userinfo LEFT OUTER JOIN addressinfo ON userinfo.id = addressinfo.user_id WHERE userinfo.id = ? AND userinfo.user_pw = ? ';
    const body = req.body;
    const param = {
      user_id: body.user_id,
      user_pw: hashpw(body.user_pw),
      // user_pw: hashpw(security.decryptRsaContent(body.user_pw)),
    };
    console.log(param.user_pw);

    if (req.session.user) {
      // 세션에 유저가 존재한다면
      console.log('이미 로그인 돼있습니다~');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
      res.write('<h1> already Login</h1>');
      res.end();
    } else {
      db.query(
        sqlCommend,
        [param.user_id, param.user_pw],
        (err, results, fields) => {
          if (err) {
            console.error(err);
            res.status(500).send({ msg: 'error', content: err });
          }
          if (results.length <= 0) {
            console.log('로그인요청:' + err);
            res.status(400).send({ msg: 'error', content: err });
          } else {
            console.log(JSON.stringify(results));
            req.session.cookie.user = {
              id: results[0].id,
              pw: hashpw(results[0].user_pw),
              name: results[0].user_name,
              authorized: true,
            };
            const token = jwt.sign(
              {
                USER_ID: results[0].id, //페이로드
              },
              jwtObj.secret,
              jwtObj.option,
            );
            redisController.setToken(token, req.session.cookie.user);
            res.status(200).send({ token, results });
            // });
          }
        },
      );
    }
  },

  register: async (req, res) => {
    const sqlCommend = 'INSERT INTO userinfo SET ?';
    const body = req.body;
    const param = {
      id: body.user_id,
      user_pw: hashpw(body.user_pw),
      user_name: body.user_name,
      user_phone: body.user_phone,
    };

    db.query(sqlCommend, param, (err, results, fields) => {
      if (err) {
        console.log('회원가입요청:' + err);
        res.status(400).send({ msg: 'error', content: err });
      } else {
        //오픈 이벤트: 특정 날짜 이전에 계정 생성 시, 쿠폰 지급
        if (Date.now() <= new Date('2023-12-31')) {
          const sqlCommend_gift =
            'INSERT INTO usercoupon SET coupon_id = ?, user_id = ?';
          const param_gift = {
            coupon_id: 1,
            user_id: req.body.user_id,
          };
          db.query(
            sqlCommend_gift,
            [param_gift.coupon_id, param_gift.user_id],
            (err_gift, results_gift, fields) => {
              if (err) {
                console.log('쿠폰 요청:' + err_gift);
                res.status(400).send({ msg: 'error', content: err });
              } else {
                console.log(
                  '쿠폰 지급 성공 결과값:' + JSON.stringify(results_gift),
                );
                res.status(200).send(results_gift);
              }
            },
          );
        } else {
          res.status(200).send(results);
        }
      }
    });
  },
};
