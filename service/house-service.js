var mongoose = require('mongoose')

var HouseSchema = new mongoose.Schema({
  name: String
})

HouseSchema.statics = {
  query: function (cb) {
    return this.find().exec(cb)
  },
  delete: function(id, cb){
    return this.remove({_id: id}).exec(cb)
  }
}

var HouseModel = mongoose.model('house', HouseSchema)

module.exports = HouseModel