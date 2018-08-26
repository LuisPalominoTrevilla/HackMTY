var express = require('express');
var router = express.Router();
var pool = require('../db');
const mysql = require('mysql');
var random = require('random-number');
/**
 * const gravatar = require('gravatar-api');

let options = {
    email: 'emamex98@gmail.com'
}

const avatar = gravatar.imageUrl(options);
console.log(avatar);
 */

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
        req.session.mail = result[0].mail;
        req.session.authenticated = true;
        res.send(true);
      }else {
        // Couldn't sign in
        res.send(false);
      }
    });
  });
});

router.post('/createTransaction', (req,res,next) =>{
  /*var con = mysql.createConnection({
    host: "solidario.mx/phpmyadmin",
    user: "root",
    password: "themaster",
    database: "solidario"
  });

  con.connect((err)=>{
    if(err) throw err;
    con.query("SELECT trans_id FROM transaction", (err, result)=>{  
      while(true){
        var new_id = random(randomOptions);
        var repeated = false;
        for(var i = 0; i < result.length; i++){
          if(new_id === result[i]){
            repeated = true;
            break;
          }
        }
        if(!repeated){
          break;
        }
        console.log("connected!");
        let sql = 'INSERT INTO transaction (trans_id, trans_date, client_id, shop_id, trans_type, points) VALUES (' + new_id + ', ' + '2018-08-26 07:07:08,'+ null +',' + shop_id +','+ trans_type +','+ 1 +')';
        con.query(sql, (err,result)=>{
          if(err) throw err;
          console.log("1 record inserted");
        })
      }    
    })
  });
});*/
  pool.getConnection((err, con) => {
    con.query("SELECT trans_id FROM transaction", (err, result)=>{  
      while(true){
        var shop_id = req.body.shop_id;
        var client_id = null;
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
      var sql = 'INSERT INTO transaction (trans_id, trans_date, shop_id, trans_type, points) VALUES (' + new_id + ', ' + '"2018-08-26 07:07:08",' + shop_id +',"'+ trans_type +'"' + ',' + 1 +')';   
      res.send(sql);
      
      con.query(sql, (err,result)=>{
        if(err) throw err;
        res.send(sql);  
      })
    });
  });
});
        /*var sql = "INSERT INTO transaction (trans_id, trans_date, client_id, shop_id, trans_type, points) VALUES ?";
        var values = [[ new_id, con.query('SELECT CURTIME();'),null,shop_id,trans_type,points]];
        con.query(sql, [values], function(err, result) {
          if (err) throw err;
          // Render page
          var success_page = '/success?code='+new_id;
          res.send(success_page);  
        })
      }
    }
    con.query('INSERT INTO transaction (trans_id, trans_date, client_id, shop_id, trans_type, points) VALUES (' + new_id + ', ' + '2018-08-26 07:07:08,'+ null +',' + shop_id +','+ trans_type +','+ 1 +')', ()=>{
      res.send(201, new_id);*/


router.post('/getQR', (req,res,next) =>{
  let businessID = req.body.businessID;
  if(err) throw err;
})

router.post('/logout', (req, res, next) => {
  if (req.session.authenticated) {
    req.session.authenticated = null;
    res.send(true);
  } else {
    res.send(false);
  }
});

module.exports = router;