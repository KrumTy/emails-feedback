const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, cb) => {
      new User({
        googleId: profile.id,
        name: profile.displayName
      }).save();
      // console.log('accessToken', accessToken);
      // console.log('profile', profile);
      // User.findOrCreate({ googleId: profile.id }, cb);
    }
  )
);
