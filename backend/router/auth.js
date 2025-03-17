'use strict';

const jwt = require('jsonwebtoken');

// const userController = require('../controller/user');
// const addressController = require('../controller/address');
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
const env = process.env;

const salt = env.SALT;

function hashpw(password) {
  return crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('hex');
}

let jwtObj = {
  secret: env.JWTOBJSECRET, // 원하는 시크릿 키
  option: {
    algorithm: 'HS256', // 해싱 알고리즘
    expiresIn: '300m', // 토큰 유효 기간 (테스트 기간 5시간으로 변경)
    issuer: 'issuer', // 발행자
  },
};

var orderResister = function (req, satisfy_coupon_text, res) {
  let sqlCommend =
    'INSERT INTO ordergroup SET address_id = ?, user_id = ?, food_price = ?, total_price = ?, satisfy_coupon = ?';
  const body = req.body;
  const param = {
    address_id: body.address_id,
    user_id: body.user_id,
    food_price: body.food_price,
    satisfy_coupon: satisfy_coupon_text,
    total_price: body.total_price,
  };

  return db.query(
    sqlCommend,
    [
      param.address_id,
      param.user_id,
      param.food_price,
      param.total_price,
      param.satisfy_coupon,
    ],
    function (err, results, fields) {
      if (err) {
        res.status(500).send({msg: 'error', content: err});
        // return resolve(1);
      } else {
        const insert_sql =
          'INSERT INTO orderinfo (product_id, quantity, order_group) VALUES ';
        // console.log('order object print: ' + JSON.stringify(body.order_data));
        var order_data = body.order_data;
        order_data.map(element => {
          element.order_group = results.insertId;
        });
        // console.log('order_data print: ' + JSON.stringify(order_data));
        var order_list = '';
        for (var i = 0; i < order_data.length; i++) {
          order_list =
            order_list +
            '(' +
            order_data[i].product_id +
            ',' +
            order_data[i].quantity +
            ',' +
            order_data[i].order_group +
            ')';
          if (i + 1 < order_data.length) {
            order_list = order_list + ',';
          }
        }
        const sqlCommend_insert = insert_sql + order_list;

        for (var i = 0; i < order_data.length; i++) {
          db.query(`UPDATE productinfo SET stock = stock - ? WHERE id = ?;`, [
            order_data[i].quantity,
            order_data[i].product_id,
          ]);
        }
        db.query(`UPDATE storeversion SET version = version+1 LIMIT 1;`);

        return db.query(sqlCommend_insert, function (err, results, fields) {
          if (err) {
            res.status(500).send({msg: 'error', content: err});
            // return resolve(1);
          } else {
            res.status(200).send({results});
            // return resolve(1);
          }
        });
      }
    },
  );
};

module.exports = {
  checkAuth: async (req, res, next) => {
    console.log('auth 체크중 ... ');
    if (req.headers.authorization == null) {
      res.status(401).send({msg: 'error', content: 'no authrozation'});
      return;
    }
    let userInfo = await redisController.getToken(req.headers.authorization);
    if (!userInfo) {
      res.status(401).send({msg: 'error', content: 'session time out.'});
      return;
    }

    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        res.status(401).send({msg: 'error', content: err});
        return;
      }

      next();
    });
  },

  login: async (req, res) => {
    // console.log('로그인 요청session: ' + req.session);
    // console.log('로그인 요청user: ' + req.session.user);
    console.log('로그인 요청Json: ' + JSON.stringify(req.body));
    const sqlCommend =
      'SELECT * FROM userinfo LEFT OUTER JOIN addressinfo ON userinfo.id = addressinfo.user_id WHERE userinfo.id = ? AND userinfo.user_pw = ? ';
    const body = req.body;
    const param = {
      user_id: body.user_id,
      user_pw: hashpw(body.user_pw),
      // user_pw: hashpw(security.decryptRsaContent(body.user_pw)),
    };
    // console.log(param.user_pw);

    if (req.session.user) {
      // 세션에 유저가 존재한다면
      console.log('이미 로그인 돼있습니다~');
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
      res.write('<h1> already Login</h1>');
      res.end();
    } else {
      db.query(
        sqlCommend,
        [param.user_id, param.user_pw],
        (err, results, fields) => {
          if (err) {
            console.error(err);
            res.status(500).send({msg: 'error', content: err});
          }
          if (results.length <= 0) {
            // console.log('로그인요청:' + err);
            res.status(400).send({msg: '로그인 실패'});
          } else {
            // console.log(JSON.stringify(results));
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
            res.status(200).send({token: token, results: results});
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
        res.status(400).send({msg: 'error', content: err});
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
                res.status(400).send({msg: 'error', content: err});
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

  google_login: async (req, res) => {
    console.log(
      '구글 로그인 인증합니다.' +
        'req: ' +
        JSON.stringify(req) +
        'res: ' +
        JSON.stringify(res),
    );

    // req.session.cookie.user = {
    req.session.user = {
      id: res[0].id,
      pw: null,
      name: res[0].user_name,
      authorized: true,
    };
  },
  orderRegister: async (req, res) => {
    var satisfy_coupon_text = '';
    // if (!req.headers.authorization) {
    return new Promise(resolve => {
      orderResister(req, satisfy_coupon_text, res);
      return resolve(1);
    });
  },
  no_id_address: (req, res) => {
    const sqlCommend_recipient_info =
      'INSERT INTO addressinfo SET recipient= ?, recipient_phone= ?, address1= ?, address_tag = ?, gate_password = ?';
    // 'INSERT INTO addressinfo SET ?';
    const body = req.body;
    const param_recipient = {
      recipient: body.no_id_recipient_name,
      recipient_phone: body.no_id_recipient_phone,
      address1: body.no_id_recipient_address,
      address_tag: body.no_id_recipient_bankinfo,
      gate_password: body.no_id_recipient_gate_password,
    };

    db.query(
      sqlCommend_recipient_info,
      [
        param_recipient.recipient,
        param_recipient.recipient_phone,
        param_recipient.address1,
        param_recipient.address_tag,
        param_recipient.gate_password,
      ],
      (err, results, fields) => {
        if (err) {
          res.status(400).send({msg: '주소 등록 error', content: err});
        } else {
          res.status(200).send(results);
        }
      },
    );
  },
};
