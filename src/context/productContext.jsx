import { createContext, use, useEffect, useReducer, useState } from "react";
import { ProductInitialState, productReducer } from "../reducer/productReducer";
import { fetchProducts } from "../service/api";
import { useLocation } from "react-router-dom";
import { cartInitialState, cartReducer } from "../reducer/cartReducer";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const location = useLocation();
  const [productState, productDispatch] = useReducer(
    productReducer,
    ProductInitialState
  );
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const productId = location.state?.productId;

  useEffect(() => {
    productDispatch({ type: "FETCH_START" });
    fetchProducts
      .then((response) => {
        productDispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch((error) =>
        productDispatch({ type: "FETCH_ERROR", payload: error.message })
      );
  }, []);

  useEffect(() => {
    setFilteredProducts(
      (location.pathname === "/cart"
        ? cartState.cart
        : productState.products.map((product) => {
            const existingProduct = cartState.cart.find(
              (cartItem) => cartItem.id === product.id
            );
            return existingProduct
              ? { ...product, quantity: existingProduct.quantity }
              : product;
          })
      ).filter((product) => {
        const matchesSearchQuery = product?.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

        // const matchesCategory = product?.category === ""; // Example additional

        // if (matchesCategory) {
        //   return matchesSearchQuery && matchesCategory;
        // } else {
        // }

        return matchesSearchQuery;
      })
    );
  }, [searchQuery, productState.products, cartState.cart, location.pathname]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState.cart));
  }, [cartState.cart]);

  return (
    <ProductContext.Provider
      value={{
        productState,
        cartState,
        filteredProducts,
        searchQuery,
        cartDispatch,
        setSearchQuery,
        productId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
