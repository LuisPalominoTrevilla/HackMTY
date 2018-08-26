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
    if (username.includes("@")){
      con.query("SELECT client_id, score, names AS name, last_names AS last_name FROM client WHERE mail = " + mysql.escape(username) + " AND password = "+ mysql.escape(password), (err, result) => {
        con.release();
        if (err) throw err;
        if (result.length) {
          req.session.client_id = result[0].client_id;
          req.session.name = result[0].name;
          req.session.last_name = result[0].last_name;
          req.session.mail = username;
          req.session.isUser = true;
          req.session.score = result[0].score;
          req.session.authenticated = true;
          res.send(true);
        }else {
          // Couldn't sign in
          res.send(false);
        }
      });
    }else if (!isNaN(username)) {
      // It's a shop
      username = parseInt(username);
      con.query("SELECT shop_id, picture FROM shop WHERE shop_id = " +mysql.escape(username) + " and password = " + mysql.escape(password), (err, result) => {
        console.log(result);
        con.release();
        if (err) throw err;
        if(result.length) {
          // If shop username and password was correct
          req.session.authenticated = true;
          req.session.isUser = false;
          req.session.shop_id = result[0].shop_id;
          req.session.picture = result[0].picture;
          res.send(true);
        }else{
          // couldn't sign in
          res.send(false);
        }
      });
    }else{
      res.send(false);
    }
  });
});

router.post('/logout', (req, res, next) => {
  if (req.session.authenticated) {
    req.session.authenticated = false;
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;
