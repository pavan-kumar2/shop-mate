import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ProductContext } from "../context/productContext";
import images from "../utils/images";

export default function Header() {
  const { searchQuery, setSearchQuery, setCategory, cartState, productId } =
    useContext(ProductContext);

  const { cart } = cartState;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? "hidden" : "auto";
  };

  return (
    <header className="bg-white sticky top-0 z-10">
      <nav
        className="mx-auto bg-black flex lg:flex-row flex-col gap-3 items-center justify-between p-4 lg:px-5 relative"
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
        <div className="flex gap-5 lg:w-auto w-full">
          {!productId && (
            <div className="flex justify-center items-center bg-white rounded-lg relative lg:w-[240px] w-full h-[38px]">
              <img
                className="absolute left-1.5 top-1/2 -translate-y-1/2 w-[17px]"
                src={images.searchIcon}
                alt="search icon"
              />

              <input
                className="pl-7 py-1 pr-2 rounded-lg w-full h-full text-sm font-medium"
                type="search"
                placeholder="Search Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute -bottom-[35px] left-0 w-full bg-white z-50">
                <ul>
                  {/* <li className="p-1">All Select</li> */}
                  <li
                    className="p-1"
                    onClick={() => setCategory("men's clothing")}
                  >
                    men's clothing
                  </li>
                  <li className="p-1" onClick={() => setCategory("jewelery")}>
                    jewelery
                  </li>{" "}
                  <li
                    className="p-1"
                    onClick={() => setCategory("electronics")}
                  >
                    electronics
                  </li>
                  <li
                    className="p-1"
                    onClick={() => setCategory("women's clothing")}
                  >
                    women's clothing
                  </li>
                </ul>
              </div>
            </div>
          )}

          <button
            onClick={() => toggleHamburgerMenu()}
            type="button"
            className="lg:hidden text-white ml-auto"
          >
            <img className="w-6" src={images.hamburgerIcon} />
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
