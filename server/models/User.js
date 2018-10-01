const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String
});

userSchema.statics.findOrCreate = function findOrCreate(profile, done) {
  this.findOne({ googleId: profile.googleId }, (error, localProfile) => {
    if (error) return done(error);

    if (!localProfile) {
      return new this(profile).save().then(user => done(null, user));
    }

    return done(error, localProfile);
  });
};

mongoose.model('users', userSchema);
