'use strict';
const User = require('../models/index').UserInfo;
const crypto = require('crypto');

const salt = env.SALT;

function hashpw(password) {
  return crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('hex');
}

const getUserByIdAndPw = async userIdPwObj => {
  return await User.findByIdAndPw(userIdPwObj);
};
const login = async (req, res) => {
  // console.log('로그인 함수가 실행됩니다.');    const sqlCommend =
  'SELECT * FROM userinfo LEFT OUTER JOIN addressinfo ON userinfo.id = addressinfo.user_id WHERE userinfo.id = ? AND userinfo.user_pw = ? ';
  const body = req.body;
  const param = {
    user_id: body.user_id,
    user_pw: hashpw(body.user_pw),
    // user_pw: hashpw(security.decryptRsaContent(body.user_pw)),
  };
  // console.log(param.user_pw);

  if (req.session.cookie.user) {
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
          // req.session.user = {
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
          // redisController.setToken(token, req.session.user);
          res.status(200).send({token: token, results: results});
          // });
        }
      },
    );
  }
};

module.exports = {
  getUserByIdAndPw,
  login,
};
