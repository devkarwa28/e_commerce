const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req,file, cb) {
        cb(null,"uploads/");
    },
    filename: function (req,file,cb) {
        cb(
            null,
            Date.now() + "-" + Math.round(Math.random() * 1E9 ) + path.extname(file.originalname)
        ); 
    }
});

const upload = multer({
    storage,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: function (req,file,cb){
        const filetypes = /jpg|jpeg|png|webp/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype =  filetypes.test(file.mimetype);

        if(extname && mimetype)
        {
          cb(null,true);
        }
        else{
            cb("Images Only");
        }
    }
})

module.exports = upload;