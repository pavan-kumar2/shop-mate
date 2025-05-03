import React, { useContext } from "react";
import { Link } from "react-router-dom";
import images from "../utils/images";
import { ProductContext } from "../context/productContext";

export default function Footer() {
  const { setCategory, categoryListState, category } =
    useContext(ProductContext);

  const { categories } = categoryListState;

  return (
    <footer className="bg-gray-900 text-white px-5 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to={"/"}>
            <h2 className="text-2xl font-bold mb-4">ShopMate</h2>
          </Link>

          <p className="text-gray-400 text-sm">
            Your one-stop shop for electronics, fashion, and more. Secure
            shopping, fast delivery.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link className="hover:text-white" to={"/"}>
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to={"/"}>
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to={"/"}>
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-white" to={"/"}>
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {categories.length && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {categories.map((item, index) => (
                <li
                  className="hover:text-white cursor-pointer"
                  key={"footer-category-" + index}
                  onClick={() => setCategory(item.value)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={images.facebookLogo}
                alt="Facebook"
                className="w-6 h-6 hover:opacity-80"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={images.instagramLogo}
                alt="Instagram"
                className="w-6 h-6 hover:opacity-80"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={images.xTwitterLogo}
                alt="X"
                className="w-6 h-6 hover:opacity-80"
              />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img
                src={images.linkedinLogo}
                alt="LinkedIn"
                className="w-6 h-6 hover:opacity-80"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ShopMate. All rights reserved.
      </div>
    </footer>
  );
}
