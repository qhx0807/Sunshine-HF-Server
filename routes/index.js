var express = require('express');
var router = express.Router();
var config = require('../config/index.js').default

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

module.exports = router;