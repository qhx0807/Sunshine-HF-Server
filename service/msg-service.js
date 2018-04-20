var mongoose = require('mongoose')

var MsgSchema = new mongoose.Schema({
  Type: String,
  HouseId: String,
  HouseName: String,
  DoorNumber: String,
  MarketId: String,
  MarketName: String,
  ProjectId: String,
  ProjectName: String,
  ProjectContent: String,
  Openid: String,
  Name: String,
  Tel: String,
  Content: String,
  Picture: Array,
  Reply: Array,
  Status: String,
  Date: String
})

MsgSchema.statics = {
  delete: function(id, cb){
    return this.remove({_id: id}).exec(cb)
  },
  query: function (page, cb) {
    return this.find({})
      .sort({_id: -1})
      .skip((page-1) * 10)
      .limit(10)
      .exec(cb)
  },
  fetch: function(cb){
    return this.find().exec(cb)
  },
  rep: function(id, doc, cb){
    return this.update({_id: id}, { $push: {Reply: doc}, $set: {'Status':'已处理'} }).exec(cb)
  },
  queryOne: function(openid, cb){
    return this.find({Openid: openid}).sort({_id: -1}).exec(cb)
  }
}

var MsgModel = mongoose.model('messages', MsgSchema)

module.exports = MsgModel