const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/UserModel');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL || 'http://localhost:5000'}/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                provider: 'google',
                password: "google-auth",
                uname: profile.displayName
            });
            await newUser.save();
            done(null, newUser);
        } catch (error) {
            done(error, null);
        }
    })
)
module.exports = passport;