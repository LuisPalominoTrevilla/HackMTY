var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', (req, res, next) => {
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

router.get('/negocio', (req, res, next) => {
  res.render('negocio');
});

module.exports = router;
