'use strict';
const Product = require('../models/index').ProductInfo;
const {db} = require('../models/database');

const getStoreVersion = async (req, res) => {
  const sqlCommend_v = 'SELECT * FROM storeversion';
  db.query(sqlCommend_v, (err, version_results, fields) => {
    if (err) {
      console.error(err);
      res.status(500).send({msg: 'error', content: err});
      res.end();
    }
    if (version_results.length <= 0) {
      res.status(400).send({msg: 'error', content: err});
      res.end();
    } else {
      res.status(200).send({
        results: version_results[0].version,
      });
      res.end();
    }
  });
};
const getProductCategory = async () => {
  return await Product.findCategory();
};

const getProductList = async (req, res) => {
  const sqlCommend =
    // 'SELECT * FROM  productinfo WHERE id <= 100 ORDER BY list_index';
    'SELECT * FROM  productinfo where list_index>=? && list_index<? ORDER BY list_index';
  const param = {
    list_index_min: req.query.list_index_min,
    list_index_max: req.query.list_index_max,
  };
  db.query(
    sqlCommend,
    [param.list_index_min, param.list_index_max],
    (err, results, fields) => {
      // console.log('sql query 결과: ' + JSON.stringify(results));
      if (results.length <= 0) {
        res.status(400).send({msg: 'error', content: err});
      } else {
        res.status(200).send({
          results: results,
          // category: results_category,
        });
        res.end();
      }
    },
  );
};
module.exports = {
  getStoreVersion,
  getProductCategory,
  getProductList,
};
