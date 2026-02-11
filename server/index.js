const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
require('./db/dbconfig');
const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRouter);

app.listen(5000,()=>{
    console.log("Server Started on PORT 5000")
})