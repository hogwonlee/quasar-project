// import http from 'http';
// import express from 'express';
// import serveStatic from 'serve-static';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import bodyParser from 'body-parser';

const jwt = require('jsonwebtoken');

let jwtObj = {
  secret: 'mysecrettoken', // 원하는 시크릿 키
  option: {
    algorithm: 'HS256', // 해싱 알고리즘
    expiresIn: '30m', // 토큰 유효 기간 (테스트 기간 5시간으로 변경)
    issuer: 'issuer', // 발행자
  },
};

const mysql = require('mysql');
const express = require('express');
const serveStatic = require('serve-static');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bodyParser = require('body-parser');
//const registerRouter = require('./routes/router'); //회원가입 처리 router에 맡김
const cors = require('cors'); //서버 통신 보안상 추가하지 않을경우 오류 발생할 수 있음.

const db = mysql.createConnection({
  host: 'localhost',
  user: 'hogwon',
  password: '1234',
  port: 3306,
  database: 'mystore',
  allowPublicKeyRetrieval: true,
  ssl: false,
});

db.connect();

const _dirname = path.resolve();
const app = express(); // express Server

app.set('port', 3001);

const appServer = http.createServer(app);
// 세션세팅
let maxAge = 1000 * 60 * 10;
const sessionObj = {
  secret: 'my key',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({checkPeriod: maxAge}),
  cookie: {maxAge},
};
app.use(session(sessionObj));

appServer.listen(app.get('port'), () => {
  console.log(`${app.get('port')}에서 서버실행중.`);
});

// 미들웨어를 등록한다
app.use(express.urlencoded({extended: true}));
app.use(serveStatic(path.join(_dirname, 'public')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식하지 않는 문제 해결
    extended: false,
  }),
);
//app.use(registerRouter); //회원가입 처리 router에 맡김
app.use(cors()); //교차통신 적용

// cookie and session assign middleWare
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log('get: ' + req.header.authorization);
  const {coo} = req.session;
  if (coo) {
    console.log('이미 로그인 하미' + coo);
  }
});

app.post('/login', (req, res) => {
  console.log('로그인 함수가 실행됩니다.');
  const sqlCommend =
    'SELECT * FROM USERINFO LEFT OUTER JOIN ADDRESSINFO ON USERINFO.user_id = ADDRESSINFO.user_id WHERE USERINFO.user_id = ? AND USERINFO.user_pw = ? ';
  const body = req.body;
  const param = {
    user_id: body.user_id,
    user_pw: body.user_pw,
  };
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
        if (results.length <= 0) {
          console.log('로그인요청:' + err);
          res.status(400).send({msg: 'error', content: err});
        } else {
          // console.log(results[0].user_name);
          req.session.cookie.user = {
            id: results[0].user_id,
            pw: results[0].user_pw,
            name: results[0].user_name,
            authorized: true,
          };
          const token = jwt.sign(
            {
              USER_ID: results[0].user_id, //페이로드
            },
            jwtObj.secret,
            jwtObj.option,
          );
          res.status(200).send({token, results});
          // });
        }
      },
    );
  }
});

app.post('/checkpw', (req, res) => {
  const sqlCommend =
    'SELECT * FROM USERINFO WHERE user_id = ? AND user_pw = ? ';
  const body = req.body;
  const param = {
    user_id: body.user_id,
    user_pw: body.user_pw,
  };
  db.query(
    sqlCommend,
    [param.user_id, param.user_pw],
    (err, results, fields) => {
      if (results.length <= 0) {
        console.log('비밀번호 확인:' + err);
        res.status(400).send({msg: 'error', content: err});
      } else {
        res.status(200).send({msg: 'success'});
      }
    },
  );
});

app.post('/changeuserinfo', (req, res) => {
  const sqlCommend =
    'UPDATE USERINFO SET user_name = ? , user_phone = ? WHERE user_id = ? ';
  const body = req.body;
  const param = {
    user_id: body.user_id,
    user_name: body.user_name,
    user_phone: body.user_phone,
  };
  db.query(
    sqlCommend,
    [param.user_name, param.user_phone, param.user_id],
    (err, results, fields) => {
      if (results.length <= 0) {
        console.log('비밀번호 확인:' + err);
        res.status(400).send({msg: 'error', content: err});
      } else {
        res.status(200).send({msg: 'success'});
      }
    },
  );
});

