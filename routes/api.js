var express = require('express');
var router = express.Router();
var pool = require('../db');
const mysql = require('mysql');

 router.get('/', (req, res, next) => {
   res.send("API is alive")
 });

router.get('/getNegocios', (req, res, next) => {
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query("SELECT shop_id, shop_name, direction, c.display_name AS category, s.picture, z.zone_name AS zone FROM shop s JOIN category c ON s.category = c.cat_id JOIN zone z ON s.zone = z.zone_id", (err, result) => {
      con.release();
      if (err) throw err;
      res.json(result);
    });
  });
});

router.get('/getTransaction', (req, res, next) => {
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query("SELECT shop_id, shop_name, direction, c.display_name AS category, s.picture, z.zone_name AS zone FROM shop s JOIN category c ON s.category = c.cat_id JOIN zone z ON s.zone = z.zone_id", (err, result) => {
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
    con.query("SELECT client_id, CONCAT(names, ' ', last_names), mail AS name FROM client WHERE mail = " + mysql.escape(username) + " AND password = "+ mysql.escape(password), (err, result) => {
      con.release();
      if (err) throw err;
      if (result.length) {
        req.session.client_id = result[0].client_id;
        req.session.name = result[0].name;
        req.session.isUser = true;
        req.session.authenticated = true;
        res.send(true);
      }else {
        // Couldn't sign in
        res.send(false);
      }
    });
  });
});

router.post('/logout', (req, res, next) => {
  if (req.session.authenticated) {
    req.session = null;
    console.log(req.session);
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
