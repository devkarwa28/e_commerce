const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/UserModel');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
    }, async (accessToken, refreshToken, profile, done) => {
        try {
             const existingGoogleUser = await User.findOne({ googleId: profile.id });
            if (existingGoogleUser) {
                return done(null, existingGoogleUser);
            }

            const existingEmailUser = await User.findOne({ email: profile.emails[0].value });
            if (existingEmailUser) {
                existingEmailUser.googleId = profile.id;
                existingEmailUser.provider = "google";
                if (!existingEmailUser.avatar) {
                    existingEmailUser.avatar = profile.photos[0].value;
                }
                await existingEmailUser.save();
                return done(null, existingEmailUser);
            }
            const newUser = new User({
                googleId: profile.id,
                uname: profile.displayName,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
                provider: 'google',
                password: "google-auth",
                
            });
            await newUser.save();
            done(null, newUser);
        } catch (error) {
            done(error, null);
        }
    })
)
module.exports = passport;