app.post('/changepw', (req, res) => {
  const sqlCommend = 'UPDATE USERINFO SET user_pw = ? WHERE user_id = ? ';
  const body = req.body;
  const param = {
    user_id: body.user_id,
    user_pw: body.user_pw,
  };
  db.query(
    sqlCommend,
    [param.user_pw, param.user_id],
    (err, results, fields) => {
      if (results.length <= 0) {
        console.log('비밀번호 변경 오류:' + err);
        res.status(400).send({msg: 'error', content: err});
      } else {
        res.status(200).send({msg: 'success'});
      }
    },
  );
});

app.post('/register', (req, res) => {
  const sqlCommend = 'INSERT INTO USERINFO SET ?';
  const body = req.body;
  console.log(body);
  const param = {
    user_id: body.user_id,
    user_pw: body.user_pw,
    user_name: body.user_name,
    user_phone: body.user_phone,
  };

  db.query(sqlCommend, param, (err, results, fields) => {
    if (err) {
      console.log('회원가입요청:' + err);
      res.status(400).send({msg: 'error', content: err});
    } else {
      res.status(200).send({msg: 'success', param: param});
    }
  });
});

app.post('/addressRegister', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('addressRegister 에러 발생: ' + err);
      } else {
        // console.log('디코디드: ' + decoded.USER_ID);
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend = 'INSERT INTO ADDRESSINFO SET ?';
          const body = req.body;
          const param = {
            address_tag: body.address_tag,
            recipient: body.recipient,
            recipient_phone: body.recipient_phone,
            post_code: body.post_code,
            address1: body.address1,
            address2: body.address2,
            address3: body.address3,
            is_default: body.is_default,
            user_id: body.user_id,
          };

          db.query(sqlCommend, param, (err, results, fields) => {
            if (err) {
              console.log('배송 주소 추가 요청:' + err);
              res.status(400).send({msg: 'error', content: err});
            } else {
              if ((body.is_default = 1)) {
                // 기본 배송지로 선택하여 보낼 경우, 기존 주소의 is_default를 모두 0으로 하고 다시 설정해줌.
                const sqlCommend_reset =
                  'UPDATE ADDRESSINFO SET is_default = 0 WHERE user_id = ?';
                db.query(
                  sqlCommend_reset,
                  param.user_id,
                  (err, results, fields) => {
                    if (err) {
                      console.log('배송 주소 기본 설정 초기화:' + err);
                      res.status(400).send({msg: 'error', content: err});
                    } else {
                      console.log(
                        '배송 주소 기본 설정 초기화 성공:' +
                          JSON.stringify(results),
                      );
                    }
                  },
                );
                const sqlCommend_default =
                  'UPDATE ADDRESSINFO SET is_default = 1 WHERE user_id = ? AND id = ?';
                const param_2 = {
                  user_id: body.user_id,
                  address_id: results.insertId,
                };
                db.query(
                  sqlCommend_default,
                  [param_2.user_id, param_2.address_id],
                  (err, results, fields) => {
                    if (err) {
                      console.log('기본 배송지 변경 요청:' + err);
                      res.status(400).send({msg: 'error', content: err});
                    } else {
                      console.log(
                        '기본 배송지 설정 성공:' + JSON.stringify(results),
                      );
                    }
                  },
                );
              }
              // var insertId = results.insertId;
              // results = {id: insertId, ...param};
              // console.log('배송지 등록 성공 결과값:' + JSON.stringify(results));
              res.status(200).send({msg: 'success'});
            }
          });
        } else {
          console.log('로그인 정보와 등록 정보가 일치하지 않습니다.');
        }
      }
    });
  } else {
    console.log('요청 헤더에 승인 정보가 없음.');
  }
});

