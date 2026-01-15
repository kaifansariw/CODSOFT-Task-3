# 🛒 MERN E-Commerce Platform

A full-stack e-commerce application built with MongoDB, Express.js, React, and Node.js (MERN stack). Features include user authentication, shopping cart, checkout process, and order management.

## ✨ Features

- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart with local storage persistence
- 👤 User authentication (JWT)
- 📦 Complete checkout flow (shipping, payment, order placement)
- 💳 Stripe payment integration ready
- 📱 Responsive design with Tailwind CSS
- 🔐 Secure password hashing with bcrypt
- 📊 Order history and tracking

## 🚀 Tech Stack

**Frontend:**
- React 18
- Redux Toolkit (State Management)
- React Router v6
- Tailwind CSS
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Stripe API

## 📋 Prerequisites

- Node.js (v16.x or higher)
- MongoDB Atlas account (or local MongoDB)
- Stripe account (optional, for payments)

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ecommerce_website/store
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

### 4. Environment Setup

Create a `.env` file in the `store` folder:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**MongoDB Setup:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for testing)
5. Get your connection string and replace `MONGO_URI`

**JWT Secret:**
- Use any random string (e.g., `mySecretKey12345XYZ!@#$%`)

**Stripe (Optional):**
- Get your test key from [Stripe Dashboard](https://stripe.com)

### 5. Seed Database

Import sample products and users:
```bash
npm run data:import
```

To destroy data:
```bash
npm run data:destroy
```

## 🎯 Running the Application

### Development Mode (Recommended)
Run both frontend and backend concurrently:
```bash
npm run dev
```

### Separate Terminals
**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 👥 Test Credentials

After seeding the database:

**Admin Account:**
- Email: `admin@example.com`
- Password: `password123`

**Customer Account:**
- Email: `john@example.com`
- Password: `password123`

## 📁 Project Structure

```
store/
├── config/          # Database configuration
├── controllers/     # Route controllers
├── data/           # Sample data for seeding
├── frontend/       # React application
│   ├── public/
│   └── src/
│       ├── components/
│       ├── screens/
│       └── slices/
├── middleware/     # Custom middleware
├── models/         # Mongoose models
├── routes/         # API routes
├── .env           # Environment variables
├── server.js      # Express server
└── package.json
```

## 🔑 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Users
- `POST /api/users/login` - Login user
- `POST /api/users` - Register user

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders/payment/intent` - Create Stripe payment intent

## 🛣️ Frontend Routes

- `/` - Home page (product listing)
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/login` - User login
- `/register` - User registration
- `/shipping` - Shipping address
- `/payment` - Payment method selection
- `/placeorder` - Order review
- `/order/:id` - Order confirmation

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Verify your MongoDB URI is correct
- Check database user credentials
- Ensure IP whitelist includes your IP

**Port Already in Use:**
- Change PORT in `.env` file
- Kill process using the port

**Products Not Showing:**
- Run `npm run data:import`
- Check if backend is running on port 5000
- Verify MongoDB connection

## 📝 Available Scripts

```bash
npm start          # Start backend server
npm run server     # Start backend with nodemon
npm run client     # Start frontend
npm run dev        # Run both concurrently
npm run data:import   # Import sample data
npm run data:destroy  # Delete all data
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Your Name - [Your GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons from [Lucide React](https://lucide.dev)
- Inspired by modern e-commerce platforms

---

⭐ Star this repo if you find it helpful!
