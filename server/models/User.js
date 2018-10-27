const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  credits: { type: Number, default: 0 }
});

userSchema.statics.findOrCreate = async function findOrCreate(profile, done) {
  const localProfile = await this.findOne({ googleId: profile.googleId });

  if (!localProfile) {
    const user = await new this(profile).save();
    return done(null, user);
  }

  return done(null, localProfile);
};

mongoose.model('users', userSchema);
