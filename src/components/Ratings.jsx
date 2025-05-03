import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Ratings({ ratings, size = "16px" }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (ratings >= i) {
      stars.push(<FaStar key={i} size={size} className="text-yellow-500" />);
    } else if (ratings >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt key={i} size={size} className="text-yellow-500" />
      );
    } else {
      stars.push(<FaRegStar key={i} size={size} className="text-yellow-500" />);
    }
  }
  return <div className="flex items-center gap-1">{stars}</div>;
}
