import React, { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { Link } from "react-router-dom";
import { CART_ACTIONS } from "../constants/actionTypes";
import Ratings from "./Ratings";

export default function ProductCards() {
  const { filteredProducts, productState, cartDispatch } =
    useContext(ProductContext);

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-5  sm:gap-y-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
      {filteredProducts.map((product) => (
        <Link
          key={product.id}
          to={`/product/${encodeURIComponent(product.title)}`}
          state={{ productId: product.id }}
          className="group relative border-1 rounded-2xl border-[#00000036] p-3 flex flex-col h-max"
        >
          <img
            src={product.image}
            alt={product.title}
            className="aspect-square w-full rounded-md bg-none object-contain group-hover:opacity-75 lg:aspect-auto lg:h-[250px]"
          />
          <div className="my-4 flex flex-col gap-1">
            <h3 className="text-sm font-medium text-gray-700 line-clamp-2 h-[40px]">
              {product.title}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <Ratings ratings={product.rating.rate}></Ratings>

              <span className="text-gray-800 font-medium">
                {product.rating?.rate}
              </span>
              <span className="text-gray-500 text-sm">
                ({product.rating?.count} reviews)
              </span>
            </div>
            <p className="text-[18px] font-medium text-[#007e4b]">
              ${product.price}
            </p>
          </div>
          <button
            className={`bg-black text-white text-[16px] p-2 rounded-sm mt-auto cursor-pointer transition-all ease-in-out duration-100 active:[transform:scale(0.98)] flex items-center justify-center gap-2 ${
              product.quantity === 10 ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              cartDispatch({
                type: CART_ACTIONS.ADD_TO_CART,
                newProduct: product,
              });
            }}
          >
            Add to Cart
            {product.quantity && (
              <span className="w-[20px] h-[20px] rounded-full text-[12px] flex items-center justify-center bg-white text-black">
                {product.quantity}
              </span>
            )}
          </button>
        </Link>
      ))}
    </div>
  );
}
