import React, { useContext, useEffect } from "react";
import Cart from "../components/Cart";
import { ProductContext } from "../context/productContext";
import images from "../utils/images";

const CartPage = () => {
  const { filteredProducts, cartState } = useContext(ProductContext);

  const { cart } = cartState;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-3 py-3 sm:px-4 sm:py-4 lg:max-w-7xl min-h-[calc(100dvh-76px))] flex flex-col">
      {cart.length && filteredProducts.length ? (
        <Cart></Cart>
      ) : !cart.length ? (
        <img
          className="max-w-[375px] m-auto"
          src={images.noCartProducts}
          alt="cart items not found"
        />
      ) : !filteredProducts.length ? (
        <img
          className="max-w-[375px] m-auto"
          src={images.noSearchResultFound}
          alt="search result not found"
        />
      ) : null}
    </div>
  );
};

export default CartPage;
