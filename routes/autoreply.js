var express = require('express')
var router = express.Router()
var AutoModel = require('../service/autoreply-service')


router.get('/autoreply', function (req, res, next) {
  AutoModel.query(function (err, doc) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ Data: doc })
    }
  })
});

router.post('/autoreply', function (req, res, next) {
  AutoModel.edit(req.body._id, req.body, function (err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
});


module.exports = router;
