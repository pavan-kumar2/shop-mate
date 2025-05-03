import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ProductContext } from "../context/productContext";
import images from "../utils/images";
import { ALL_CATEGORY } from "../constants/actionTypes";

export default function Header() {
  const {
    searchState,
    setSearchState,
    setCategory,
    cartState,
    productId,
    categoryListState,
    category,
    filteredProducts,
  } = useContext(ProductContext);

  const { cart } = cartState;
  const { categories } = categoryListState;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const toggleHamburgerMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "auto";
  };

  useEffect(() => {
    setCategory(ALL_CATEGORY);
  }, []);

  return (
    <header className="bg-black sticky top-0 z-10">
      <nav
        className="max-w-7xl mx-auto flex lg:flex-row flex-col gap-3 items-center justify-between p-4 relative"
        aria-label="Global"
      >
        <Link to={"/"} className="lg:p-1.5 p-0 text-white text-2xl font-bold">
          ShopMate
        </Link>

        <div className="hidden lg:flex  text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `text-[1rem] px-5 py-2 font-semibold rounded-[5px] ${
                isActive ? "text-black bg-white" : "text-white bg-black"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) => {
              const baseClasses =
                "text-[1rem] px-5 py-2 font-semibold rounded-[5px] flex gap-1 items-center";
              const activeClasses = "text-black bg-white";
              const inactiveClasses = "text-white bg-black";

              return `${baseClasses} ${
                isActive ? activeClasses : inactiveClasses
              }`;
            }}
          >
            {({ isActive }) => (
              <>
                Cart
                {cart.length > 0 && (
                  <span
                    className={`w-[25px] h-[25px] rounded-full text-[14px] flex items-center justify-center ${
                      isActive ? "bg-black text-white" : "bg-white text-black"
                    }`}
                  >
                    {cart.length}
                  </span>
                )}
              </>
            )}
          </NavLink>
        </div>

        <div
          className={`flex gap-5 lg:w-auto w-full ${
            productId ? "absolute w-max right-4" : ""
          }`}
        >
          {!productId && filteredProducts.length && (
            <div className="relative w-full lg:w-[240px]">
              <div className="flex justify-center items-center bg-white rounded-lg h-[38px] relative">
                <img
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-[17px]"
                  src={images.searchIcon}
                  alt="search icon"
                />
                <input
                  className="pl-7 py-1 pr-2 rounded-lg w-full h-full text-sm font-medium"
                  type="search"
                  placeholder={searchState.placeholder}
                  value={searchState.query}
                  onChange={(e) =>
                    setSearchState((prev) => ({
                      ...prev,
                      query: e.target.value,
                    }))
                  }
                  onFocus={() => setIsCategoriesVisible(true)}
                  onBlur={() =>
                    setTimeout(() => setIsCategoriesVisible(false), 300)
                  }
                />
              </div>
              {isCategoriesVisible && (
                <div className="absolute group-focus-within:block w-full z-5">
                  <ul className=" bg-white shadow-md mt-0.5 rounded-md overflow-hidden">
                    {categories.map((item, index) => (
                      <li
                        key={"category-" + index}
                        className={`py-1.5 px-3 cursor-pointer  text-sm ${
                          item.value === category
                            ? "bg-neutral-800 text-white"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setCategory(item.value)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => toggleHamburgerMenu()}
            type="button"
            className="lg:hidden text-white ml-auto"
          >
            <img className="w-[25px] min-w-[25px]" src={images.hamburgerIcon} />
          </button>
        </div>
      </nav>

      {/* mobile hamburger menu */}
      {isMobileMenuOpen && (
        <div
          onClick={() => toggleHamburgerMenu()}
          className="lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 z-10 bg-[#13141742]"></div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-y-0 right-0 z-10 overflow-y-auto bg-white px-6 py-6 w-full max-w-2xs sm:ring-1 sm:ring-gray-900/10 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <Link
                to={"/"}
                className="lg:p-1.5 p-0 text-black text-2xl font-bold"
              >
                ShopMate
              </Link>
              <button
                onClick={() => toggleHamburgerMenu()}
                type="button"
                className="-m-2.5 rounded-md p-0.5 text-gray-700 cursor-pointer"
              >
                <img className="w-[15px]" src={images.closeIcon} alt="close" />
              </button>
            </div>
            <div className="space-y-2 py-6 h-full">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `-mx-3 flex gap-1 items-center rounded-lg px-3 py-2 text-base/7 font-semibold ${
                    isActive ? "text-white bg-black" : "text-black bg-white"
                  }`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) => {
                  const baseClasses =
                    "-mx-3 flex gap-1 items-center rounded-lg px-3 py-2 text-base/7 font-semibold ";
                  const activeClasses = "text-white bg-black";
                  const inactiveClasses = "text-black bg-white";

                  return `${baseClasses} ${
                    isActive ? activeClasses : inactiveClasses
                  }`;
                }}
              >
                {({ isActive }) => (
                  <>
                    Cart
                    {cart.length > 0 && (
                      <span
                        className={`w-[25px] h-[25px] rounded-full text-[14px] flex items-center justify-center ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {cart.length}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </div>
            {/* <div className="py-6">
            <a
              href="#"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
            >
              Log in
            </a>
          </div> */}
          </div>
        </div>
      )}
    </header>
  );
}
