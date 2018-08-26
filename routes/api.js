var express = require('express');
var router = express.Router();
var pool = require('../db');
const mysql = require('mysql');
var random = require('random-number');

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

router.get('/getTransactions', (req, res, next) => {
  sql = "";
  if (req.session.authenticated && req.session.isUser) {
    sql = "SELECT t.trans_date, t.trans_type, t.points, s.shop_name FROM transaction t JOIN shop s ON t.shop_id = s.shop_id WHERE t.client_id = "+mysql.escape(req.session.client_id)+" ORDER BY t.trans_date DESC";
  }else if (req.session.authenticated && !req.session.isUser) {
    sql = "SELECT t.trans_date, t.trans_type, t.points, CONCAT(c.names, ' ' , c.last_names) As name FROM transaction t JOIN client c ON t.client_id = c.client_id WHERE t.shop_id = "+mysql.escape(req.session.shop_id)+" ORDER BY t.trans_date DESC";
  }
  console.log(sql);
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(sql, (err, result) => {
      con.release();
      if (err) throw err;
      res.json(result);
    });
  });
});

router.post('/createTransaction', (req,res,next) =>{
  if(req.session.authenticated && !req.session.isUser){
    pool.getConnection((err, con) => {
      con.query("SELECT trans_id FROM transaction", (err, result)=>{
        while(true){
          var shop_id = req.session.shop_id;
          var trans_type = req.body.trans_type;
          var points = req.body.points;
          var repeated = false;
          var randomOptions = {
            min: 1,
            max: 999999999,
            integer: true
          }
          var new_id = random(randomOptions);
          repeated = false;
          for(var i = 0; i < result.length; i++){
            if(new_id === result[i]){
              repeated = true;
              break;
            }
          }
          if(!repeated){
            break;
          }
        }
        let NOW = new Date();
        var options = { day: 'numeric', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
        NOW = NOW.toLocaleDateString('en-US', options).replace(" AM", "").replace(",", "").split(" ");
        const month = NOW[0].split('/')[0];
        const day = NOW[0].split('/')[1];
        const year = NOW[0].split('/')[2];
        NOW = year + "-" + month + "-" + day + " " + NOW[1];
        console.log(NOW);
        var sql = 'INSERT INTO transaction (trans_id, trans_date, shop_id, trans_type, points) VALUES (' + new_id + ', "' + NOW  + '"' + "," + shop_id +',"'+ trans_type +'"' + ',' + points +')';
        console.log(sql)
        con.query(sql, (err,result)=>{
          if(err) throw err;
          res.send(200, new_id);
        });
      });
    });
  }
});


router.post('/getQR', (req,res,next) =>{
  let businessID = req.body.businessID;
  if(err) throw err;
})

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
      con.query("SELECT shop_id, shop_name, picture FROM shop WHERE shop_id = " +mysql.escape(username) + " and password = " + mysql.escape(password), (err, result) => {
        console.log(result);
        con.release();
        if (err) throw err;
        if(result.length) {
          // If shop username and password was correct
          req.session.authenticated = true;
          req.session.isUser = false;
          req.session.shop_id = result[0].shop_id;
          req.session.picture = result[0].picture;
          req.session.shop_name = result[0].shop_name;
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
