var mongoose = require('mongoose')

var TelSchema = new mongoose.Schema({
  Name: String,
  Tel: String
})

TelSchema.statics = {
  query: function (cb) {
    return this.find().exec(cb)
  },
  delete: function(id, cb){
    return this.remove({_id: id}).exec(cb)
  }
}

var TelModel = mongoose.model('tel', TelSchema)

module.exports = TelModel