var express = require('express');
var router = express.Router();
var pool = require('../db');
const mysql = require('mysql');

/* GET users listing. */
router.get('/', (req, res, next) => {
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query("SELECT * FROM shop", (err, result) => {
      con.release();
      if (err) throw err;
      res.json(result);
    });
  });
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query("SELECT client_id FROM client WHERE mail = " + mysql.escape(username) + " AND password = "+ mysql.escape(password), (err, result) => {
      con.release();
      if (err) throw err;
      if (result.length) {
        console.log(result[0].client_id);
        res.send(true);
      }else {
        console.log('NNONONONO');
        res.send(false);
      }
    });
  });
})

module.exports = router;