const multer = require('multer');
const path = require('path');
const { MIMEType } = require('util');

const storage = multer.diskStorage({
    destination: function (req,file, cb) {
        cb(null,"uploads/");
    },
    filename: function (req,file,cb) {
        cb(
            null,
            Date.now() + "-" + Math.round(Math.round() * 1E9 ) + path.extname(file.originalname)
        ); 
    }
});

const upload = multer({
    storage,
    fileFilter: function (req,file,cb){
        const filetypes = /jpg|jpeg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if(extname && MIMEType)
        {
            return cb(null,true);
        }
        else{
            cb("Images Only");
        }
    }
})

module.exports = upload;