const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user)});
}

exports.signup = function(req, res, next) {
//See if a user with a given email exists
const email = req.body.email;
const password = req.body.password;

if(!email || !password) {
  return res.status(422).send({ error: 'both password and email pls ;)'});
}

User.findOne({ email: email }, function(err, existingUser) {
  if(err) { return next(err); }

  if (existingUser) {
    return res.status(422).send({ error: 'Email is in use' });
  }

  const user = new User({
    email: email,
    password: password
  });

  user.save(function(err){
    if(err) { return next(err); }

    res.json({ token: tokenForUser(user) });
  });

});

}
