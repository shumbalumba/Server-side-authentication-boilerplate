const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Defining the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//ENCRYPTING
userSchema.pre('save', function(next) {
  //access to the user model. Below is an instance of a user model
  const user = this;

  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      user.password = hash;
      next();
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  })
}

// Creating the model class
const ModelClass = mongoose.model('user', userSchema);

//Exporting
module.exports = ModelClass;
