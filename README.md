# 🛍️ ShopMate – E-commerce Web App

**ShopMate** is a fully functional and visually appealing e-commerce web application built with **React**, **Tailwind CSS**, **React Router v6**, and **Context API**. The project uses [FakeStoreAPI](https://fakestoreapi.com/) for products and cart data.

---

## 🚀 Live Demo

> (Add your deployment link here after hosting)

---

## ⚙️ Features

- 🔎 Browse products by category
- 🧺 Add/Remove products from the cart
- 🧾 Order summary and checkout
- 🏷️ Real-time cart subtotal and quantity management
- 📝 Shipping address form
- 💾 Cart and form data saved in LocalStorage
- 🎯 Responsive and modern UI with Tailwind CSS
- 💳 Select payment method (mocked)

---

## 🛠️ Tech Stack

| Tech         | Purpose                       |
|--------------|-------------------------------|
| React        | Front-end UI                  |
| React Router | Client-side routing           |
| Tailwind CSS | Styling and layout            |
| Context API  | Global state management       |
| FakeStoreAPI | Mock data for products/cart   |
| Vite         | Fast development server/build |

---

## 📁 Folder Structure

      shopmate/
      ├── public/
      ├── src/
      │ ├── components/ # Reusable UI components
      │ ├── context/ # Context API setup
      │ ├── pages/ # Page components (Home, Cart, Checkout, etc.)
      │ ├── utils/ # Utility files (e.g., image assets)
      │ ├── App.jsx # Root component with routes
      │ └── main.jsx # App entry point
      ├── tailwind.config.js
      ├── vite.config.js
      └── README.md
