const jwt = require('jsonwebtoken');

let jwtObj = {
  secret: 'cfomarketHogwon032^secret', // 원하는 시크릿 키
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
const salt = '7a5a0c8ff7de664b68600027a591a7a4641dcf2ba3a79140be1f140fc968d366';

function hashpw(password) {
  return crypto.pbkdf2Sync(password, salt, 100, 32, 'sha512').toString('hex');
}

const {db} = require('./models/database');
const {resourceLimits} = require('worker_threads');

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

app.post('/api/checkpw', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
        const sqlCommend =
          'SELECT * FROM userinfo WHERE id = ? AND user_pw = ? ';
        const body = req.body;
        const param = {
          user_id: body.user_id,
          user_pw: hashpw(body.user_pw),
          // user_pw: hashpw(security.decryptRsaContent(body.user_pw)),
        };
        // console.log(user_pw);
        return db.query(
          sqlCommend,
          [param.user_id, param.user_pw],
          function (err, results, fields) {
            if (results.length <= 0) {
              console.log('비밀번호 확인:' + err);
              res.status(400).send({msg: 'error', content: err});
              return resolve(1);
            } else {
              res.status(200).send({msg: 'success'});
              return resolve(1);
            }
          },
        );
      },
    );
  });
});

app.post('/api/changeuserinfo', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
        const sqlCommend =
          'UPDATE userinfo SET user_name = ? , user_phone = ? WHERE id = ? ';
        const body = req.body;
        const param = {
          user_id: body.user_id,
          user_name: body.user_name,
          user_phone: body.user_phone,
        };
        return db.query(
          sqlCommend,
          [param.user_name, param.user_phone, param.user_id],
          function (err, results, fields) {
            if (results.length <= 0) {
              console.log('비밀번호 확인:' + err);
              res.status(400).send({msg: 'error', content: err});
              return resolve(1);
            } else {
              res.status(200).send({results});
              return resolve(1);
            }
          },
        );
      },
    );
  });
});

app.post('/api/changepw', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
        const sqlCommend_select =
          'SELECT * FROM userinfo WHERE id = ? AND user_pw = ? ';
        const body = req.body;
        const param_select = {
          user_id: body.user_id,
          user_pw: hashpw(body.user_pw),
          // user_pw: hashpw(security.decryptRsaContent(body.user_pw)),
        };
        return db.query(
          sqlCommend_select,
          [param_select.user_id, param_select.user_pw],
          function (err, results, fields) {
            if (results.length <= 0) {
              console.log('비밀번호 확인:' + err);
              res.status(400).send({msg: 'error', content: err});
              return resolve(1);
            } else {
              const sqlCommend_update =
                'UPDATE userinfo SET user_pw = ? WHERE id = ? ';
              const param_update = {
                user_id: body.user_id,
                user_pw: hashpw(body.newPw),
                // user_pw: hashpw(security.decryptRsaContent(body.newPw)),
              };
              return db.query(
                sqlCommend_update,
                [param_update.user_pw, param_update.user_id],
                function (err, results, fields) {
                  if (results.length <= 0) {
                    console.log('비밀번호 변경 오류:' + err);
                    res.status(400).send({msg: 'error', content: err});
                    return resolve(1);
                  } else {
                    res.status(200).send({msg: 'success'});
                    return resolve(1);
                  }
                },
              );
            }
          },
        );
      },
    );
  });
});

app.post('/api/addressRegister', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
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

          return db.query(sqlCommend, param, function (err, results, fields) {
            if (err) {
              console.log('배송 주소 추가 요청:' + err);
              res.status(400).send({msg: 'error', content: err});
              return resolve(1);
            } else {
              if ((body.is_default = 1)) {
                // 기본 배송지로 선택하여 보낼 경우, 기존 주소의 is_default를 모두 0으로 하고 다시 설정해줌.
                const sqlCommend_reset =
                  'UPDATE addressinfo SET is_default = 0 WHERE user_id = ?';
                return db.query(
                  sqlCommend_reset,
                  param.user_id,
                  function (err, results, fields) {
                    if (err) {
                      console.log('배송 주소 기본 설정 초기화:' + err);
                      res.status(400).send({msg: 'error', content: err});
                      return resolve(1);
                    } else {
                      const sqlCommend_default =
                        'UPDATE addressinfo SET is_default = 1 WHERE user_id = ? AND address_id = ?';
                      const param_2 = {
                        user_id: body.user_id,
                        address_id: results.insertId,
                      };
                      return db.query(
                        sqlCommend_default,
                        [param_2.user_id, param_2.address_id],
                        function (err, results, fields) {
                          if (err) {
                            res.status(400).send({msg: 'error', content: err});
                            return resolve(1);
                          } else {
                            res.status(200).send({msg: 'success', results});
                            return resolve(1);
                          }
                        },
                      );
                    }
                  },
                );
              }
            }
          });
        }
      },
    );
  });
});

