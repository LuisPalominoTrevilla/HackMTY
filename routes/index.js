const express = require('express');
const router = express.Router();
const path = require('path');
const pool = require('../db');
const mysql = require('mysql');
const gravatar = require('gravatar-api');

router.use((req, res, next) => {
  if(req.session.authenticated && req.session.isUser) {
    let options = {
      email: req.session.mail,
      parameters: { "size": "200"}
    }
    req.avatar = gravatar.imageUrl(options);
  }else if (req.session.authenticated && !req.session.isUser) {
    req.avatar = req.session.picture;
  }
  next();
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {auth: req.session.authenticated, avatar: req.avatar});
});

router.get('/about', (req, res, next) => {
  res.render('about', {auth: req.session.authenticated, avatar: req.avatar});
});

router.get('/listing', (req, res, next) => {
  res.render('listing', {auth: req.session.authenticated, avatar: req.avatar});
});

router.get('/contact', (req, res, next) => {
  res.render('contact', {auth: req.session.authenticated, avatar: req.avatar});
});

router.get('/profile', (req,res,next) => {
  // Restrict access to unauthorized personel
  if (!req.session.authenticated) {
    res.redirect( '/');
    return;
  }else if (!req.session.isUser){
    res.render('local', {auth: req.session.authenticated, avatar: req.avatar, picture: req.session.picture, shop_name: req.session.shop_name});
    return;
  }
  res.render('profile', {auth: req.session.authenticated, avatar: req.avatar, name: req.session.name, last_name: req.session.last_name, score: req.session.score});
});

router.get('/transaction/:id', (req,res,next) => {
  if(req.session.authenticated == true){
    if(req.session.isUser == true){
      let user_id = req.session.client_id;
      let trans_id = req.params.id;
      pool.getConnection((err,con) => {
        if(err) throw err;
        con.query('SELECT client_id, points FROM transaction WHERE trans_id=' + mysql.escape(trans_id), (err, results) => {
          if(err){
            throw err;
            con.release();
          }
          if(results.length == 0){
            res.redirect('/');
            return;
          }
          let trans_points = results[0].points;
          if(results[0].client_id == null){
            con.query('UPDATE transaction SET client_id=' + mysql.escape(user_id) + ' WHERE trans_id=' + mysql.escape(trans_id), (err, answer) => {
              if(err){
                throw err;
                con.release();
              }
              con.query('SELECT score FROM client WHERE client_id=' + mysql.escape(user_id), (err, answer) => {
                if(err){
                  throw err;
                  con.release();
                }
                let sum = answer[0].score + trans_points;
                if(sum >= 0){
                  con.query('UPDATE client SET score=' + mysql.escape(sum) +' WHERE client_id=' + mysql.escape(user_id), (err, answer) => {
                    if(err){
                      throw err;
                      con.release();
                    }
                    con.query('SELECT names FROM client WHERE client_id = ' + mysql.escape(user_id), (err, answer) => {
                      if(err) throw err;
                      con.release();
                      if(trans_points > 0) res.render('transaction', {auth: req.session.authenticated, avatar: req.avatar, login: "", name: answer[0].names + ", ", points: "¡HAZ GANADO " + trans_points + " PUNTOS!"});
                      else res.render('transaction', {auth: req.session.authenticated, avatar: req.avatar, login: "", name: answer[0].names + ", ", points: "¡HAZ CANJEADO " + trans_points*-1 + " PUNTOS!"});
                    });
                  });
                } else {
                  res.render('transaction', {auth: req.session.authenticated, avatar: req.avatar, login: "", name: "", points: "NO TIENES SUFICIENTES PUNTOS EN TU CUENTA"});
                }
              });
            });
          } else {
            res.redirect('/');
            return;
          }
        });
      });
    } else {
      res.redirect('/');
      return;
    }
  } else {
    res.render('transaction', {auth: req.session.authenticated, avatar: req.avatar, login: "/js/loginForced.js", name: "", points: ""});
  }

});

router.get('/negocio/:id', (req, res, next) => {
  let shop_id = req.params.id;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query('SELECT shop_name, direction, c.display_name AS category, s.latitude, s.longitude, s.picture FROM shop s JOIN category c ON s.category = c.cat_id WHERE s.shop_id =' + mysql.escape(shop_id), (err, results) => {
      con.release();
      if(err) throw err;
      if(results.length != 0) {
        res.render('negocio', { image: results[0].picture, name: results[0].shop_name, direction: results[0].direction, category: results[0].category, lat: results[0].latitude, lgt: results[0].longitude, auth: req.session.authenticated, avatar: req.avatar });
      }else{
        next();
      }
    });
  });
});


module.exports = router;
