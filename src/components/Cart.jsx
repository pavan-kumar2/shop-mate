import React, { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { Link } from "react-router-dom";
import { CART_ACTIONS } from "../constants/actionTypes";

export default function Cart() {
  const { cartDispatch, filteredProducts, cartState } =
    useContext(ProductContext);

  const { subTotalPrice } = cartState;

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex-1 overflow-y-auto px-2 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <h2
            className="text-lg font-medium text-gray-900"
            id="slide-over-title"
          >
            Shopping cart
          </h2>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            <ul
              role="list"
              className="-my-6 divide-y divide-gray-200 border-b border-gray-200 "
            >
              {filteredProducts.map((product) => (
                <li key={product.id} className="flex py-6">
                  <Link
                    to={`/product/${encodeURIComponent(product.title)}`}
                    state={{ productId: product.id }}
                    className="size-25 sm:size-50 shrink-0 overflow-hidden rounded-md border border-gray-200"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="size-full object-contain"
                    />
                  </Link>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link
                            to={`/product/${encodeURIComponent(product.title)}`}
                            state={{ productId: product.id }}
                          >
                            {product.title}
                          </Link>
                        </h3>
                        <p className="ml-4 text-[#007e4b] text-[20px]">
                          ${product.totalPrice}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                      <p className="mt-1 text-base font-medium text-[#007e4b]">
                        ${product.price}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex gap-2 items-center">
                        <p className="text-gray-500">Qty {product.quantity}</p>

                        <button
                          type="button"
                          className={`bg-black text-white text-2xl font-medium p-1 w-[30px] h-[30px] leading-[30px] rounded-sm mt-auto cursor-pointer transition-all ease-in-out duration-100 active:[transform:scale(0.95)] flex items-center justify-center ${
                            product.quantity === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }`}
                          onClick={() =>
                            cartDispatch({
                              type: CART_ACTIONS.MANAGE_QUANTITY,
                              payload: {
                                productId: product.id,
                                actionState: "decrement",
                              },
                            })
                          }
                        >
                          -
                        </button>
                        <button
                          type="button"
                          className={`bg-black text-white text-2xl font-medium p-1 w-[30px] h-[30px] leading-[30px] rounded-sm mt-auto cursor-pointer transition-all ease-in-out duration-100 active:[transform:scale(0.95)] flex items-center justify-center ${
                            product.quantity === 10
                              ? "pointer-events-none opacity-50"
                              : ""
                          }`}
                          onClick={() =>
                            cartDispatch({
                              type: CART_ACTIONS.MANAGE_QUANTITY,
                              payload: {
                                productId: product.id,
                                actionState: "increment",
                              },
                            })
                          }
                        >
                          +
                        </button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-amber-500 hover:text-amber-400 cursor-pointer"
                          onClick={() =>
                            cartDispatch({
                              type: CART_ACTIONS.REMOVE_FROM_CART,
                              productId: product.id,
                            })
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="px-2 py-6 sm:px-6 max-w-2xl w-full ml-auto">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p className="text-[#007e4b] text-[20px]">${subTotalPrice}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-neutral-800 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-neutral-700"
          >
            Checkout
          </a>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link
              to="/"
              className="font-medium text-neutral-800 hover:text-neutral-700"
            >
              Continue Shopping <span aria-hidden="true"> &rarr;</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
