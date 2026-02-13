const express = require('express');
const cors = require('cors');
const path = require('path')
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const cartRouter = require('./routes/cartRouter');
require('./db/dbconfig');
const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRouter);
app.use('/uploads', express.static(path.join(__dirname,"uploads")));
app.use('/api/category',categoryRouter);
app.use('/api/products',productRouter);
app.use('/api/reviews',reviewRouter);
app.use('/api/cart',cartRouter)

app.listen(5000,()=>{
    console.log("Server Started on PORT 5000")
})