app.post('/addressChangeDefaultAddress', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('addressChangeDefaultAddress 에러 발생: ' + err);
      } else {
        // console.log('디코디드: ' + decoded.USER_ID);
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend_reset =
            'UPDATE ADDRESSINFO SET is_default = 0 WHERE user_id = ?';
          const body = req.body;
          const param = body.user_id;
          db.query(sqlCommend_reset, param, (err, results, fields) => {
            if (err) {
              console.log('배송 주소 기본 설정 초기화:' + err);
              res.status(400).send({msg: 'error', content: err});
            } else {
              console.log(
                '배송 주소 기본 설정 초기화 성공:' + JSON.stringify(results),
              );
            }
          });
          const sqlCommend_default =
            'UPDATE ADDRESSINFO SET is_default = 1 WHERE user_id = ? AND id = ?';
          const param_2 = {
            user_id: body.user_id,
            address_id: body.address_id,
          };
          db.query(
            sqlCommend_default,
            [param_2.user_id, param_2.address_id],
            (err, results, fields) => {
              if (err) {
                console.log('기본 배송지 변경 요청:' + err);
                res.status(400).send({msg: 'error', content: err});
              } else {
                console.log('기본 배송지 설정 성공:' + JSON.stringify(results));
              }
            },
          );

          const sqlCommend_select =
            'SELECT * FROM ADDRESSINFO WHERE user_id = ?';

          db.query(sqlCommend_select, param, (err, results, fields) => {
            if (err) {
              // console.log('배송 주소 조회 요청:' + err);
              res.status(400).send({msg: 'error', content: err});
            } else {
              // console.log('userInfo 로그인 유저 조회 답변:' + results);
              res.status(200).send({results});
            }
          });
        } else {
          console.log('로그인 정보와 등록 정보가 일치하지 않습니다.');
        }
      }
    });
  } else {
    console.log('요청 헤더에 승인 정보가 없음.');
  }
});

app.post('/orderGroupResister', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('orderGroupResister 에러 발생: ' + err);
      } else {
        // if (decoded.USER_ID == req.body.user_id) {
        const sqlCommend = 'INSERT INTO ORDERGROUP SET ?';
        const body = req.body;
        console.log(body);
        const param = body;

        db.query(sqlCommend, param, (err, results, fields) => {
          if (err) {
            console.log('주문 추가 요청:' + err);
            res.status(400).send({msg: 'error', content: err});
          } else {
            // results = param;
            var results = results.insertId;

            console.log('주문 등록 성공 결과값:' + results);
            res.status(200).send({results});
          }
        });
        // } else {
        //   console.log('로그인 정보와 등록 정보가 일치하지 않습니다.');
        // }
      }
    });
  } else {
    console.log('요청 헤더에 승인 정보가 없음.');
  }
});

app.post('/orderResister', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('orderResister 에러 발생: ' + err);
      } else {
        // if (decoded.USER_ID == req.body.user_id) {
        const sqlCommend = 'INSERT INTO ORDERINFO SET ?';
        const body = req.body;
        console.log(body);
        const param = body;

        db.query(sqlCommend, param, (err, results, fields) => {
          if (err) {
            console.log('주문 추가 요청:' + err);
            res.status(400).send({msg: 'error', content: err});
          } else {
            console.log('주문 등록 성공 결과값:' + results);
            res.status(200).send({results});
          }
        });
        // } else {
        //   console.log('로그인 정보와 등록 정보가 일치하지 않습니다.');
        // }
      }
    });
  } else {
    console.log('요청 헤더에 승인 정보가 없음.');
  }
});

app.post('/addressInfo', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('addressInfo 에러 발생: ' + err);
      } else {
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend = 'SELECT * FROM ADDRESSINFO WHERE user_id = ?';
          const body = req.body;
          const param = body.user_id;
          db.query(sqlCommend, param, (err, results, fields) => {
            if (err) {
              // console.log('배송 주소 추가 요청:' + err);
              res.status(400).send({msg: 'error', content: err});
            } else {
              // console.log('userInfo 로그인 유저 조회 답변:' + results);
              res.status(200).send({results});
            }
          });
        } else {
          console.log('로그인 정보와 등록 정보가 일치하지 않습니다.');
        }
      }
    });
  } else {
    console.log('요청 헤더에 승인 정보가 없음.');
  }
});
