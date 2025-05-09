import axios from "axios";

export const fetchProducts = axios.get('https://fakestoreapi.com/products');

export const fetchProductDetail = (productId) => axios.get(`https://fakestoreapi.com/products/${productId}`);

export const fetchCategoryList = axios.get('https://fakestoreapi.com/products/categories');

