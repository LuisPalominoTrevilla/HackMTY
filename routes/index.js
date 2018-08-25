var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/googlemaps.html', (req,res,next) =>{
  res.render('googlemaps');
});

module.exports = router;
