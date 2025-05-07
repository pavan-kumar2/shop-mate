import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function OrderPlaced() {
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const storedUserDetail = localStorage.getItem("userDetail");
    if (storedUserDetail) {
      setUserDetail(JSON.parse(storedUserDetail));
    }
  }, []);

  return (
    <div className="sm:min-h-[85vh] min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-5 sm:p-8 rounded-xl sm:min-w-[450px] shadow-md text-center max-w-md">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">
          Order Placed Successfully!
        </h2>

        <p className="mb-2">
          Thank you for your order, <strong>{userDetail?.fullName}</strong>!
        </p>
        <p>We’ll ship it to:</p>
        <div className="mt-2 bg-gray-100 p-4 rounded">
          <p>{userDetail?.address}</p>
          <p>
            {userDetail?.city} - {userDetail?.pinCode}
          </p>
          <p>{userDetail?.country}</p>
        </div>
        <Link
          to="/"
          className="inline-block mt-6 bg-neutral-900 text-white px-6 py-2.5 rounded hover:bg-neutral-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
