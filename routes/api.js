var express = require('express');
var router = express.Router();
var pool = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query("SELECT * FROM shop", (err, result) => {
      con.release();
      if (err) throw err;
      res.json(result);
    });
  })
});

module.exports = router;