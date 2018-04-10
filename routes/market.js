var express = require('express');
var router = express.Router();
var MarketModel = require('../service/market-service')

router.get('/market', function (req, res, next) {
  MarketModel.query(function (err, doc) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ Data: doc })
    }
  })
});

router.post('/market', function (req, res, next) {
  var MarketInsert = new MarketModel(req.body)
  MarketInsert.save(function (err) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ OK: 'ok' })
    }
  })
});

router.delete('/market', function (req, res, next) {
  MarketModel.delete(req.query.id, function (err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
})

module.exports = router;