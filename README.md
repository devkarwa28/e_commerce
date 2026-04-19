# 🌰 Nutrivia — Premium Dry Fruits E-Commerce Platform
 
> A production-grade, full-stack e-commerce web application for a premium dry fruits brand — featuring a rich storefront, complete shopping flow, Razorpay payment integration, Google OAuth, Redis caching, and a powerful admin dashboard.
 
![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb)
![Redis](https://img.shields.io/badge/Redis-Upstash-red?logo=redis)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image_CDN-blue?logo=cloudinary)
![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0040ff?logo=razorpay)
![License](https://img.shields.io/badge/License-MIT-yellow)
 
---
 
## 📸 Preview
 
> A modern, mobile-friendly storefront with a luxury feel — built with Next.js App Router, MUI v7, and a Node.js/Express REST API backend with JWT cookie auth, Redis caching, and Cloudinary CDN.
 
---
 
## 🗂️ Table of Contents
 
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [API Reference](#-api-reference)
  - [Auth](#auth)
  - [OAuth (Google)](#oauth-google)
  - [User](#user)
  - [Products](#products)
  - [Categories](#categories)
  - [Cart](#cart)
  - [Orders](#orders)
  - [Reviews](#reviews)
  - [Coupons](#coupons)
  - [Banners](#banners)
  - [Wishlist](#wishlist)
  - [Payment (Razorpay)](#payment-razorpay)
  - [Admin Analytics](#admin-analytics)
- [Design System](#-design-system)
- [Caching Strategy](#-caching-strategy)
- [Authentication Flow](#-authentication-flow)
- [Deployment](#-deployment)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)
---
 
## ✨ Features
 
### 🛍️ Storefront
- **Hero Banner** — Admin-managed, auto-playing slider with promotional slides
- **Category Showcase** — Visual grid for browsing product categories
- **Best Sellers** — Carousel of top-rated/featured products with star ratings
- **Product Listing** — Filterable & paginated product grid with server-side + Redis caching
- **Advanced Filtering** — Filter by category, price range, featured status, and full-text search
- **Product Detail Page** — Multi-image gallery, weight variant selector, pincode delivery checker, nutrition info, and tabbed specs/benefits
- **Product Reviews** — Paginated reviews with star ratings (one review per user per product)
- **Cart** — Add/remove/update items with weight variants, stock validation, and real-time total
- **Coupon Codes** — Percentage & flat discount coupons with min-order, max-discount, expiry, and per-user usage limits
- **Checkout** — Shipping address form, COD and Razorpay online payment
- **Razorpay Integration** — Full online payment with server-side signature verification
- **Order Success Page** — Confirmation with order ID and details
- **My Orders** — Full order history with detailed per-order view
- **Wishlist** — Toggle products to wishlist with persistent storage
- **User Profile** — Update name, avatar (Cloudinary upload), and manage saved addresses
- **Auth** — Login/Registration with bcrypt-hashed passwords & JWT cookies
- **Google OAuth** — One-click Google sign-in via Passport.js
- **Email Notifications** — Order confirmation emails via SendPulse SMTP
- **Pincode Checker** — Delivery availability check on product pages
### 🔧 Admin Dashboard
- **Dashboard Overview** — Stat cards (Total Revenue, Orders, Products, Users)
- **Revenue Chart** — Monthly revenue area chart (Recharts)
- **Daily Sales Chart** — 30-day rolling daily revenue area chart
- **Order Status Chart** — Pie chart for order distribution (Pending, Processing, Delivered, etc.)
- **Top Products** — Ranked list of products by volume sold
- **Recent Orders** — Latest 5 orders at a glance
- **Product Management** — Create, edit, toggle active/inactive, search products
- **Category Management** — Create, edit, deactivate, upload category images
- **Multi-Step Product Form** — 7-step wizard: Basic Info → Images → Weight Options → Specs → Nutrition → SEO → Review
- **Hero Banner Management** — Create, edit, toggle, delete homepage banners
- **Order Management** — View all orders, update order status (Pending → Processing → Shipped → Delivered → Cancelled)
- **Coupon Management** — Create, toggle status, delete coupon codes
- **Admin-only Routes** — All admin endpoints protected by `authMiddleware` + `AdminOnly` middleware
---
 
## 🛠️ Tech Stack
 
### Frontend (`/client`)
| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15 | React framework with App Router & SSR |
| [React](https://react.dev/) | 19 | UI library |
| [MUI](https://mui.com/) | v7 | Component library (Material Design) |
| [Emotion](https://emotion.sh/) | Latest | CSS-in-JS for MUI styling |
| [Bootstrap](https://getbootstrap.com/) | 5 | Grid & utility classes |
| [Recharts](https://recharts.org/) | Latest | Admin dashboard charts |
| [Framer Motion](https://www.framer.com/motion/) | Latest | Page & step animations |
| [React Slick](https://react-slick.neostack.com/) | Latest | Carousels & sliders |
| [Axios](https://axios-http.com/) | Latest | HTTP client with cookie support |
 
### Backend (`/server`)
| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | ≥18 | Runtime environment |
| [Express](https://expressjs.com/) | 5.x | REST API server |
| [MongoDB](https://www.mongodb.com/) | Atlas / Local | Primary database |
| [Mongoose](https://mongoosejs.com/) | 9.x | ODM for MongoDB |
| [Upstash Redis](https://upstash.com/) | Latest | Serverless Redis caching |
| [Cloudinary](https://cloudinary.com/) | 2.x | Image CDN & upload |
| [Razorpay](https://razorpay.com/) | 2.x | Payment gateway |
| [Passport.js](https://www.passportjs.org/) | 0.7 | Google OAuth strategy |
| [JWT](https://jwt.io/) | 9.x | Stateless auth tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | 3.x | Password hashing |
| [Multer](https://github.com/expressjs/multer) | 2.x | Multipart file uploads |
| [Nodemailer / SendPulse](https://sendpulse.com/) | Latest | Transactional email |
| [Helmet](https://helmetjs.github.io/) | 8.x | HTTP security headers |
| [Slugify](https://github.com/simov/slugify) | Latest | URL-friendly slugs |
 
---
 
## 📁 Project Structure
 
```
Directory structure:
└── devkarwa28-e_commerce/
    ├── README.md
    ├── client/
    │   ├── README.md
    │   ├── eslint.config.mjs
    │   ├── jsconfig.json
    │   ├── next.config.mjs
    │   ├── package.json
    │   ├── app/
    │   │   ├── ClientLayout.js
    │   │   ├── layout.js
    │   │   ├── page.jsx
    │   │   ├── page.module.css
    │   │   ├── aboutus/
    │   │   │   ├── about.module.css
    │   │   │   └── page.jsx
    │   │   ├── admin/
    │   │   │   ├── adminPanel.module.css
    │   │   │   ├── layout.js
    │   │   │   ├── page.jsx
    │   │   │   ├── category/
    │   │   │   │   ├── page.jsx
    │   │   │   │   ├── create/
    │   │   │   │   │   └── page.jsx
    │   │   │   │   └── edit/
    │   │   │   │       └── [id]/
    │   │   │   │           └── page.jsx
    │   │   │   ├── coupons/
    │   │   │   │   ├── coupons.module.css
    │   │   │   │   └── page.jsx
    │   │   │   ├── hero-banner/
    │   │   │   │   ├── page.jsx
    │   │   │   │   ├── create/
    │   │   │   │   │   └── page.jsx
    │   │   │   │   └── edit/
    │   │   │   │       └── [id]/
    │   │   │   │           └── page.jsx
    │   │   │   ├── orders/
    │   │   │   │   └── page.jsx
    │   │   │   └── products/
    │   │   │       ├── page.jsx
    │   │   │       ├── create/
    │   │   │       │   └── page.jsx
    │   │   │       └── edit/
    │   │   │           └── [id]/
    │   │   │               └── page.jsx
    │   │   ├── awards/
    │   │   │   ├── awards.module.css
    │   │   │   └── page.jsx
    │   │   ├── blog/
    │   │   │   ├── blog.module.css
    │   │   │   └── page.jsx
    │   │   ├── bulk-order/
    │   │   │   ├── bulkOrder.module.css
    │   │   │   └── page.jsx
    │   │   ├── careers/
    │   │   │   ├── careers.module.css
    │   │   │   └── page.jsx
    │   │   ├── cart/
    │   │   │   └── page.jsx
    │   │   ├── certifications/
    │   │   │   ├── cert.module.css
    │   │   │   └── page.jsx
    │   │   ├── checkout/
    │   │   │   └── page.jsx
    │   │   ├── contactus/
    │   │   │   ├── contact.module.css
    │   │   │   └── page.jsx
    │   │   ├── coupons-user/
    │   │   │   ├── coupons.module.css
    │   │   │   └── page.jsx
    │   │   ├── expertise/
    │   │   │   ├── export-import/
    │   │   │   │   ├── export-import.module.css
    │   │   │   │   └── page.jsx
    │   │   │   ├── modern-trade/
    │   │   │   │   ├── modern-trade.module.css
    │   │   │   │   └── page.jsx
    │   │   │   ├── private-label/
    │   │   │   │   ├── page.jsx
    │   │   │   │   └── private-label.module.css
    │   │   │   ├── quality-safety/
    │   │   │   │   ├── page.jsx
    │   │   │   │   └── quality-safety.module.css
    │   │   │   └── wholesale/
    │   │   │       ├── page.jsx
    │   │   │       └── wholesale.module.css
    │   │   ├── faq/
    │   │   │   ├── faq.module.css
    │   │   │   └── page.jsx
    │   │   ├── gifting/
    │   │   │   ├── gifting.module.css
    │   │   │   └── page.jsx
    │   │   ├── grievance/
    │   │   │   ├── grievance.module.css
    │   │   │   └── page.jsx
    │   │   ├── leadership/
    │   │   │   ├── leadership.module.css
    │   │   │   └── page.jsx
    │   │   ├── login/
    │   │   │   ├── login.module.css
    │   │   │   └── page.jsx
    │   │   ├── oauth-success/
    │   │   │   └── page.jsx
    │   │   ├── order-success/
    │   │   │   └── [id]/
    │   │   │       ├── orderSucess.module.css
    │   │   │       └── page.jsx
    │   │   ├── orders/
    │   │   │   ├── page.jsx
    │   │   │   └── [id]/
    │   │   │       ├── orderDetail.module.css
    │   │   │       └── page.jsx
    │   │   ├── payment-verifying/
    │   │   │   ├── page.jsx
    │   │   │   └── Payment-Verifying.jsx
    │   │   ├── privacy-policy/
    │   │   │   ├── page.jsx
    │   │   │   └── privacy.module.css
    │   │   ├── products/
    │   │   │   ├── layout.js
    │   │   │   ├── page.jsx
    │   │   │   ├── products.module.css
    │   │   │   └── [slug]/
    │   │   │       ├── page.jsx
    │   │   │       ├── ProductDetailsClient.jsx
    │   │   │       └── components/
    │   │   │           ├── BenifitsIcon.jsx
    │   │   │           ├── PinCodeChecker.jsx
    │   │   │           ├── productDetail.module.css
    │   │   │           ├── ProductGallery.jsx
    │   │   │           ├── ProductInfo.jsx
    │   │   │           └── ProductTabs.jsx
    │   │   ├── profile/
    │   │   │   └── page.jsx
    │   │   ├── register/
    │   │   │   ├── page.jsx
    │   │   │   └── register.module.css
    │   │   ├── return-policy/
    │   │   │   ├── page.jsx
    │   │   │   └── returns.module.css
    │   │   ├── shipping-policy/
    │   │   │   ├── page.jsx
    │   │   │   └── shipping.module.css
    │   │   ├── terms-conditions/
    │   │   │   ├── page.jsx
    │   │   │   └── terms.module.css
    │   │   └── wishlist/
    │   │       ├── page.jsx
    │   │       └── wishlist.module.css
    │   ├── components/
    │   │   ├── admin/
    │   │   │   ├── admin.module.css
    │   │   │   ├── BannerTable.jsx
    │   │   │   ├── CategoryTable.jsx
    │   │   │   ├── DailySalesChart.jsx
    │   │   │   ├── OrderDetailsModal.jsx
    │   │   │   ├── OrderStatusChart.jsx
    │   │   │   ├── OrderTable.jsx
    │   │   │   ├── ProductTable.jsx
    │   │   │   ├── RevenueChart.jsx
    │   │   │   ├── Sidebar.jsx
    │   │   │   ├── StatCard.jsx
    │   │   │   ├── Topbar.jsx
    │   │   │   ├── TopProducts.jsx
    │   │   │   └── forms/
    │   │   │       ├── forms.module.css
    │   │   │       ├── ImageUploader.jsx
    │   │   │       ├── NutritentsInfo.jsx
    │   │   │       ├── ProductForm.jsx
    │   │   │       ├── SeoForm.jsx
    │   │   │       ├── SepcifiactionsForm.jsx
    │   │   │       └── WeightsOption.jsx
    │   │   ├── cart/
    │   │   │   ├── cart.module.css
    │   │   │   ├── CartItems.jsx
    │   │   │   ├── CartSummary.jsx
    │   │   │   ├── CouponBox.jsx
    │   │   │   └── NoItemsInCart.jsx
    │   │   ├── checkout/
    │   │   │   ├── AddressForm.jsx
    │   │   │   ├── checkout.module.css
    │   │   │   ├── OrderSummary.jsx
    │   │   │   └── PaymentMethod.jsx
    │   │   ├── Footer/
    │   │   │   ├── Footer.jsx
    │   │   │   └── footer.module.css
    │   │   ├── Header/
    │   │   │   ├── Header.js
    │   │   │   ├── header.module.css
    │   │   │   ├── MainHeader.jsx
    │   │   │   ├── NavBar.jsx
    │   │   │   └── TopBar.jsx
    │   │   ├── Home/
    │   │   │   ├── BestSeller.jsx
    │   │   │   ├── CategoriesShowcase.jsx
    │   │   │   ├── DryFruitSlider.jsx
    │   │   │   ├── HeroBanner.jsx
    │   │   │   ├── home.module.css
    │   │   │   ├── NewsLetter.jsx
    │   │   │   ├── ParallaxCollection.jsx
    │   │   │   ├── ShopByPurpose.jsx
    │   │   │   ├── Testimonials.jsx
    │   │   │   └── WhyChooseUs.jsx
    │   │   ├── layout/
    │   │   │   └── AppLayout.js
    │   │   ├── orders/
    │   │   │   ├── OrderCard.jsx
    │   │   │   └── orders.module.css
    │   │   └── products/
    │   │       ├── FilterSidebar.jsx
    │   │       ├── ProductCard.jsx
    │   │       ├── ProductCardSkeleton.jsx
    │   │       └── products.module.css
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   ├── CartContext.jsx
    │   │   └── WishlistContext.jsx
    │   ├── fonts/
    │   │   └── LatinaPopular-Regular.ttf
    │   ├── public/
    │   │   └── google.webp=s96-fcrop64=1,00000000ffffffff-rw
    │   ├── styles/
    │   │   └── globals.css
    │   └── theme/
    │       └── theme.js
    └── server/
        ├── index.js
        ├── package.json
        ├── config/
        │   ├── cloudinary.js
        │   ├── dbconfig.js
        │   ├── passport.js
        │   ├── razorpay.js
        │   └── upstashRedis.js
        ├── controller/
        │   ├── adminController.js
        │   ├── authController.js
        │   ├── bannerController.js
        │   ├── cartController.js
        │   ├── categoryController.js
        │   ├── couponController.js
        │   ├── orderController.js
        │   ├── paymentController.js
        │   ├── productController.js
        │   ├── reviewController.js
        │   ├── userController.js
        │   └── wishlistController.js
        ├── middleware/
        │   ├── authMiddleware.js
        │   └── uploadMiddleware.js
        ├── models/
        │   ├── bannerModel.js
        │   ├── cartModel.js
        │   ├── CategoryModel.js
        │   ├── couponModel.js
        │   ├── orderModel.js
        │   ├── productModel.js
        │   ├── reviewModel.js
        │   ├── UserModel.js
        │   └── wishlistModel.js
        ├── routes/
        │   ├── adminRoutes.js
        │   ├── authRoutes.js
        │   ├── bannerRoutes.js
        │   ├── cartRouter.js
        │   ├── categoryRoutes.js
        │   ├── couponRoutes.js
        │   ├── OauthRoutes.js
        │   ├── orderRoutes.js
        │   ├── paymentRoutes.js
        │   ├── productRoutes.js
        │   ├── reviewRoutes.js
        │   ├── userRouter.js
        │   └── wishlistRoutes.js
        └── utilites/
            ├── cacheInvalidation.js
            ├── cloudinaryUpload.js
            ├── sendEmail.js
            └── tokenGen.js

```
 
---
 
## 🚀 Getting Started
 
### Prerequisites
- Node.js >= 18
- npm or yarn
- MongoDB instance (local or [Atlas](https://www.mongodb.com/atlas))
- [Cloudinary](https://cloudinary.com/) account
- [Upstash Redis](https://upstash.com/) account (free tier available)
- [Razorpay](https://razorpay.com/) account (test mode available)
- [Google Cloud Console](https://console.cloud.google.com/) project for OAuth
- [SendPulse](https://sendpulse.com/) account for email
---
 
### Environment Variables
 
#### Client — `client/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
 
#### Server — `server/.env.local`
```env
# Server
PORT=5000
CLIENT_URL=http://localhost:3000
SERVER_URL=http://localhost:5000
 
# Database
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/nutrivia
 
# Auth
JWT_SECRET=your_super_secret_jwt_key
 
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
 
# Cloudinary
CLOUD_NAME=your_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
 
# Upstash Redis
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
 
# Razorpay
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
 
# SendPulse Email
PULSE_CLIENT_ID=your_sendpulse_client_id
PULSE_KEY=your_sendpulse_api_key
```
 
---
 
### Running Locally
 
#### 1. Clone the repository
```bash
git clone https://github.com/devkarwa28/nutrivia.git
cd nutrivia
```
 
#### 2. Start the backend
```bash
cd server
npm install
npm start
# Server starts at http://localhost:5000
```
 
#### 3. Start the frontend
```bash
cd client
npm install
npm run dev
# App available at http://localhost:3000
```
 
---
 
## 🔌 API Reference
 
> **Base URL:** `http://localhost:5000`  
> **Auth:** Cookie-based JWT (`token` httpOnly cookie, 7-day expiry)  
> 🔒 = Requires authentication | 👑 = Admin only
 
---
 
### Auth
**Base path:** `/api/auth`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user, sets auth cookie |
| `POST` | `/api/auth/login` | Public | Login with email & password, sets auth cookie |
| `POST` | `/api/auth/logout` | Public | Clear auth cookie |
| `GET` | `/api/auth/me` | 🔒 | Get currently authenticated user |
 
**Register Body:**
```json
{ "uname": "Dev Karwa", "email": "dev@example.com", "password": "securepassword" }
```
 
**Login Body:**
```json
{ "email": "dev@example.com", "password": "securepassword" }
```
 
---
 
### OAuth (Google)
**Base path:** `/auth`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/auth/google` | Public | Redirect to Google OAuth consent screen |
| `GET` | `/auth/google/callback` | Public | OAuth callback — sets cookie, redirects to `/oauth-success` |
 
---
 
### User
**Base path:** `/api/user`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/user/get-addresses` | 🔒 | Get all saved addresses |
| `PUT` | `/api/user/update-profile` | 🔒 | Update display name |
| `PUT` | `/api/user/update-avatar` | 🔒 | Upload new profile avatar (multipart/form-data) |
| `POST` | `/api/user/add-address` | 🔒 | Add a new shipping address |
| `PUT` | `/api/user/update-address/:id` | 🔒 | Update existing address by ID |
| `DELETE` | `/api/user/delete-address/:id` | 🔒 | Delete address by ID |
 
**Add Address Body:**
```json
{
  "fullName": "Dev Karwa",
  "phone": "9876543210",
  "pincode": "342001",
  "city": "Jodhpur",
  "state": "Rajasthan",
  "street": "123 Main Street",
  "landmark": "Near Clock Tower",
  "type": "home",
  "isDefault": true
}
```
 
---
 
### Products
**Base path:** `/api/products`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/products` | Public | Get all active products (filters + pagination + Redis cache) |
| `GET` | `/api/products/:slug` | Public | Get single product by URL slug (Redis cached) |
| `GET` | `/api/products/admin/:id` | 👑 | Get product by MongoDB ID (admin, bypasses isActive filter) |
| `POST` | `/api/products` | 👑 | Create new product (multipart/form-data) |
| `PUT` | `/api/products/:id` | 👑 | Update product by ID (multipart/form-data) |
| `PATCH` | `/api/products/:id` | 👑 | Toggle product active/inactive status |
 
**GET `/api/products` — Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 12) |
| `category` | string | MongoDB Category ObjectId |
| `search` | string | Full-text search query |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `featured` | boolean | Filter featured products only |
 
**POST `/api/products` — Form Data Fields:**
| Field | Type | Required | Description |
|---|---|---|---|
| `pname` | string | ✅ | Product name |
| `description` | string | ✅ | Product description |
| `category` | ObjectId | ✅ | Category reference |
| `mainImage` | file | ✅ | Main product image |
| `images` | file[] | ❌ | Gallery images (max 10) |
| `weightOptions` | JSON string | ✅ | `[{label, price, stock}]` |
| `benifits` | JSON string | ❌ | Array of benefit strings |
| `specifications` | JSON string | ❌ | Key-value spec object |
| `nutritionInfo` | JSON string | ❌ | Nutrition facts object |
| `seo` | JSON string | ❌ | `{metaTitle, metaDescription, keywords[]}` |
| `isFeatured` | string | ❌ | "true" or "false" |
 
---
 
### Categories
**Base path:** `/api/category`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/category` | Public | Get all active categories with product counts |
| `GET` | `/api/category/:id` | Public | Get category by ID |
| `POST` | `/api/category` | 👑 | Create category (multipart: `cname` + `image`) |
| `PUT` | `/api/category/:id` | 👑 | Update category name, status, or image |
| `DELETE` | `/api/category/:id` | 👑 | Soft-delete (sets isActive: false) |
 
---
 
### Cart
**Base path:** `/api/cart`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/cart` | 🔒 | Get current user's cart with populated product info |
| `POST` | `/api/cart` | 🔒 | Add item to cart (validates stock) |
| `PUT` | `/api/cart` | 🔒 | Update item quantity (validates stock) |
| `DELETE` | `/api/cart` | 🔒 | Remove specific item from cart |
| `DELETE` | `/api/cart/clear` | 🔒 | Clear entire cart |
 
**POST / PUT Body:**
```json
{ "productId": "...", "weightLabel": "500g", "quantity": 2 }
```
 
---
 
### Orders
**Base path:** `/api/order`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/order` | 🔒 | Place order (validates stock, applies coupon, sends confirmation email) |
| `GET` | `/api/order/myorders` | 🔒 | Get logged-in user's order history |
| `GET` | `/api/order/:id` | 🔒 | Get single order by ID |
| `GET` | `/api/order/admin` | 👑 | Get all orders (admin) |
| `PUT` | `/api/order/admin/:id` | 👑 | Update order status (admin) |
 
**POST `/api/order` Body:**
```json
{
  "shippingAddress": {
    "fullName": "Dev Karwa",
    "phone": "9876543210",
    "street": "123 Main Street",
    "city": "Jodhpur",
    "state": "Rajasthan",
    "pincode": "342001"
  },
  "paymentMethod": "Razorpay",
  "couponCode": "SAVE10",
  "paymentStatus": "Paid",
  "paymentId": "pay_xxxxxxxxxxxx"
}
```
 
**Order Status Values:** `Pending` → `Processing` → `Shipped` → `Delivered` → `Cancelled`
 
---
 
### Reviews
**Base path:** `/api/reviews`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/reviews/:productId` | 🔒 | Add review for a product (one per user per product) |
| `GET` | `/api/reviews/:productId` | Public | Get paginated reviews for a product |
 
**POST Body:**
```json
{ "rating": 5, "comment": "Excellent quality dry fruits!" }
```
 
**GET Query Parameters:** `page`, `limit`
 
---
 
### Coupons
**Base path:** `/api/coupons`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/coupons` | 👑 | Create new coupon |
| `GET` | `/api/coupons/admin` | 👑 | Get all coupons (admin) |
| `PUT` | `/api/coupons/admin/:id` | 👑 | Toggle coupon active/inactive |
| `DELETE` | `/api/coupons/admin/:id` | 👑 | Delete coupon |
| `POST` | `/api/coupons/apply` | 🔒 | Apply coupon code and get discount amount |
 
**POST `/api/coupons` Body (Admin):**
```json
{
  "code": "SAVE10",
  "discountType": "percentage",
  "discountValue": 10,
  "minOrderAmount": 500,
  "maxDiscount": 200,
  "usageLimit": 100,
  "expiresAt": "2025-12-31T23:59:59.000Z"
}
```
 
**POST `/api/coupons/apply` Body:**
```json
{ "code": "SAVE10" }
```
 
---
 
### Banners
**Base path:** `/api/banners`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/banners` | Public | Get active banners (Redis cached, 10 min TTL) |
| `POST` | `/api/banners` | Public* | Create new banner slide (multipart: fields + `image`) |
| `PUT` | `/api/banners/:id` | Public* | Update banner by ID |
| `DELETE` | `/api/banners/:id` | Public* | Delete banner by ID |
 
> *Note: Banner write routes should be secured with admin middleware.
 
**POST Body (Form Data):** `title`, `titleAccent`, `subtitle`, `badge`, `active`, `image` (file)
 
---
 
### Wishlist
**Base path:** `/api/wishlist`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/wishlist` | 🔒 | Get current user's wishlist |
| `POST` | `/api/wishlist/toggle` | 🔒 | Toggle product in/out of wishlist |
 
**POST Body:**
```json
{ "productId": "..." }
```
 
---
 
### Payment (Razorpay)
**Base path:** `/api/payment`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/payment/create-order` | 🔒 | Create Razorpay order (returns `order_id`, `amount`, `currency`) |
| `POST` | `/api/payment/verify-payment` | 🔒 | Verify Razorpay HMAC signature |
 
**POST `/api/payment/create-order` Body:**
```json
{ "amount": 999 }
```
 
**POST `/api/payment/verify-payment` Body:**
```json
{
  "razorpay_order_id": "order_xxxx",
  "razorpay_payment_id": "pay_xxxx",
  "razorpay_signature": "hmac_signature_string"
}
```
 
---
 
### Admin Analytics
**Base path:** `/api/admin`
 
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/dashboard` | 👑 | Total revenue, orders, users, products |
| `GET` | `/api/admin/monthly-sales` | 👑 | Monthly revenue breakdown (all months) |
| `GET` | `/api/admin/top-products` | 👑 | Top 5 products by units sold |
| `GET` | `/api/admin/recent-orders` | 👑 | Last 5 orders with user details |
| `GET` | `/api/admin/order-status` | 👑 | Order count grouped by status |
| `GET` | `/api/admin/get-daily-sales` | 👑 | Daily revenue for the last 30 days |
 
**Dashboard Response:**
```json
{
  "totalRevenue": 125000,
  "totalOrders": 84,
  "totalUsers": 320,
  "totalProducts": 48
}
```
 
---
 
## 🎨 Design System
 
CSS custom properties defined in `client/styles/globals.css`:
 
```css
--color-primary:        #5c4033;   /* Warm chocolate brown — brand primary */
--color-gold:           #c89b3c;   /* Premium gold accent */
--color-olive:          #6b8e23;   /* Success / active green */
--color-bg-dark:        #1E1B18;   /* Dark background */
--color-text-primary:   #1A1A1A;   /* Main body text */
--color-text-secondary: #666666;   /* Muted secondary text */
```
 
Typography uses a custom `LatinaPopular` font for headings alongside the system font stack.
 
---
 
## 🚀 Caching Strategy
 
The backend uses **Upstash Redis** (serverless Redis) for two caching layers:
 
| Cache Key Pattern | TTL | Description |
|---|---|---|
| `products:list:page=N:...` | 5 min | Product listing pages (all filter combinations) |
| `product:detail:<slug>` | 5 min | Individual product detail pages |
| `banners:active` | 10 min | Active homepage banners |
| `banners:all` | 10 min | All banners (admin view) |
 
**Cache Invalidation** is handled automatically on every write operation:
- Creating/updating/toggling a product clears all `products:list:*` keys and the specific `product:detail:<slug>` key
- Banner updates clear the relevant banner cache keys
---
 
## 🔐 Authentication Flow
 
```
User Signs Up/Logs In
        ↓
Server validates credentials
        ↓
JWT token generated (7-day expiry)
        ↓
Token set as httpOnly cookie (secure, sameSite: "none")
        ↓
Client sends cookie automatically with every API request
        ↓
authMiddleware verifies JWT on protected routes
        ↓
AdminOnly middleware checks user.role === "admin"
```
 
**Google OAuth Flow:**
```
User clicks "Continue with Google"
        ↓
Redirect to /auth/google (Passport.js)
        ↓
Google OAuth consent screen
        ↓
Callback to /auth/google/callback
        ↓
Passport upserts user (creates if new, links googleId if existing email)
        ↓
JWT cookie set → redirect to /oauth-success
        ↓
Client reads user state from /api/auth/me
```
 
---
 
## ☁️ Deployment
 
### Frontend — Vercel (Recommended)
```bash
# Set environment variable in Vercel dashboard:
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```
 
### Backend — Render / Railway
```bash
# Build command:
npm install
 
# Start command:
node index.js
 
# Set all environment variables from server/.env.local in dashboard
```
 
> The CORS configuration already allows Vercel preview deployments matching `*-dev-karwas-projects.vercel.app`.
 
---
 
## 🗺️ Roadmap
 
- [ ] **Product Search Autocomplete** — Real-time suggestions as user types
- [ ] **Real-time Order Tracking** — Live status updates with Socket.io
- [ ] **Admin User Management** — Block/unblock users, view user details
- [ ] **Return & Refund Requests** — User-initiated return flow
- [ ] **Product Bundles / Gift Sets** — Create combo product offerings
- [ ] **Inventory Alerts** — Notify admin when stock falls below threshold
- [ ] **Newsletter Integration** — Capture emails from the homepage newsletter form
- [ ] **Review Images** — Allow users to upload photos with reviews
- [ ] **Blog CMS** — Admin-managed blog posts (currently static)
- [ ] **PWA Support** — Offline-first experience with service workers
- [ ] **Rate Limiting** — Express rate limiter on auth & payment routes
- [ ] **Input Sanitization** — express-validator or Joi on all POST/PUT routes
---
 
## 🤝 Contributing
 
Contributions are welcome! Please follow these steps:
 
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request
Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.
 
---
 
## 📦 Available Scripts
 
### Client
```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```
 
### Server
```bash
npm start          # Start production server (node index.js)
npm test           # Alias for node index.js
```
 
---
 
## 📄 License
 
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
 
---
 
## 👤 Author
 
**Dev Karwa**

- GitHub: [@devkarwa28](https://github.com/devkarwa28)
- LinkedIn: [Dev Karwa](https://linkedin.com/in/dev-karwa-a9b109249)
- Portfolio [Dev Karwa](https://devkarwa.me)
---
 
> Built with ❤️ using Next.js, Node.js, MongoDB, Redis & Razorpay
 
