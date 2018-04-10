var express = require('express');
var router = express.Router();
var MsgModel = require('../service/msg-service')

router.get('/messages', function (req, res, next) {
  MsgModel.query(req.query.page, function(err, msgs) {
    MsgModel.fetch(function(er, all){
      if (er) {
        res.json({ Data: er })
      } else {
        res.json({ Data: msgs, Total: all.length })
      }
    })
  })
});

router.get('/onemsgs', function (req, res, next) {
  MsgModel.queryOne(req.query.openid, function(err, msgs) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ Data: msgs })
    }
  })
});

router.post('/messages', function (req, res, next) {
  var MsgInsert = new MsgModel(req.body)
  MsgInsert.save(function (err) {
    if (err) {
      res.json({ Data: err })
    } else {
      res.json({ OK: 'ok' })
    }
  })
});

router.delete('/messages', function (req, res, next) {
  MsgModel.delete(req.query.id, function (err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
});

router.post('/reply', function (req, res, next) {
  console.log(req.body)
  MsgModel.rep(req.body.id, req.body.doc, function (err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
});


module.exports = router;