var express = require('express');
var router = express.Router();
var HouseModel = require('../service/house-service')

router.get('/house', function (req, res, next) {
  HouseModel.query(function (err, msgs) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ Data: msgs })
    }
  })
});

router.post('/house', function (req, res, next) {
  var HouseInsert = new HouseModel(req.body)
  HouseInsert.save(function (err) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ OK: 'ok' })
    }
  })
});

router.delete('/house', function (req, res, next) {
  HouseModel.delete(req.query.id, function (err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
})

module.exports = router;