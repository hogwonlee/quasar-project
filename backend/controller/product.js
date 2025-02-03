'use strict';
const Product = require('../models/index').ProductInfo;
const {db} = require('../models/database');

const getProductCategory = async () => {
  return await Product.findCategory();
};

const getProductList = async (req, res) => {
  // console.log(req.query);
  const sqlCommend_v = 'SELECT * FROM storeversion';
  db.query(sqlCommend_v, (err, results, fields) => {
    if (err) {
      console.error(err);
      res.status(500).send({msg: 'error', content: err});
    }
    if (results.length <= 0) {
      res.status(400).send({msg: 'error', content: err});
    } else {
      let local_version = 0;
      // let local_version = new Date('1900-00-00 00:00:00');
      // console.log('클라 값에 의한 생성값: ' + local_version);
      // if (isNaN(req.query.version)) {
      //   local_version = new Date()
      // }
      console.log(
        '클라 요청 시간: ' +
          req.query.version +
          '클라 요청 시간: ' +
          local_version,
      );
      let store_version = results[0].storeversion;
      console.log(
        '서버 시간: ' + results[0].storeversion + '서버 시간: ' + store_version,
      );

      // console.log(
      //   '서버 상점 시간: ' +
      //     store_version.getDate() +
      //     '클라 상점 시간:' +
      //     local_version.getDate() +
      //     '날짜 비교: ' +
      //     store_version.getDate() >
      //     local_version.getDate(),
      // );

      if (store_version > local_version) {
        const sqlCommend =
          // 'SELECT * FROM  productinfo WHERE id <= 100 ORDER BY list_index';
          'SELECT * FROM  productinfo ORDER BY list_index';
        db.query(sqlCommend, (err, results, fields) => {
          if (results.length <= 0) {
            res.status(400).send({msg: 'error', content: err});
          } else {
            const sqlCommendCate = 'SELECT DISTINCT category FROM productinfo';
            db.query(sqlCommendCate, (err, results_category, fields) => {
              if (results.length <= 0) {
                res.status(400).send({msg: 'error', content: err});
              } else {
                res.status(200).send({
                  results: results,
                  category: results_category,
                  version: store_version,
                });
              }
            });
          }
        });
      } else {
        res.status(200).send({msg: 'no update'});
      }
    }
  });
};

module.exports = {
  getProductCategory,
  getProductList,
};
