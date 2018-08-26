var express = require('express');
var router = express.Router();
var path = require('path');
const pool = require('../db');
const mysql = require('mysql');

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.session);
  res.render('index');
});

router.get('/about', (req, res, next) => {
  res.render('about');
});

router.get('/listing', (req, res, next) => {
  res.render('listing');
});

router.get('/contact', (req, res, next) => {
  res.render('contact');
});

router.get('/negocio/:id', (req, res, next) => {
  let shop_id = req.params.id;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query('SELECT shop_name, direction, c.display_name AS category, s.latitude, s.longitude, s.picture FROM shop s JOIN category c ON s.category = c.cat_id WHERE s.shop_id =' + mysql.escape(shop_id), (err, results) => {
      con.release();
      if(err) throw err;
      if(results.length != 0) {
        res.render('negocio', { image: results[0].picture, name: results[0].shop_name, direction: results[0].direction, category: results[0].category, lat: results[0].latitude, lgt: results[0].longitude });
      }else{
        next();
      }
    });
  });
});

module.exports = router;
