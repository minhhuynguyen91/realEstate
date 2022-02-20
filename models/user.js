const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/web/server');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  permRank: {
    type: Number,
    required: true
  },

  realEstateIds: [{type: mongoose.Schema.Types.ObjectId}],
  
  password: {
    type: String,
    required: true
  },

  passwordConf: {
    type: String,
    required: false
  }
});

userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

userSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.myprivatekey); //get the private key from the config file -> environment variable
  return token;
}


var User = mongoose.model('User', userSchema);
module.exports = User;