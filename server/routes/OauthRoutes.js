const express = require('express');
const passport = require('../config/passport');
const tokenGenerator  = require('../utils/tokenGenerator');

const OauthRouter = express.Router();

OauthRouter.get("/google",passport.authenticate("google",
    {scope:["profile","email"]}
));

OauthRouter.get("/google/callback",passport.authenticate("google",{
    session: false,
    failureRedirect: "/login"
}),(req,res)=>{
    tokenGenerator(res,req.user._id);
    res.redirect(process.env.CLIENT_URL)
})

module.exports = OauthRouter;