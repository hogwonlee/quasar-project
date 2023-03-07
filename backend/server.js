// import http from 'http';
// import express from 'express';
// import serveStatic from 'serve-static';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import expressSession from 'express-session';
// import bodyParser from 'body-parser';

const express = require('express');
const serveStatic = require('serve-static');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

// const __dirname = path.resolve();
const app = express(); // express Server

app.set('port', 3001);

const appServer = http.createServer(app);

appServer.listen(app.get('port'), () => {
  console.log(`${app.get('port')}에서 서버실행중.`);
});

// 미들웨어를 등록한다
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식하지 않는 문제 해결
    extended: false,
  }),
);

// cookie and session assign middleWare
app.use(cookieParser());

// 세션세팅
app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
  }),
);

// app.get('/process/example', (req, res) => {
//   if (req.session.user) {
//     // 세션에 유저가 존재한다면
//     res.redirect('/example.html'); // 예시로
//   } else {
//     res.redirect('/login.html'); // fhrmdlsdmfh
//   }
// });

app.get('/login', (req, res) => {
  console.log('로그인 함수가 실행됩니다.');
  console.log(req);
  // console.log(req.body.data);
  // console.log(req.password);
  res.send('로그인 함수 응답함.');

  // const paramID = req.body.user.id || req.query.user.id;
  // const pw = req.body.user.password || req.query.user.password;

  // if (req.session.user) {
  //   // 세션에 유저가 존재한다면
  //   console.log('이미 로그인 돼있습니다~');
  //   res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
  //   res.write('<h1> already Login</h1>');
  //   res.write(`[ID] : ${paramID} [PW] : ${pw}`);
  //   res.write('<a href="/process/example">예시로</a>');
  //   res.end();
  // } else {
  //   req.session.user = {
  //     id: paramID,
  //     pw: pw,
  //     name: 'UsersNames!!!!!',
  //     authorized: true,
  //   };
  //   res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
  //   res.write('<h1>Login Success</h1>');
  //   res.write(`[ID] : ${paramID} [PW] : ${pw}`);
  //   res.write('<a href="/process/example">Move</a>');
  //   res.end();
  // }
});

// app.get('/process/logout', (req, res) => {
//   console.log('로그아웃');

//   if (req.session.user) {
//     console.log('로그아웃중입니다!');
//     req.session.destroy(err => {
//       if (err) {
//         console.log('세션 삭제시에 에러가 발생했습니다.');
//         return;
//       }
//       console.log('세션이 삭제됐습니다.');
//       res.redirect('/login.html');
//     });
//   } else {
//     console.log('로그인이 안돼있으시네요?');
//     res.redirect('/login.html');
//   }
// });
// const appServer = http.createServer(app);

// appServer.listen(app.get('port'), () => {
//   console.log(`${app.get('port')}에서 서버실행중.`);
// });
