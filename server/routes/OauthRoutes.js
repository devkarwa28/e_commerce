const express = require('express');
const passport = require('../config/passport');
const tokenGen = require('../utilites/tokenGen');

const OauthRouter = express.Router();

OauthRouter.get("/google", passport.authenticate("google",
    { scope: ["profile", "email"] }
));

OauthRouter.get("/google/callback", 
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`
    }), 
    (req, res) => {
        try {
            if (!req.user) {
                return res.redirect(`${process.env.CLIENT_URL}/login?error=user_not_found`);
            }

            // ✅ Generate JWT token string directly — don't use res here
            const jwt = require('jsonwebtoken');
            const token = jwt.sign(
                { id: req.user._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' }
            );

            // ✅ Set cookie manually
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            // ✅ Then redirect — cookie and redirect are now separate, no conflict
            return res.redirect(`${process.env.CLIENT_URL}/oauth-success`);
        }
        catch (err) {
            console.error("GOOGLE CALLBACK ERROR:", err);
            return res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
        }
    }
);

module.exports = OauthRouter;