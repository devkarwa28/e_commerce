const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/e_commerce")
.then(()=>{
    console.log("MongoDB Connected Sucessfully")
})
.catch((err)=>{
    console.log("MongoDB Connection Failed:",err)
})

module.exports = mongoose;