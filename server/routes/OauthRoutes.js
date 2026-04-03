const express = require('express');
const passport = require('../config/passport');
const tokenGen = require('../utilites/tokenGen');

const OauthRouter = express.Router();

OauthRouter.get("/google", passport.authenticate("google",
    { scope: ["profile", "email"] }
));

OauthRouter.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`
}), (req, res) => {
    try {
        if (!req.user) {
            return res.redirect(`${process.env.CLIENT_URL}/login?error=user_not_found`);
        }
        tokenGen(res, req.user._id);

        res.redirect(`${process.env.CLIENT_URL}/oauth-success`);
    }
    catch (err) {
        console.error("GOOGLE CALLBACK ERROR:", err);
        res.status(500).send(err.message);
    }
})

module.exports = OauthRouter;