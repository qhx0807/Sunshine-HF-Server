var mongoose = require('mongoose')

var AutoSchema = new mongoose.Schema({
  content: String
})

AutoSchema.statics = {
  query: function (cb) {
    return this.find().exec(cb)
  },
  edit: function(id, doc, cb){
    return this.update({_id: id}, doc).exec(cb)
  }
}

var AutoModel = mongoose.model('autoReplys', AutoSchema)

module.exports = AutoModel