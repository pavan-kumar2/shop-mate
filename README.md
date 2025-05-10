# ShopMate – E-commerce Web App

**ShopMate** is a fully functional and visually appealing e-commerce web application built with **React**, **Tailwind CSS**, **React Router v6**, and **Context API**. The project uses [FakeStoreAPI](https://fakestoreapi.com/) for products and cart data. It also utilizes **custom React hooks**, **reducers**, and **context** for efficient state management and component behavior.

---

## Live Demo

> (Add your deployment link here after hosting)

---

## Features

- Browse products by category
- View detailed product info
- Add/Remove products from the cart
- Order summary and checkout
- Real-time cart subtotal and quantity management
- Shipping address form with input binding
- Cart and form data saved in LocalStorage
- Responsive and modern UI with Tailwind CSS
- Mocked payment method selection
- Scroll restoration and protected routes

---

## Tech Stack

| Tech           | Purpose                        |
|----------------|--------------------------------|
| React          | Front-end UI                   |
| React Router v6| Client-side routing            |
| Tailwind CSS   | Utility-first styling          |
| Context API    | Global state management        |
| useReducer     | Local reducer-based state      |
| FakeStoreAPI   | Mock data for products/cart    |
| Vite           | Fast development/build tool    |

---

## Custom Hooks

Custom hooks are used to encapsulate reusable logic throughout the app:

- **`useInputBind`** – A custom hook for handling input form value and `onChange` binding.
- **`useScrollToTop`** – Scrolls the page to the top on route change.
- **`useSearchBarVisible`** – Controls visibility of the search bar based on scroll behavior.

These hooks help keep components clean, reusable, and focused on UI logic.

---

## Folder Structure

      shop-mate/src/
      ├── App.jsx # Main app component with routes
      ├── assets/ # All images and static assets
      ├── components/ # Reusable UI components
      │ ├── Cart.jsx
      │ ├── Checkout.jsx
      │ ├── Footer.jsx
      │ ├── Header.jsx
      │ ├── HeroBanner.jsx
      │ ├── OrderPlaced.jsx
      │ ├── ProductCards.jsx
      │ ├── ProtectedRoute.jsx
      │ ├── Ratings.jsx
      │ └── SpinLoader.jsx
      ├── constants/
      │ └── actionTypes.js # Centralized action type definitions
      ├── context/
      │ └── productContext.jsx # Global context and provider
      ├── hooks/ # Custom React hooks
      │ ├── useInputBind.js
      │ ├── useScrollToTop.js
      │ └── useSearchBarVisible.js
      ├── index.css # Global styles
      ├── main.jsx # App entry point
      ├── pages/ # Route-level pages
      │ ├── CartPage.jsx
      │ ├── CheckoutPage.jsx
      │ ├── HomePage.jsx
      │ └── ProductDetailPage.jsx
      ├── reducer/ # useReducer functions for context
      │ ├── cartReducer.js
      │ ├── categoryListReducer.js
      │ ├── productDetailReducer.js
      │ └── productReducer.js
      ├── service/
      │ └── api.js # API service logic for FakeStoreAPI
      └── utils/
      └── images.js # Image utilities and imports
