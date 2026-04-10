const express = require('express');
const passport = require('../config/passport');

const OauthRouter = express.Router();

OauthRouter.post("/set-cookie", (req, res) => {
    const { token } = req.body;

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ success: true });
});
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

            
            const jwt = require('jsonwebtoken');
            const token = jwt.sign(
                { id: req.user._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: '7d' }
            );

            return res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
        }
        catch (err) {
            console.error("GOOGLE CALLBACK ERROR:", err);
            return res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
        }
    }
);

module.exports = OauthRouter;