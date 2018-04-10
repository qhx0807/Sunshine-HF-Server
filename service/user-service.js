var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
  name: String,
  pwd: String
})

UserSchema.statics = {
  query: function (cb) {
    return this.find().exec(cb)
  },
  delete: function(id, cb){
    return this.remove({_id: id}).exec(cb)
  },
  login: function(name, pwd, cb) {
    return this.findOne({ name: name, pwd: pwd }).exec(cb)
  },
  edit: function(id, doc, cb){
    return this.update({_id: id}, doc).exec(cb)
  },
}

var UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel