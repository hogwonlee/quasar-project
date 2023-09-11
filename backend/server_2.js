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
    expiresIn: '300m', // 토큰 유효 기간 (테스트 기간 5시간으로 변경)
    issuer: 'issuer', // 발행자
  },
};

const express = require('express');
const serveStatic = require('serve-static');
const http = require('http');
const https = require('https');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bodyParser = require('body-parser');
//const registerRouter = require('./routes/router'); //회원가입 처리 router에 맡김
const cors = require('cors'); //서버 통신 보안상 추가하지 않을경우 오류 발생할 수 있음.
const {date} = require('quasar');
const {stringify} = require('querystring');
const auth = require('./router/auth');
const authRouter = require('./router/index');
const noAuthRouter = require('./router/noauth');
const crypto = require('crypto');
const fs = require('fs');
// const security = require('./utils/security');
// const salt = crypto.randomBytes(32).toString('hex');
const salt = '7a5a0c8ff7de664b68600027a591a7a4641dcf2ba3a79140be1f140fc968d366';

function hashpw(password) {
  return crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('hex');
}

const {db} = require('./models/database');

const _dirname = path.resolve();
const app = express(); // express Server

app.set('port', 3000);

const prikeyfile = '/etc/ssl/private/cfomarket.store.key';
const certfile = '/etc/ssl/certs/cfomarket.store.crt';

const httpsoptions = {
  key: fs.readFileSync(prikeyfile),
  cert: fs.readFileSync(certfile),
};

const appServer = https.createServer(httpsoptions, app);
// const appServer = http.createServer(app);
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
// app.use(registerRouter); //회원가입 처리 router에 맡김
app.use(cors()); //교차통신 적용

// cookie and session assign middleWare
app.use(cookieParser());

app.get('/api', (req, res) => {
  console.log('get: ' + req.header.authorization);
  const {coo} = req.session;
  if (coo) {
    console.log('이미 로그인 하미' + coo);
  }
});

app.use(noAuthRouter);

app.use(auth.checkAuth);

app.post('/api/checkpw', (req, res) => {
  const sqlCommend = 'SELECT * FROM userinfo WHERE id = ? AND user_pw = ? ';
  const body = req.body;
  const param = {
    user_id: body.user_id,
    user_pw: hashpw(body.user_pw),
    // user_pw: hashpw(security.decryptRsaContent(body.user_pw)),
  };
  console.log(user_pw);
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

app.post('/api/changeuserinfo', (req, res) => {
  const sqlCommend =
    'UPDATE userinfo SET user_name = ? , user_phone = ? WHERE id = ? ';
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
        res.status(200).send({results});
      }
    },
  );
});

app.post('/api/changepw', (req, res) => {
  const sqlCommend_select =
    'SELECT * FROM userinfo WHERE id = ? AND user_pw = ? ';
  const body = req.body;
  const param_select = {
    user_id: body.user_id,
    user_pw: hashpw(body.user_pw),
    // user_pw: hashpw(security.decryptRsaContent(body.user_pw)),
  };
  db.query(
    sqlCommend_select,
    [param_select.user_id, param_select.user_pw],
    (err, results, fields) => {
      if (results.length <= 0) {
        console.log('비밀번호 확인:' + err);
        res.status(400).send({msg: 'error', content: err});
      } else {
        const sqlCommend_update =
          'UPDATE userinfo SET user_pw = ? WHERE id = ? ';
        const param_update = {
          user_id: body.user_id,
          user_pw: hashpw(body.newPw),
          // user_pw: hashpw(security.decryptRsaContent(body.newPw)),
        };
        db.query(
          sqlCommend_update,
          [param_update.user_pw, param_update.user_id],
          (err, results, fields) => {
            if (results.length <= 0) {
              console.log('비밀번호 변경 오류:' + err);
              res.status(400).send({msg: 'error', content: err});
            } else {
              res.status(200).send({msg: 'success'});
            }
          },
        );
      }
    },
  );
});

// app.post('/register', (req, res) => {
//   const sqlCommend = 'INSERT INTO userinfo SET ?';
//   const body = req.body;
//   console.log(body);
//   const param = {
//     id: body.user_id,
//     user_pw: hashpw(body.user_pw),
//     user_name: body.user_name,
//     user_phone: body.user_phone,
//   };

