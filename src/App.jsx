import { Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ProductProvider } from "./context/productContext";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderPlaced from "./components/OrderPlaced";
import Checkout from "./components/Checkout";

function App() {
  return (
    <ProductProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/product/:title" element={<ProductDetailPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="order-placed" element={<OrderPlaced />}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </ProductProvider>
  );
}

export default App;
