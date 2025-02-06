# 📦 **Project Name**: Stationery Shop Management System

This is a **Express.js-based modular application** designed for scalability and maintainability. The project uses a clean modular architecture, making it easier to manage individual features and components.

---

## 📝 **Table of Contents**

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Technologies Used](#technologies-used)
5. [Installation and Setup](#installation-and-setup)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Contact](#contact)

---

## 🛠️ **About the Project**

A RESTful Express application built with TypeScript, MongoDB, and Mongoose to manage a Stationery Shop. This project allows users to perform CRUD operations on stationery products and orders, place orders, manage inventory, and calculate revenue.
It is suitable for building scalable REST APIs and includes the following core modules:

- **Order Module**: Handles order-related operations.
- **Product Module**: Manages product-related functionalities.
- **Review Module**: Manages review-related functionalities.
- **User Module**: Manages user-related functionalities.

---

## ✨ **Features**

### **Authentication & Authorization**

- **Authentication**:

  - Admin must log in to access secured routes for creating, updating, and deleting products. The login process uses **JWT (JSON Web Token)** for session management and security.
  - Passwords are encrypted using **bcrypt** to ensure user credentials are secure.

- **Authorization**:
  - The system ensures that only users with the appropriate role (Admin or User) can access certain resources and perform specific actions.
  - Admins have full access to manage users, products and order while users have access only to buy product and give review.

### **Product Management**

- Add new stationery products.
- Update product information, including stock and price.
- Delete discontinued products.
- View products filtered by name, brand, or category.

### **Order Management**

- Place orders with automatic inventory deduction.
- Prevent orders if stock is unavailable.
- Calculate total revenue using aggregation pipelines.

### **Error Handling**

- Generic error response structure.
- Custom validation error messages.

---

## 📂 **Project Structure**

```plaintext
📦 src/
├── 📦 app/
│   ├── 📂 config/          # Configuration files
│   ├── 📦 modules/         # Feature-specific modules
│   │   ├── 📦 order/       # Order module
│   │   │   ├── order.controller.ts
│   │   │   ├── order.interface.ts
│   │   │   ├── order.model.ts
│   │   │   ├── order.routes.ts
│   │   │   └── order.services.ts
│   │   ├── 📦 auth/        # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.services.ts
│   │   ├── 📦 product/     # Product module
│   │   │   ├── product.controller.ts
│   │   │   ├── product.interface.ts
│   │   │   ├── product.model.ts
│   │   │   ├── product.routes.ts
│   │   │   └── product.services.ts
├── app.ts                  # Main application file
└── server.ts               # Server configuration
```

## 🚀 **Technologies Used**

| Technology | Purpose                                           | Version Required |
| ---------- | ------------------------------------------------- | ---------------- |
| Node.js    | Runtime environment for building the application. | v20.4.0          |
| Express.js | Framework for creating RESTful APIs.              | v4.18.2          |
| TypeScript | Enhances JavaScript with static typing.           | v5.3.0           |
| MongoDB    | NoSQL database for storing application data.      | v6.0.0           |
| Mongoose   | ODM for MongoDB to model application data.        | v7.0.2           |

## 🛠️ **Installation and Setup**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **MongoDB** (local or a MongoDB Atlas cluster)

---

### **Clone the Repository**

```bash
https://github.com/Arnab-Gupta11/Stationery-Shop-Server.git
cd stationery-shop-management
```

### **Install Dependencies**

```bash
npm install
```

### **Setup Environment Variables**

Create a `.env` file in the project root and configure the following variables:

```env
MONGO_URI=mongodb+srv://<your_mongo_user>:<your_mongo_password>@<your_mongo_cluster>/stationaryShopDB?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development

# Token Configuration
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=<YOUR_RANDOM_ACCESS_SECRET_KEY>
JWT_REFRESH_SECRET=<YOUR_RANDOM_REFRESH_SECRET_KEY>
JWT_ACCESS_EXPIRES_IN=1d

# Payment Gateway Configuration
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME=<YOUR_SHURJOPAY_USERNAME>
SP_PASSWORD=<YOUR_SHURJOPAY_PASSWORD>
SP_PREFIX=SP
SP_RETURN_URL=http://localhost:5173/order/verification
```

### **Build the Project**

Compile the TypeScript files:

```bash
npm run build
```

## 🧰 Usage

### **Start the Server**

For production:

```bash
npm run start:prod
```

For development:

```bash
npm run start:dev
```

The application will be available at:

```bash
http://localhost:5000
```

## 🔧 API Endpoints

### Stationery Products

| Method | Endpoint                            | Description                                                                                        |
| ------ | ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| POST   | `/api/products`                     | Create a new product.                                                                              |
| GET    | `/api/products`                     | Retrieve all products.                                                                             |
| GET    | `/api/products/:id`                 | Get product details by ID.                                                                         |
| PUT    | `/api/products/:id`                 | Update product details.                                                                            |
| DELETE | `/api/products/:id`                 | Delete a product.                                                                                  |
| GET    | `/api/products?searchTerm=category` | Retrieve a list of all products matching the specified `searchTerm` (e.g., name, brand, category). |

---

### Orders

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| POST   | `/api/orders`         | Place a new order.             |
| GET    | `/api/orders/revenue` | Get total revenue from orders. |

---

## ✨ **Contact**

For questions or collaboration, feel free to reach out via email at [arnab.gupta.011@gmail.com](mailto:arnab.gupta.011@gmail.com).
