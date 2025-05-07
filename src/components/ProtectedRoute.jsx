import React, { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { cartState } = useContext(ProductContext);

  const { cart } = cartState;
  if (cart.length === 0) {
    return <Navigate to={"/"} replace />;
  }
  return children;
}
