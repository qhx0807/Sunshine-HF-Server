var express = require('express');
var router = express.Router();
var config = require('../config/index.js')
var request = require('request')
var md5 = require('md5')

var creatRandomNum = function(){
  var n = ''
  for (var i = 0; i < 6; i++) {
    n += Math.floor(Math.random()*10)
  }
  return n
}

router.get('/verifycode', function (req, res, next) {
  var code = creatRandomNum()
  var password = md5(config.smsId + md5(config.smsSecret))
  var mobile = req.query.mobile
  var tmp = `【阳光宏帆】：${code}是您本次提交留言的验证码，10分钟内有效，请及时录入。谢谢！`
  var content = encodeURI(tmp)
  var url = config.smsUrl + '?username='+ config.smsId + '&password=' + password + '&mobile=' + mobile + '&content=' + content
  request(url, function(error, response, body){
    if(error){
      res.json({ Data: error })
    }else{
      res.json({ code: code, sms: response.body })
    }
  })
})

module.exports = router;