app.post('/api/addressChangeDefaultAddress', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend_reset =
            'UPDATE addressinfo SET is_default = 0 WHERE user_id = ?';
          const body = req.body;
          const param = body.user_id;
          return db.query(
            sqlCommend_reset,
            param,
            function (err, results, fields) {
              if (err) {
                res.status(400).send({msg: 'error', content: err});
                return resolve(1);
              } else {
                const sqlCommend_default =
                  'UPDATE addressinfo SET is_default = 1 WHERE user_id = ? AND address_id = ?';
                const param_2 = {
                  user_id: body.user_id,
                  address_id: body.address_id,
                };
                return db.query(
                  sqlCommend_default,
                  [param_2.user_id, param_2.address_id],
                  function (err, results, fields) {
                    if (err) {
                      res.status(400).send({msg: 'error', content: err});
                      return resolve(1);
                    } else {
                      const sqlCommend_select =
                        'SELECT * FROM addressinfo WHERE user_id = ?';

                      return db.query(
                        sqlCommend_select,
                        param,
                        function (err, results, fields) {
                          if (err) {
                            // console.log('배송 주소 조회 요청:' + err);
                            res.status(400).send({msg: 'error', content: err});
                            return resolve(1);
                          } else {
                            // console.log('userInfo 로그인 유저 조회 답변:' + results);
                            res.status(200).send({results});
                            return resolve(1);
                          }
                        },
                      );
                    }
                  },
                );
              }
            },
          );
        }
      },
    );
  });
});

app.post('/api/addressInfoChange', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
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
          return db.query(
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
            function (err, results, fields) {
              if (err) {
                res.status(400).send({msg: 'error', content: err});
                return resolve(1);
              } else {
                res.status(200).send({results});
                return resolve(1);
              }
            },
          );
        }
      },
    );
  });
});

app.post('/api/deleteAddress', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend_delete =
            'UPDATE addressinfo SET address_active = 0 WHERE address_id = ?';
          const body = req.body;
          const param = body.address_id;
          return db.query(
            sqlCommend_delete,
            param,
            function (err, results, fields) {
              if (err) {
                res.status(400).send({msg: 'error', content: err});
                return resolve(1);
              } else {
                res.status(200).send({msg: 'success'});
                return resolve(1);
              }
            },
          );
        }
      },
    );
  });
});

app.post('/api/giveCoupon', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
        if (decoded.USER_ID == req.body.user_id) {
          //5만원 이상 구매 시, 쿠폰 지급 (결제 금액이 아닌 구매 금액만 초과하면 선물)
          if (Number(req.body.food_price) >= 50000) {
            const sqlCommend_gift =
              'INSERT INTO usercoupon SET coupon_id = 2 , available = 1 , user_id = ?';
            const param_gift = {user_id: req.body.user_id};
            return db.query(
              sqlCommend_gift,
              param_gift.user_id,
              function (err_gift, results_gift, fields) {
                if (err_gift) {
                  res.status(400).send({msg: 'error', content: err});
                  return resolve(1);
                } else {
                  res.status(200).send({results_gift});
                  return resolve(1);
                }
              },
            );
          }
        }
      },
    );
  });
});

