import { Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ProductProvider } from "./context/productContext";
import HomePage from "./pages/homePage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import ProductDetailPage from "./pages/ProductDetailPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <ProductProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/product/:title" element={<ProductDetailPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
      </Routes>
      <Footer></Footer>
    </ProductProvider>
  );
}

export default App;
