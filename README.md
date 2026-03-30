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
client/
├── app/
│   ├── page.jsx                  # Home page
│   ├── layout.js                 # Root layout with providers
│   ├── admin/                    # Admin panel pages
│   │   ├── page.jsx              # Dashboard
│   │   ├── products/             # Product CRUD
│   │   ├── category/             # Category CRUD
│   │   ├── orders/               # Order management
│   │   └── coupons/              # Coupon management
│   ├── products/                 # Storefront product pages
│   │   └── [slug]/               # Product detail page
│   ├── cart/                     # Cart page
│   ├── checkout/                 # Checkout page
│   ├── orders/                   # User order history
│   ├── login/                    # Login page
│   └── register/                 # Registration page
│
├── components/
│   ├── admin/                    # Admin UI components
│   │   └── forms/                # Multi-step product form
│   ├── cart/                     # Cart components
│   ├── checkout/                 # Checkout components
│   ├── Header/                   # TopBar, MainHeader, NavBar
│   ├── Footer/                   # Footer component
│   └── Home/                     # Homepage sections
│
├── context/
│   ├── AuthContext.js            # Authentication state
│   └── CartContext.js            # Cart state
│
├── styles/
│   └── globals.css               # Global CSS variables & styles
│
└── theme/
    └── theme.js                  # MUI theme configuration
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
 
## 🔌 Backend API Endpoints
 
The frontend expects a REST API server running at `http://localhost:5000`. Below are the key endpoints consumed by the client:
 
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/register` | User registration |
| GET | `/api/products` | Get all products (with filters & pagination) |
| GET | `/api/products/:slug` | Get single product by slug |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| PATCH | `/api/products/:id` | Toggle product status (admin) |
| GET | `/api/category` | Get all categories |
| POST | `/api/category` | Create category (admin) |
| PUT | `/api/category/:id` | Update category (admin) |
| DELETE | `/api/category/:id` | Delete category (admin) |
| GET | `/api/cart` | Get user's cart |
| PUT | `/api/cart` | Update cart item quantity |
| DELETE | `/api/cart` | Remove cart item |
| POST | `/api/order` | Place an order |
| GET | `/api/order/myorders` | Get user's orders |
| GET | `/api/order/:id` | Get order details |
| POST | `/api/coupons/apply` | Apply a coupon code |
| GET | `/api/admin/dashboard` | Admin dashboard stats |
| GET | `/api/admin/monthly-sales` | Monthly revenue data |
| GET | `/api/admin/top-products` | Top selling products |
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
- [ ] User profile & address management
- [ ] Wishlist functionality
- [ ] Product reviews & ratings
- [ ] Real-time order tracking
- [ ] Email notifications
- [ ] Google / Facebook OAuth login
- [ ] Admin order management (status updates)
- [ ] Coupon management UI in admin panel
 
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
 
