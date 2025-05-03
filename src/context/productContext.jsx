import { createContext, use, useEffect, useReducer, useState } from "react";
import { ProductInitialState, productReducer } from "../reducer/productReducer";
import { fetchCategoryList, fetchProducts } from "../service/api";
import { useLocation } from "react-router-dom";
import { cartInitialState, cartReducer } from "../reducer/cartReducer";
import {
  categoryListInitialState,
  categoryListReducer,
} from "../reducer/categoryListReducer";
import {
  ALL_CATEGORY,
  CATEGORY_ACTIONS,
  PRODUCTS_ACTIONS,
} from "../constants/actionTypes";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const location = useLocation();
  const [productState, productDispatch] = useReducer(
    productReducer,
    ProductInitialState
  );
  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);
  const [categoryListState, categoryListDispatch] = useReducer(
    categoryListReducer,
    categoryListInitialState
  );
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchState, setSearchState] = useState({
    query: "",
    placeholder: "Search in Products",
  });
  const [category, setCategory] = useState("");
  const productId = location.state?.productId;

  useEffect(() => {
    productDispatch({ type: PRODUCTS_ACTIONS.FETCH_START });
    fetchProducts
      .then((response) => {
        productDispatch({
          type: PRODUCTS_ACTIONS.FETCH_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) =>
        productDispatch({
          type: PRODUCTS_ACTIONS.FETCH_ERROR,
          payload: error.message,
        })
      );

    categoryListDispatch({ type: CATEGORY_ACTIONS.CATEGORY_LIST_LOADING });
    fetchCategoryList
      .then((response) => {
        categoryListDispatch({
          type: CATEGORY_ACTIONS.CATEGORY_LIST_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) =>
        categoryListDispatch({
          type: CATEGORY_ACTIONS.CATEGORY_LIST_FAILED,
          payload: error.message,
        })
      );
  }, []);

  useEffect(() => {
    const productBasedOnPage = () => {
      if (location.pathname === "/cart") {
        setSearchState((prev) => ({ ...prev, placeholder: "Search in Cart" }));
        return cartState.cart;
      } else {
        setSearchState((prev) => ({
          ...prev,
          placeholder: "Search in Products",
        }));
        return productState.products.map((product) => {
          const existingProduct = cartState.cart.find(
            (cartItem) => cartItem.id === product.id
          );
          return existingProduct
            ? { ...product, quantity: existingProduct.quantity }
            : product;
        });
      }
    };

    setFilteredProducts(
      productBasedOnPage().filter((product) => {
        const matchesSearchQuery = product?.title
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesCategory =
          category == ALL_CATEGORY // Support all category
            ? true
            : product?.category === category;

        return matchesSearchQuery && matchesCategory;
      })
    );
  }, [
    searchQuery,
    category,
    productState.products,
    cartState.cart,
    location.pathname,
  ]);

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
        categoryListState,
        category,
        cartDispatch,
        setSearchQuery,
        setCategory,
        productId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