//   db.query(sqlCommend, param, (err, results, fields) => {
//     if (err) {
//       console.log('회원가입요청:' + err);
//       res.status(400).send({msg: 'error', content: err});
//     } else {
//       //오픈 이벤트: 특정 날짜 이전에 계정 생성 시, 쿠폰 지급
//       if (Date.now() <= new Date('2023-12-31')) {
//         const sqlCommend_gift =
//           'INSERT INTO usercoupon SET coupon_id = ?, user_id = ?';
//         const param_gift = {
//           coupon_id: 1,
//           user_id: req.body.user_id,
//         };
//         db.query(
//           sqlCommend_gift,
//           [param_gift.coupon_id, param_gift.user_id],
//           (err_gift, results_gift, fields) => {
//             if (err) {
//               console.log('쿠폰 요청:' + err_gift);
//               res.status(400).send({msg: 'error', content: err});
//             } else {
//               console.log(
//                 '쿠폰 지급 성공 결과값:' + JSON.stringify(results_gift),
//               );
//               res.status(200).send(results_gift);
//             }
//           },
//         );
//       } else {
//         res.status(200).send(results);
//       }
//     }
//   });
// });

// app.post('/login', (req, res) => {
//   // console.log('로그인 함수가 실행됩니다.');
//   const sqlCommend =
//     'SELECT * FROM userinfo LEFT OUTER JOIN addressinfo ON userinfo.id = addressinfo.user_id WHERE userinfo.id = ? AND userinfo.user_pw = ? ';
//   const body = req.body;
//   const param = {
//     user_id: body.user_id,
//     user_pw: hashpw(body.user_pw),
//   };
//   console.log(param.user_pw);

//   if (req.session.user) {
//     // 세션에 유저가 존재한다면
//     console.log('이미 로그인 돼있습니다~');
//     res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
//     res.write('<h1> already Login</h1>');
//     res.end();
//   } else {
//     db.query(
//       sqlCommend,
//       [param.user_id, param.user_pw],
//       (err, results, fields) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send({msg: 'error', content: err});
//         }
//         if (results.length <= 0) {
//           console.log('로그인요청:' + err);
//           res.status(400).send({msg: 'error', content: err});
//         } else {
//           console.log(JSON.stringify(results));
//           req.session.cookie.user = {
//             id: results[0].id,
//             pw: hashpw(results[0].user_pw),
//             name: results[0].user_name,
//             authorized: true,
//           };
//           const token = jwt.sign(
//             {
//               USER_ID: results[0].id, //페이로드
//             },
//             jwtObj.secret,
//             jwtObj.option,
//           );
//           res.status(200).send({token, results});
//           // });
//         }
//       },
//     );
//   }
// });

app.post('/api/addressRegister', (req, res) => {
  console.log(`token: ${req.headers.authorization}`);
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('addressRegister 에러 발생: ' + err);
      } else {
        console.log('디코디드: ' + JSON.stringify(decoded));
        console.log('디코디드: ' + decoded.USER_ID);
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend = 'INSERT INTO addressinfo SET ?';
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
                  'UPDATE addressinfo SET is_default = 0 WHERE user_id = ?';
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
                  'UPDATE addressinfo SET is_default = 1 WHERE user_id = ? AND address_id = ?';
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
              res.status(200).send({msg: 'success', results});
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

app.post('/api/addressChangeDefaultAddress', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('addressChangeDefaultAddress 에러 발생: ' + err);
      } else {
        // console.log('디코디드: ' + decoded.USER_ID);
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend_reset =
            'UPDATE addressinfo SET is_default = 0 WHERE user_id = ?';
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
            'UPDATE addressinfo SET is_default = 1 WHERE user_id = ? AND address_id = ?';
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
            'SELECT * FROM addressinfo WHERE user_id = ?';

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

app.post('/api/addressInfoChange', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('addressChangeDefaultAddress 에러 발생: ' + err);
      } else {
        // console.log('디코디드: ' + decoded.USER_ID);
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend_update =
            'UPDATE addressinfo SET address_tag = ?, recipient= ?,recipient_phone = ? , post_code=?,address1=?,address2=?,address3=? WHERE address_id = ? ';
          const body = req.body;
          const param_update = {
            address_tag: body.address_tag,
            recipient: body.recipient,
            recipient_phone: body.recipient_phone,
            post_code: body.post_code,
            address1: body.address1,
            address2: body.address2,
            address3: body.address3,
            address_id: body.address_id,
          };
          db.query(
            sqlCommend_update,
            [
              param_update.address_tag,
              param_update.recipient,
              param_update.recipient_phone,
              param_update.post_code,
              param_update.address1,
              param_update.address2,
              param_update.address3,
              param_update.address_id,
            ],
            (err, results, fields) => {
              if (results.length <= 0) {
                console.log('주소 정보 변경:' + err);
                res.status(400).send({msg: 'error', content: err});
              } else {
                res.status(200).send({results});
              }
            },
          );
        } else {
          console.log('로그인 정보와 등록 정보가 일치하지 않습니다.');
        }
      }
    });
  } else {
    console.log('요청 헤더에 승인 정보가 없음.');
  }
});

