import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
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
    setSearchState((prev) => ({
      ...prev,
      placeholder:
        location.pathname === "/cart" ? "Search in Cart" : "Search in Products",
    }));
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState.cart));
  }, [cartState.cart]);

  const productBasedOnPage = useCallback(() => {
    if (location.pathname === "/cart") {
      return cartState.cart;
    } else {
      return productState.products.map((product) => {
        const existingProduct = cartState.cart.find(
          (cartItem) => cartItem.id === product.id
        );
        return existingProduct
          ? { ...product, quantity: existingProduct.quantity }
          : product;
      });
    }
  }, [location.pathname, productState.products, cartState.cart]);

  const filteredProducts = useMemo(() => {
    return productBasedOnPage().filter((product) => {
      const matchesSearchQuery = product?.title
        ?.toLowerCase()
        .includes(searchState?.query?.toLowerCase());

      const matchesCategory =
        category === ALL_CATEGORY ? true : product?.category === category;

      return matchesSearchQuery && matchesCategory;
    });
  }, [productBasedOnPage, searchState.query, category]);

  return (
    <ProductContext.Provider
      value={{
        productState,
        cartState,
        filteredProducts,
        searchState,
        categoryListState,
        category,
        cartDispatch,
        setSearchState,
        setCategory,
        productId,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
