var mongoose = require('mongoose')

var LogSchema = new mongoose.Schema({
  time: String,
  api: String,
  method: String,
  body: Object,
  params: Object
})

LogSchema.statics = {
  query: function (page, cb) {
    return this.find({})
      .sort({_id: -1})
      .skip((page-1) * 10)
      .limit(10)
      .exec(cb)
  },
  fetch:function(cb){
    return this.find().exec(cb)
  },
  getList: function (date, cb) {
    if(!date){
      return this.find().sort({_id: -1}).exec(cb)
    }else{
      return this.find({'time': new RegExp(date, 'i')}).sort({_id: -1}).exec(cb)
    }
  },
  delete: function (id, cb) {
    return this.remove({_id: id}).exec(cb)
  }
}

var LogModel = mongoose.model('log', LogSchema)

module.exports = LogModel