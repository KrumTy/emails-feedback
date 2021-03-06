const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, COOKIE_KEY } = require('../config/keys');

const THITY_DAYS = 30 * 24 * 60 * 60 * 1000;
const User = mongoose.model('users');

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, { id, displayName }, done) => User.findOrCreate({ googleId: id, name: displayName }, done)
  )
);

module.exports = app => {
  app.use(
    cookieSession({
      maxAge: THITY_DAYS,
      keys: [COOKIE_KEY]
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
