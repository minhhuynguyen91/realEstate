const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.create = function(req, res) {

  // console.log('I am being called')
  // console.log(req.body)

  if(req.body.email &&
    req.body.password) {

    var userData = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData, function(err, user) {
      if (err) {
        return res.json({erros: err});
      } else {
        return res.send('success!')
      }
    })

  }
}