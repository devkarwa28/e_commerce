const jwt = require('jsonwebtoken');

const tokenGenarator = (res, userId) =>{
    const token = jwt.sign({id: userId},"devkarwa@2004",{expiresIn: '15d'});

    res.cookie("token",token,{
        httpOnly : true,
        secure: false,
        sameSite : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

};

module.exports = tokenGenarator;

