var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/about', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/about.html'));
});

router.get('/listing', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/listing.html'));
});

router.get('/contact', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/contact.html'));
});

module.exports = router;
