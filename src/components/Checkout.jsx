import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/productContext";
import images from "../utils/images";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CART_ACTIONS } from "../constants/actionTypes";

const INPUT_FIELDS = [
  { type: "text", name: "fullName", placeholder: "Full Name" },
  { type: "text", name: "address", placeholder: "Address" },
  { type: "text", name: "city", placeholder: "City" },
  { type: "number", name: "pinCode", placeholder: "Pin Code" },
  { type: "text", name: "country", placeholder: "Country" },
];

export default function Checkout() {
  const { cartState, cartDispatch } = useContext(ProductContext);

  const { cart, subTotalPrice } = cartState;

  const [userDetail, setUserDetail] = useState({
    fullName: "",
    address: "",
    city: "",
    pinCode: "",
    country: "",
  });

  const [isEmptyUserDetail, setIsEmptyUserDetail] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [paymentPlatform, setPaymentPlatform] = useState(0);

  const handleUserDetail = (e) => {
    setUserDetail((detail) => ({ ...detail, [e.target.name]: e.target.value }));
  };

  const submitUserDetail = (e) => {
    e.preventDefault();
    if (!isEmptyUserDetail) {
      localStorage.setItem("userDetail", JSON.stringify(userDetail));
      setUserDetail({
        fullName: "",
        address: "",
        city: "",
        pinCode: "",
        country: "",
      });

      localStorage.removeItem("cart");

      cart.forEach((product) => {
        cartDispatch({
          type: CART_ACTIONS.REMOVE_FROM_CART,
          productId: product.id,
        });
      });

      setTimeout(() => {
        navigate(`${location.pathname}/order-placed`);
      }, 0);
    }
  };

  useEffect(() => {
    const hasEmptyField = Object.values(userDetail).some(
      (value) => value.trim() === ""
    );
    setIsEmptyUserDetail(hasEmptyField);
  }, [userDetail]);

  useEffect(() => {
    const savedDetail = localStorage.getItem("userDetail");

    if (savedDetail) {
      const parsedDetail = JSON.parse(savedDetail);
      setUserDetail((prev) => ({
        ...prev,
        ...parsedDetail,
      }));
    }
  }, []);

  return (
    <>
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        <form
          onSubmit={submitUserDetail}
          className="space-y-6 bg-white p-4 sm:p-6 rounded-xl shadow-[0px_2px_8px_0px_#63636333] sticky h-max top-[124px] order-2 lg:order-1"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>

          {INPUT_FIELDS.map(({ type, name, placeholder }, i) => (
            <input
              key={"input-" + i}
              type={type}
              name={name}
              placeholder={placeholder}
              className={`w-full p-2 border rounded ${
                type === "number"
                  ? "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  : ""
              }`}
              required
              value={userDetail[name]}
              onChange={handleUserDetail}
            />
          ))}

          <button
            type="submit"
            className={`w-full bg-neutral-900 text-white py-2.5 cursor-pointer rounded hover:bg-neutral-800  transition-all ease-in-out duration-100 active:[transform:scale(0.98)] ${
              isEmptyUserDetail ? "pointer-events-none opacity-50" : ""
            }`}
          >
            Place Order
          </button>
        </form>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-[0px_2px_8px_0px_#63636333] order-1 lg:order-2">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="overflow-auto">
            <table className="w-full">
              <tbody>
                <tr className="text-sm">
                  <th className="whitespace-nowrap p-2 border border-neutral-500">
                    product
                  </th>
                  <th className="whitespace-nowrap p-2 border border-neutral-500">
                    quantity
                  </th>
                  <th className="whitespace-nowrap p-2 border border-neutral-500">
                    price
                  </th>
                  <th className="whitespace-nowrap p-2 border border-neutral-500">
                    total price
                  </th>
                </tr>
                {cart.map((product, i) => (
                  <tr className="text-sm" key={"checkout-product-" + i}>
                    <td className="p-2 border border-neutral-500">
                      {product.title}
                    </td>
                    <td className="p-2 text-center border border-neutral-500">
                      {product.quantity}
                    </td>
                    <td className="p-2 text-center border border-neutral-500">
                      ${product.price}
                    </td>
                    <td className="p-2 text-center border border-neutral-500">
                      ${product.totalPrice}
                    </td>
                  </tr>
                ))}
                <tr className="font-bold text-sm">
                  <td colSpan={3} className="p-2 border border-neutral-500">
                    Total
                  </td>
                  <td className="p-2 text-center border border-neutral-500">
                    ${subTotalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Payment</h3>

            <div className="flex gap-1">
              {[images.amazon_pay, images.google_pay, images.paypal].map(
                (platform, i) => (
                  <img
                    onClick={() => setPaymentPlatform(i)}
                    className={`w-[90px] cursor-pointer p-1 object-contain ${
                      i === paymentPlatform
                        ? "bg-[#a4a4a459]  shadow-[0px_1px_4px_#00000029]"
                        : ""
                    }`}
                    src={platform}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Outlet></Outlet>
    </>
  );
}
