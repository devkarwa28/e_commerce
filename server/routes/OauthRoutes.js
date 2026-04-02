const express = require('express');
const passport = require('../config/passport');
const tokenGenarator = require('../utilites/tokenGenarator');

const OauthRouter = express.Router();

OauthRouter.get("/google",passport.authenticate("google",
    {scope:["profile","email"]}
));

OauthRouter.get("/google/callback",passport.authenticate("google",{
    session: false,
    failureRedirect: "/login"
}),(req,res)=>{
    try{
        console.log("USER:", req.user);

      if (!req.user) {
        return res.status(400).send("User not found");
      }

      tokenGenarator(res, req.user._id);

      console.log("TOKEN SET SUCCESS");

      res.redirect(process.env.CLIENT_URL);
    }
    catch(err){
        console.error("GOOGLE CALLBACK ERROR:", err);
      res.status(500).send(err.message);
    }
})

module.exports = OauthRouter;