app.post('/api/orderRegister', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }

        if (decoded.USER_ID != req.body.user_id) {
          res
            .status(401)
            .send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
          return resolve(1);
        }

        //쿠폰을 사용했을 경우, 쿠폰 사용 완료 표시
        if (req.body.used_coupon_id != null) {
          const sqlCommend_useCoupon =
            'UPDATE usercoupon SET available = 0 WHERE user_id = ? AND coupon_id = ?';
          const param_useCoupon = {
            user_id: req.body.user_id,
            coupon_id: req.body.used_coupon_id,
          };
          return db.query(
            sqlCommend_useCoupon,
            [param_useCoupon.user_id, param_useCoupon.coupon_id],
            function (err_gift, results_gift, fields) {
              if (err_gift) {
                res.status(400).send({msg: 'use coupon error', content: err});
                return resolve(1);
              } else {
                let sqlCommend =
                  'INSERT INTO ordergroup SET address_id = ?, user_id = ?, food_price = ?, total_price = ?, satisfy_coupon = ?';
                const body = req.body;
                const param = {
                  address_id: body.address_id,
                  user_id: body.user_id,
                  food_price: body.food_price,
                  satisfy_coupon:
                    'used coupon ID :' + param_useCoupon.coupon_id,
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
                      return resolve(1);
                    } else {
                      const insert_sql =
                        'INSERT INTO orderinfo (product_id, quantity, order_group, bulk_buy, bonus_quantity, cut_money) VALUES ';
                      var order_data = body.order_data;
                      order_data.map(element => {
                        element.order_group = results.insertId;
                      });
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

                      return db.query(
                        sqlCommend_insert,
                        function (err, results, fields) {
                          if (err) {
                            res.status(500).send({msg: 'error', content: err});
                            return resolve(1);
                          } else {
                            res.status(200).send({results});
                            return resolve(1);
                          }
                        },
                      );
                    }
                  },
                );
              }
            },
          );
        } else {
          let sqlCommend =
            'INSERT INTO ordergroup SET address_id = ?, user_id = ?, food_price = ?, total_price = ?, satisfy_coupon = ?';
          const body = req.body;
          const param = {
            address_id: body.address_id,
            user_id: body.user_id,
            food_price: body.food_price,
            satisfy_coupon: 'no coupon',
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
                return resolve(1);
              } else {
                const insert_sql =
                  'INSERT INTO orderinfo (product_id, quantity, order_group, bulk_buy, bonus_quantity, cut_money) VALUES ';
                var order_data = body.order_data;
                order_data.map(element => {
                  element.order_group = results.insertId;
                });
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

                return db.query(
                  sqlCommend_insert,
                  function (err, results, fields) {
                    if (err) {
                      res.status(500).send({msg: 'error', content: err});
                      return resolve(1);
                    } else {
                      res.status(200).send({results});
                      return resolve(1);
                    }
                  },
                );
              }
            },
          );
        }
      },
    );
  });
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

app.post('/api/addressInfo', function (req, res) {
  if (!req.headers.authorization) {
    res.status(400).send({msg: '로그인 정보와 등록 정보가 일치하지 않습니다.'});
    return;
  }
  return new Promise(resolve => {
    return jwt.verify(
      req.headers.authorization,
      jwtObj.secret,
      function (err, decoded) {
        if (err) {
          res.status(500).send({msg: 'error', content: err});
          return resolve(1);
        }
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend = 'SELECT * FROM addressinfo WHERE user_id = ?';
          const body = req.body;
          const param = body.user_id;
          return db.query(sqlCommend, param, function (err, results, fields) {
            if (err) {
              // console.log('배송 주소 추가 요청:' + err);
              res.status(400).send({msg: 'error', content: err});
              return resolve(1);
            } else {
              // console.log('userInfo 로그인 유저 조회 답변:' + results);
              res.status(200).send({results});
              return resolve(1);
            }
          });
        } else {
          console.log('로그인 정보와 등록 정보가 일치하지 않습니다.');
        }
      },
    );
  });
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

app.get('/api/auth', (req, res) => {
  // var grantType= 'AuthorizationCode';
  // var code= req.params.code;
  // var  customerKey= req.params.customerKey;

  console.log(
    '브랜드페이 응답코드 확인: ' +
      req.params.code +
      '커스텀키: ' +
      req.params.customerKey,
  );
  res
    .status(200)
    .send({
      grantType: 'AuthorizationCode',
      code: req.params.code,
      customerKey: req.params.customerKey,
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

app.post('/api/mycoupon', (req, res) => {
  const sqlCommend =
    'SELECT * FROM usercoupon JOIN coupon ON usercoupon.coupon_id = coupon.id WHERE usercoupon.available = 1 AND usercoupon.user_id = ?';

  const body = req.body;
  const param = {user_id: body.user_id};
  console.log(sqlCommend, param.user_id);
  db.query(sqlCommend, param.user_id, (err, results, fields) => {
    res.status(200).send({results});
  });
});
