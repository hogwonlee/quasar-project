'use strict';
const Product = require('../models/index').ProductInfo;
const { db } = require('../models/database');

const getProductCategory = async () => {
  return await Product.findCategory();
};

const getProductList = async (req, res) => {
  const sqlCommend_v = 'SELECT * FROM storeversion';
  db.query(sqlCommend_v, (err, results, fields) => {
    if (err) {
      console.error(err);
      res.status(500).send({ msg: 'error', content: err });
      res.end();
    }
    if (results.length <= 0) {
      res.status(400).send({ msg: 'error', content: err });
      res.end();
    } else {
      let local_version = 0;


      let store_version = results[0].version;


      if (store_version > local_version) {
        const sqlCommend =
          // 'SELECT * FROM  productinfo WHERE id <= 100 ORDER BY list_index';
          'SELECT * FROM  productinfo ORDER BY list_index';
        db.query(sqlCommend, (err, results, fields) => {
          if (results.length <= 0) {
            res.status(400).send({ msg: 'error', content: err });
          } else {
            const sqlCommendCate = 'SELECT DISTINCT category FROM productinfo';
            db.query(sqlCommendCate, (err, results_category, fields) => {
              if (results.length <= 0) {
                res.status(400).send({ msg: 'error', content: err });
                res.end();
              } else {
                res.status(200).send({
                  results: results,
                  category: results_category,
                  version: store_version,
                });
                res.end();
              }
            });
          }
        });
      } else {
        res.status(200).send({ msg: 'no update', version: store_version });
        res.end();
      }
    }
  });
};

module.exports = {
  getProductCategory,
  getProductList,
};
