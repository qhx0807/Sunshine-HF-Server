var express = require('express')
var router = express.Router()
var LogModel = require('../service/log-service')


router.get('/log', function(req, res, next) {
  LogModel.query(req.query.page, function(err, log) {
    LogModel.fetch(function(er, all){
      if (er) {
        res.json({ Data: er })
      } else {
        res.json({ Data: log, Total: all.length })
      }
    })
  })
})

router.delete('/log', function(req, res, next) {
  LogModel.delete(req.query.id, function(err) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ OK: 'ok' })
    }
  })
})


module.exports = router