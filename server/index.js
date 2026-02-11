const express = require('express');
const cors = require('cors');
require('./db/dbconfig');
const app = express()

app.use(cors());
app.use(express.json());


app.listen(5000,()=>{
    console.log("Server Started on PORT 5000")
})