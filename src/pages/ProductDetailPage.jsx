import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ProductContext } from "../context/productContext";
import {
  productDetailInitialState,
  productDetailReducer,
} from "../reducer/productDetailReducer";
import { fetchProductDetail } from "../service/api";
import SpinLoader from "../components/SpinLoader";
import images from "../utils/images";

export default function ProductDetailPage() {
  const { cartState, cartDispatch, productId } = useContext(ProductContext);
  const { cart } = cartState;

  const [updateProductDetail, setUpdateProductDetail] = useState({});

  const [productDetailState, productDetailDispatch] = useReducer(
    productDetailReducer,
    productDetailInitialState
  );
  const { product, isLoading, error } = productDetailState;

  useEffect(() => {
    productDetailDispatch({ type: "PRODUCT_LOADING" });

    axios;
    fetchProductDetail(productId)
      .then((response) => {
        productDetailDispatch({
          type: "PRODUCT_SUCCESS",
          payload: response.data,
        });
      })
      .catch((error) =>
        productDetailDispatch({
          type: "PRODUCT_FAILED",
          payload: error.message,
        })
      );

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (product) {
      const cartItem = cart.find((cartItem) => cartItem.id === product.id);
      if (cartItem) {
        setUpdateProductDetail({ ...product, quantity: cartItem.quantity });
      } else {
        setUpdateProductDetail(product);
      }
    }
  }, [product, cart]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 min-h-[calc(100dvh-100px)] flex">
      {isLoading && <SpinLoader></SpinLoader>}
      {error && (
        <div className="max-w-[375px] text-center m-auto">
          <img src={images.notFound} alt="not found" className="w-full" />
          <p className="text-lg mt-1">Not found. Please try again!</p>
        </div>
      )}

      {!isLoading && !error && updateProductDetail && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={updateProductDetail.image}
              alt={updateProductDetail.title}
              className="w-full max-w-md h-[calc(100vh-300px)] sm:h-[calc(100vh-140px)] min-h-[400px] object-contain rounded-xl shadow-[0px_2px_8px_0px_#63636333] p-4"
            />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">
              {updateProductDetail.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {updateProductDetail.title}
            </h1>
            <p className="text-gray-700 mb-4">
              {updateProductDetail.description}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-gray-800 font-medium">
                {updateProductDetail.rating?.rate}
              </span>
              <span className="text-gray-500 text-sm">
                ({updateProductDetail.rating?.count} reviews)
              </span>
            </div>

            <p className="text-2xl font-semibold text-[#007e4b] mb-6">
              ${updateProductDetail.price}
            </p>

            <div className="flex items-center gap-5 mt-auto ">
              <button
                className={`bg-neutral-950 hover:bg-neutral-900 px-6 py-3 rounded-md shadow-sm transition-all text-white text-[16px] p-1 cursor-pointer ease-in-out duration-100 active:[transform:scale(0.98)] flex items-center justify-center gap-2 ${
                  updateProductDetail?.quantity === 10
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                onClick={(e) =>
                  cartDispatch({ type: "ADD_TO_CART", newProduct: product })
                }
              >
                Add to Cart
                {updateProductDetail?.quantity && (
                  <span className="w-[20px] h-[20px] rounded-full text-[12px] flex items-center justify-center bg-white text-black">
                    {updateProductDetail?.quantity}
                  </span>
                )}
              </button>
              <Link
                to={"/cart"}
                className="bg-neutral-950 hover:bg-neutral-900 px-6 py-3 rounded-md shadow-sm transition-all text-white text-[16px] p-1 cursor-pointer ease-in-out duration-100 active:[transform:scale(0.98)] flex items-center justify-center gap-2 "
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
