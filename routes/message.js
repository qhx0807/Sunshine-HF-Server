var express = require('express');
var router = express.Router();
var MsgModel = require('../service/msg-service')
var AutoModel = require('../service/autoreply-service')
var TelModel = require('../service/tel-services')

var config = require('../config/index.js')
var request = require('request')
var md5 = require('md5')


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
  var msgDoc = req.body
  var phone = req.body.Tel
  var password = md5(config.smsId + md5(config.smsSecret))
  var smsAdmin = encodeURI('【阳光宏帆】：管理员您好，留言板收到新的意见，请及时查看。') //给管理员发送消息模板
  var smsUser = encodeURI('您好，阳光宏帆已收到您的信息，谢谢。') // 给用户发的短信
  AutoModel.query(function(er, doc){
    var content = doc[0].content // 自动回复给留言者内容
    msgDoc.Reply.push({
      type: 0,
      content: content,
      time: new Date().toLocaleString()
    })
    var MsgInsert = new MsgModel(msgDoc)
    MsgInsert.save(function (err) {
      if(err){
        res.json({Data: err})
      }else{
        TelModel.query(function(e, d){
          console.log(d) // 管理员电话
          var telArr = []
          d.forEach(element => {
            telArr.push(element.Tel)
          })

          // 发送短信给用户 暂不启用
          // var userurl = config.smsUrl + '?username='+ config.smsId + '&password=' + password + '&mobile=' + phone + '&content=' + smsUser
          // request(adminurl, function(error, response, body){})

          //发送短信给管理员
          var adminurl = config.smsUrl + '?username='+ config.smsId + '&password=' + password + '&mobile=' + telArr.toString() + '&content=' + smsAdmin
          request(adminurl, function(error, response, body){
            if(error){
              res.json({ Data: error })
            }else{
              res.json({ OK: 'ok' })
            }
          })

        })
      }
    })
  })
});

/**
 * test
*/
router.get('/test', function(req, res, next){
  AutoModel.query(function(er, doc){
    var content = doc[0].content // 自动回复给留言者内容
    var a = {
      type: 0,
      content: content,
      time: new Date().toLocaleString()
    }
    res.json({d: a})
  })
})

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
  MsgModel.rep(req.body.id, req.body.doc, function (err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
});

router.post('/changeStatus', function(req, res, next) {
  MsgModel.changeStatus(req.body.id, function (err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
});


module.exports = router;
