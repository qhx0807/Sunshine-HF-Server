var express = require('express');
var router = express.Router();
var config = require('../config/index.js').default;
var request = require('request');
var UsersModel = require('../service/user-service')

router.get('/userinfo', function (req, res, next) {
  var wxUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid'+ config.appid + '&secret=' + config.appSecret + '&code=' + req.query.code + '&grant_type=authorization_code'
  request(wxUrl, function (error, response, body) {
    console.log(response.openid)
    if(response.openid){
      var infoUrl = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + response.access_token + '&openid=' + response.openid + '&lang=zh_CN'
      request(infoUrl, function (error, response, body) {
        if(error){
          res.json({ Data: error })
        }else{
          res.json({ Data: response })
        }
      })
    }else{
      console.log(response)
    }
  });
});

router.post('/login', function(req, res, next) {
  UsersModel.login(req.body.name, req.body.pwd, function(err, users) {
    if (err) {
      console.log(err)
    }
    res.json({Data: users})
  })
})

router.put('/updateUser', function(req, res, next) {
  UsersModel.edit(req.body.id, req.body, function(err) {
    if (err) {
      res.json({ Data: err })
    }else{
      res.json({ OK: 'ok' })
    }
  })
})

module.exports = router;