app.post('/api/deleteAddress', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('deleteAddress 에러 발생: ' + err);
      } else {
        // console.log('디코디드: ' + decoded.USER_ID);
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend_delete =
            'UPDATE addressinfo SET address_active = 0 WHERE address_id = ?';
          const body = req.body;
          const param = body.address_id;
          db.query(sqlCommend_delete, param, (err, results, fields) => {
            if (err) {
              console.log('배송 주소 기본 설정 초기화:' + err);
              res.status(400).send({msg: 'error', content: err});
            } else {
              res.status(200).send({msg: 'success'});
            }
          });
        }
      }
    });
  } else {
    console.log('요청 헤더에 승인 정보가 없음.');
  }
});
app.post('/orderRegister', (req, res) => {
  console.log('orderRegister api 없다.');
});
app.post('/api/orderRegister', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('orderRegister 에러 발생: ' + err);
      } else {
        console.log('orderRegister 데이터: ' + JSON.stringify(req));

        if (decoded.USER_ID == req.body.user_id) {
          let satisfy_coupon = 'unsatisify';
          //5만원 이상 구매 시, 쿠폰 지급 (결제 금액이 아닌 구매 금액만 초과하면 선물)
          if (req.body.total_price >= 50000) {
            const sqlCommend_gift =
              'INSERT INTO usercoupon SET coupon_id = 2 AND user_id = ?';
            const param_gift = {user_id: req.body.user_id};
            db.query(
              sqlCommend_gift,
              param_gift.user_id,
              (err_gift, results_gift, fields) => {
                if (err) {
                  satisfy_coupon = 'error';
                } else {
                  satisfy_coupon = 'success';
                }
              },
            );
          }
          //쿠폰을 사용했을 경우, 쿠폰 사용 완료 표시
          if (req.body.used_coupon_id != null) {
            const sqlCommend_useCoupon =
              'UPDATE usercoupon SET available = 0 WHERE user_id = ? AND coupon_id = ?';
            const param_useCoupon = {
              user_id: req.body.user_id,
              coupon_id: req.body.used_coupon_id,
            };
            db.query(
              sqlCommend_useCoupon,
              [param_useCoupon.user_id, param_useCoupon.coupon_id],
              (err_gift, results_gift, fields) => {
                if (err) {
                  satisfy_coupon = satisfy_coupon + 'use coupon error';
                }
              },
            );
          }

          const sqlCommend =
            'INSERT INTO ordergroup SET address_id = ?, user_id = ?, total_price = ?, satisfy_coupon = ?';
          const body = req.body;
          const param = {
            address_id: body.address_id,
            user_id: body.user_id,
            food_price: body.food_price,
            total_price: body.total_price,
            satisfy_coupon: satisfy_coupon,
            used_coupon_id: body.used_coupon_id,
          };

          db.query(
            sqlCommend,
            [
              param.address_id,
              param.user_id,
              param.food_price,
              param.total_price,
              param.satisfy_coupon,
              param.used_coupon_id,
            ],
            (err, results, fields) => {
              if (err) {
                console.log('주문 추가 요청:' + err);
                res.status(400).send({msg: 'error', content: err});
              } else {
                const insert_sql =
                  'INSERT INTO orderinfo (product_id, quantity, order_group, bulk_buy, bonus_quantity, cut_money) VALUES ';
                console.log(JSON.stringify(body.order_data));
                var order_data = body.order_data;
                order_data.map(element => {
                  element.order_group = results.insertId;
                });
                console.log(JSON.stringify(order_data));
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
                    ',' +
                    order_data[i].buyoption +
                    ',' +
                    order_data[i].bonus_quantity +
                    ',' +
                    order_data[i].cut_money +
                    ')';
                  if (i + 1 < order_data.length) {
                    order_list = order_list + ',';
                  }
                }
                const sqlCommend_insert = insert_sql + order_list;
                console.log('insert 쿼리문 전체: ' + sqlCommend_insert);

                db.query(sqlCommend_insert, (err, results, fields) => {
                  if (err) {
                    console.log('주문 추가 요청:' + err);
                    res.status(400).send({msg: 'error', content: err});
                  } else {
                    console.log(
                      '주문 등록 성공 결과값:' + JSON.stringify(results),
                    );
                    res.status(200).send({results});
                  }
                });
              }
            },
          );
        } else {
          console.log('로그인 정보와 등록 정보가 일치하지 않습니다.');
        }
      }
    });
  } else {
    console.log('요청 헤더에 승인 정보가 없음.');
  }
});

