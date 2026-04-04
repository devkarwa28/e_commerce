require('dotenv').config({ path: '.env.local' });
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const categoryRouter = require('./routes/categoryRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRoutes');
const adminRouter = require('./routes/adminRoutes');
const couponRouter = require('./routes/couponRoutes');
const bannerRouter = require('./routes/bannerRoutes');
const passport = require('passport');
require('./config/passport');
const OauthRouter = require('./routes/OauthRoutes');
const wishRouter = require('./routes/wishlistRoutes');
require('./config/dbconfig');
const app = express()
app.set('trust proxy',1)
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    if (origin.endsWith("-dev-karwas-projects.vercel.app")) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(passport.initialize());

app.use('/api/auth',authRouter);
app.use('/auth',OauthRouter)
app.use('/api/category',categoryRouter);
app.use('/api/products',productRouter);
app.use('/api/reviews',reviewRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/admin',adminRouter);
app.use('/api/coupons',couponRouter);
app.use('/api/banners',bannerRouter);
app.use("/api/wishlist",wishRouter)

app.listen(5000,()=>{
    console.log("Server Started on PORT 5000")
})