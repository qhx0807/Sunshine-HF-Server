var mongoose = require('mongoose')

var MarketSchema = new mongoose.Schema({
  name: String
})

MarketSchema.statics = {
  query: function (cb) {
    return this.find().exec(cb)
  },
  delete: function(id, cb){
    return this.remove({_id: id}).exec(cb)
  }
}

var MarketModel = mongoose.model('market', MarketSchema)

module.exports = MarketModel