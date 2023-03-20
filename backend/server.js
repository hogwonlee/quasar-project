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
    expiresIn: '30m', // 토큰 유효 기간
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
  console.log('세션' + JSON.stringify(req.headers.authorization));
  // console.log('쿠키' + req.cookies);
  const sqlCommend =
    'SELECT * FROM USERINFO WHERE user_id = ? AND user_pw = ? ';
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
          console.log(results[0].user_name);
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
          console.log('토큰 생겼나?' + token);
          // req.session.isLoggedIn = true;
          // console.log(req.session);
          // req.session.save(function () {
          // res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
          // res.write('<h1>Login Success</h1>');
          // res.locals.isLoggedIn = req.session.isLoggedIn;
          // console.log(res.locals);
          // res.cookie('loginId', results[0].user_name, {maxAge: 60000});
          // console.log('서버 응답 쿠키 생겼나?' + req.cookies);
          // res.write(body)
          res.status(200).send({token, results});
          // });
        }
      },
    );
  }
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
        console.log('에러 발생: ' + err);
      } else {
        // console.log('디코디드: ' + decoded.USER_ID);
        if (decoded.USER_ID == req.body.user_id) {
          const sqlCommend = 'INSERT INTO ADDRESSINFO SET ?';
          const body = req.body;
          console.log(body);
          const param = {
            recipient: body.recipient,
            recipientPhone: body.recipientPhone,
            postCode: body.postCode,
            address: body.address,
            user_id: body.user_id,
          };

          db.query(sqlCommend, param, (err, results, fields) => {
            if (err) {
              console.log('배송 주소 추가 요청:' + err);
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

app.get('/userInfo', (req, res) => {
  const sqlCommend = 'SELECT * FROM USERINFO WHERE user_id = ?';
  const param = req.query.user_id;
  // console.log(param);

  db.query(sqlCommend, param, (err, results, fields) => {
    if (err) {
      console.log('회원 정보 조회:' + err);
      res.status(400).send({msg: 'error', content: err});
    } else {
      res.status(200).send(results);
    }
  });
});
