var express = require('express')
var router = express.Router()
var TelModel = require('../service/tel-services')


router.get('/tels', function (req, res, next) {
  TelModel.query(function (err, doc) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ Data: doc })
    }
  })
});

router.post('/tels', function (req, res, next) {
  var TelInsert = new TelModel(req.body)
  TelInsert.save(function (err) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ OK: 'ok' })
    }
  })
});

router.delete('/tels', function (req, res, next) {
  TelModel.delete(req.query.id, function (err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
})

module.exports = router;
