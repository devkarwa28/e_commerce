# 🌰 Nutrivia — Premium Dry Fruits E-Commerce Platform
 
A full-stack e-commerce web application for a premium dry fruits store, featuring a rich storefront, complete shopping flow, and a powerful admin dashboard.
 
---
 
## 📸 Preview
 
> A modern, mobile-friendly storefront with a luxury feel — built with Next.js, MUI, and a Node.js/Express backend.
 
---
 
## ✨ Features
 
### 🛍️ Storefront
- **Hero Banner** — Auto-playing slider with promotional slides
- **Category Showcase** — Visual grid to browse product categories
- **Best Sellers** — Carousel of top-rated products with ratings
- **Product Listing** — Filterable & paginated product grid with client-side caching
- **Product Detail Page** — Image gallery, weight variant selection, pincode checker, nutrition info, and tabs for specs/benefits
- **Cart** — Add/remove items, update quantities, apply coupon codes
- **Checkout** — Shipping address form, payment method selection (COD), order summary
- **Order Success Page** — Confirmation with order ID
- **My Orders** — Full order history with detailed order view
- **Auth** — Login & Registration with form validation
 
### 🔧 Admin Dashboard
- **Dashboard Overview** — Stat cards (Revenue, Orders, Products, Users) + charts
- **Revenue Chart** — Monthly revenue area chart (Recharts)
- **Daily Sales Chart** — 30-day daily revenue area chart
- **Order Status Chart** — Pie chart showing order distribution
- **Top Products** — Ranked list by volume sold
- **Product Management** — Create, edit, toggle active/inactive, search
- **Category Management** — Create, edit, delete, search categories
- **Multi-Step Product Form** — 7-step wizard (Basic Info → Images → Weight Options → Specs → Nutrition → SEO → Review)
- **Coupon System** — Apply and manage discount codes
 
---
 
## 🛠️ Tech Stack
 
### Frontend (`/client`)
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [MUI v7](https://mui.com/) | Component library |
| [Emotion](https://emotion.sh/) | CSS-in-JS styling |
| [Bootstrap 5](https://getbootstrap.com/) | Grid & utility classes |
| [Recharts](https://recharts.org/) | Admin dashboard charts |
| [Framer Motion](https://www.framer.com/motion/) | Page & step animations |
| [React Slick](https://react-slick.neostack.com/) | Carousels & sliders |
| [Axios](https://axios-http.com/) | HTTP client |
 
### Backend (`/server` — separate repo or folder)
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| Multer | Image upload handling |
| Cookie-based Auth | Session management |
 
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
    │   │   ├── expertise/
    │   │   │   ├── expertise.module.css
    │   │   │   ├── export-import/
    │   │   │   │   ├── export-import.module.css
    │   │   │   │   └── page.jsx
    │   │   │   ├── modern-trade/
    │   │   │   │   ├── modern-trade.module.css
    │   │   │   │   └── page.jsx
    │   │   │   ├── private-label/
    │   │   │   │   └── page.jsx
    │   │   │   └── quality-safety/
    │   │   │       └── page.jsx
    │   │   ├── faq/
    │   │   │   ├── faq.module.css
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
        │   └── razorpay.js
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
        │   └── wishlistRoutes.js
        └── utilites/
            ├── cloudinaryUpload.js
            └── tokenGen.js

```
 
---
 
## 🚀 Getting Started
 
### Prerequisites
- Node.js >= 18
- npm or yarn
- MongoDB instance (local or Atlas)
- Backend server running (see Backend Setup)
 
### 1. Clone the repository
 
```bash
git clone https://github.com/your-username/nutrivia.git
cd nutrivia/client
```
 
### 2. Install dependencies
 
```bash
npm install
```
 
### 3. Configure environment
 
Create a `.env.local` file in the `client/` directory:
 
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
 
> Update the URL to match your backend server address.
 
### 4. Run the development server
 
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
---
 
## 🔌 API Reference
 
### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive auth cookie |
 
### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get all products (filters, pagination) |
| GET | `/api/products/:slug` | Get single product by slug |
| GET | `/api/products/admin/:id` | Get product by ID (admin) |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| PATCH | `/api/products/:id` | Toggle active status (admin) |
 
### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/category` | Get all categories |
| GET | `/api/category/:id` | Get category by ID |
| POST | `/api/category` | Create category (admin) |
| PUT | `/api/category/:id` | Update category (admin) |
| DELETE | `/api/category/:id` | Delete category (admin) |
 
### Cart
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | Get user's cart |
| PUT | `/api/cart` | Update item quantity |
| DELETE | `/api/cart` | Remove item from cart |
 
### Orders
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/order` | Place a new order |
| GET | `/api/order/myorders` | Get logged-in user's orders |
| GET | `/api/order/:id` | Get order details |
 
### Coupons
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/coupons/apply` | Apply a coupon code |
 
### Admin Analytics
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/dashboard` | Total revenue, orders, users, products |
| GET | `/api/admin/monthly-sales` | Monthly revenue data |
| GET | `/api/admin/top-products` | Top selling products by volume |
| GET | `/api/admin/order-status` | Order status distribution |
| GET | `/api/admin/get-daily-sales` | Daily sales for last 30 days |
 
---
 
## 🎨 Design System
 
The project uses a consistent set of CSS custom properties defined in `styles/globals.css`:
 
```css
--color-primary: #5c4033      /* Warm chocolate brown */
--color-gold: #c89b3c         /* Premium gold accent */
--color-olive: #6b8e23        /* Success/active green */
--color-bg-dark: #1E1B18      /* Dark background */
--color-text-primary: #1A1A1A
--color-text-secondary: #666666
```
 
---
 
## 📦 Available Scripts
 
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```
 
---
 
## 🗺️ Roadmap
 
- [ ] Online payment integration (Razorpay / Stripe)
- [ ] User profile & address book management
- [ ] Wishlist functionality
- [ ] Product reviews & ratings (UI)
- [ ] Real-time order tracking
- [ ] Email notifications on order confirmation
- [ ] Google / Facebook OAuth login
- [ ] Admin order status management
- [ ] Admin coupon management UI
- [ ] Search with autocomplete
 
---
 
## 🤝 Contributing
 
Contributions are welcome! Please follow these steps:
 
1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request
 
---
 
## 📄 License
 
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
 
---
 
## 👤 Author
 
**Your Name**
- GitHub: [@devkarwa28](https://github.com/devkarwa28)
- LinkedIn: [Dev Karwa](https://linkedin.com/in/dev-karwa-a9b109249)
 
---
 
> Built with ❤️ using Next.js and Node.js
 