app.post('/api/orderList', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('orderList 에러 발생: ' + err);
      } else {
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend =
            'SELECT * FROM orderinfo JOIN productinfo ON orderinfo.product_id=productinfo.id WHERE order_group = ?';
          const body = req.body;
          const param = {order_group: body.order_group};

          db.query(sqlCommend, param.order_group, (err, results, fields) => {
            if (err) {
              console.log('주문 조회 요청:' + err);
              res.status(400).send({msg: 'error', content: err});
            } else {
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

app.post('/api/addressInfo', (req, res) => {
  if (req.headers.authorization != null) {
    jwt.verify(req.headers.authorization, jwtObj.secret, (err, decoded) => {
      if (err) {
        console.log('addressInfo 에러 발생: ' + err);
      } else {
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend = 'SELECT * FROM addressinfo WHERE user_id = ?';
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

app.post('/api/deliveryInfo', (req, res) => {
  const sqlCommend =
    // 'SELECT * FROM ordergroup JOIN addressinfo ON ordergroup.address_id = addressinfo.address_id WHERE ordergroup.user_id = ? ';
    'SELECT * FROM ordergroup LEFT OUTER JOIN addressinfo ON ordergroup.address_id = addressinfo.address_id WHERE ordergroup.user_id = ? AND ordergroup.order_date > DATE_SUB(NOW(), INTERVAL 14 DAY)';

  const body = req.body;
  const param = body.user_id;
  // console.log(sqlCommend + param);
  db.query(sqlCommend, param, (err, results, fields) => {
    if (results.length <= 0) {
      res.status(400).send({msg: 'error', content: err});
    } else {
      res.status(200).send({results});
    }
  });
});

app.get('/api/orderGroupInfo', (req, res) => {
  const sqlCommend = 'SELECT * FROM ordergroup WHERE ordergroup.id = ?';

  const body = req.body;
  const param = body.id;
  // console.log(sqlCommend + param);
  db.query(sqlCommend, param, (err, results, fields) => {
    if (results.length <= 0) {
      res.status(400).send({msg: 'error', content: err});
    } else {
      res.status(200).send({results});
    }
  });
});

// app.get('/productList', (req, res) => {
//   console.log(req.query);
//   const sqlCommend_v = 'SELECT * FROM storeversion';
//   db.query(sqlCommend_v, (err, results, fields) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send({msg: 'error', content: err});
//     }
//     if (results.length <= 0) {
//       res.status(400).send({msg: 'error', content: err});
//     } else {
//       // return;
//       let local_version = parseInt(req.query.version, 10);
//       if (isNaN(local_version)) {
//         local_version = 0;
//       }
//       let store_version = results[0].version;
//       console.log(store_version + '///' + local_version);
//       if (store_version > local_version) {
//         const sqlCommend = 'SELECT * FROM productinfo ORDER BY category';
//         db.query(sqlCommend, (err, results, fields) => {
//           if (results.length <= 0) {
//             res.status(400).send({msg: 'error', content: err});
//           } else {
//             const sqlCommendCate = 'SELECT DISTINCT category FROM productinfo';
//             db.query(sqlCommendCate, (err, results_category, fields) => {
//               if (results.length <= 0) {
//                 res.status(400).send({msg: 'error', content: err});
//               } else {
//                 res.status(200).send({
//                   results: results,
//                   category: results_category,
//                   version: store_version,
//                 });
//               }
//             });
//           }
//         });
//       } else {
//         res.status(200).send({msg: 'no update'});
//       }
//     }
//   });
// });

app.post('/api/mycoupon', (req, res) => {
  const sqlCommend =
    'SELECT * FROM usercoupon JOIN coupon ON usercoupon.coupon_id = coupon.id WHERE user_id = ? AND available = TRUE';

  const body = req.body;
  const param = {user_id: body.user_id};
  console.log(sqlCommend, param.user_id);
  db.query(sqlCommend, param.user_id, (err, results, fields) => {
    if (results.length <= 0) {
      res.status(400).send({msg: 'error', content: err});
    } else {
      res.status(200).send({results});
    }
  });
});
