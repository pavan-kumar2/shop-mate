import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Submitted", form);
    // add your submit logic here
  };

  return (
    // <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
    //   {/* Shipping Form */}
    //   <form
    //     onSubmit={handleSubmit}
    //     className="space-y-4 bg-white p-6 rounded-xl shadow-md"
    //   >
    //     <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
    //     <input
    //       type="text"
    //       name="fullName"
    //       placeholder="Full Name"
    //       value={form.fullName}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //     <input
    //       type="text"
    //       name="address"
    //       placeholder="Address"
    //       value={form.address}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //     <input
    //       type="text"
    //       name="city"
    //       placeholder="City"
    //       value={form.city}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //     <input
    //       type="text"
    //       name="postalCode"
    //       placeholder="Postal Code"
    //       value={form.postalCode}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //     <input
    //       type="text"
    //       name="country"
    //       placeholder="Country"
    //       value={form.country}
    //       onChange={handleChange}
    //       className="w-full p-2 border rounded"
    //       required
    //     />
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    //     >
    //       Place Order
    //     </button>
    //   </form>

    //   {/* Order Summary */}
    //   <div className="bg-white p-6 rounded-xl shadow-md">
    //     <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
    //     {/* You can replace this with dynamic cart items */}
    //     <ul className="space-y-2">
    //       <li className="flex justify-between">
    //         <span>Product 1</span>
    //         <span>$25.00</span>
    //       </li>
    //       <li className="flex justify-between">
    //         <span>Product 2</span>
    //         <span>$45.00</span>
    //       </li>
    //     </ul>
    //     <hr className="my-4" />
    //     <div className="flex justify-between font-semibold">
    //       <span>Total</span>
    //       <span>$70.00</span>
    //     </div>
    //     {/* Payment section placeholder */}
    //     <div className="mt-6">
    //       <h3 className="text-lg font-medium mb-2">Payment</h3>
    //       <p className="text-sm text-gray-600">
    //         [Integrate payment gateway here]
    //       </p>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order is being processed and will be
          shipped soon.
        </p>
        <Link
          to="/"
          className="inline-block bg-neutral-900 text-white px-6 py-2 rounded hover:bg-neutral-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
