import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ProductCards from "./components/ProductCards";
import Cart from "./components/Cart";
import { ProductProvider } from "./context/productContext";
import HomePage from "./pages/homePage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import ProductDetailPage from "./pages/ProductDetailPage";

function App() {
  return (
    <ProductProvider>
      <Header></Header>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="/product/:title" element={<ProductDetailPage />}></Route>
      </Routes>
      <Footer></Footer>
    </ProductProvider>
  );
}

export default App;
