import React, { useContext, useEffect } from "react";
import ProductCards from "../components/ProductCards";
import { ProductContext } from "../context/productContext";
import SpinLoader from "../components/SpinLoader";
import images from "../utils/images";
import HeroBanner from "../components/HeroBanner";
import { ALL_CATEGORY } from "../constants/actionTypes";

const HomePage = () => {
  const { productState, filteredProducts, setSearchState, setCategory } =
    useContext(ProductContext);
  const { isLoading, error } = productState;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCategory(ALL_CATEGORY);
    setSearchState((prev) => ({ ...prev, query: "" }));
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-3 py-3 sm:px-4 sm:pb-10 pt-0 lg:max-w-7xl min-h-[calc(100dvh+220px))] flex flex-col gap-10">
      <HeroBanner></HeroBanner>

      {isLoading ? (
        <SpinLoader></SpinLoader>
      ) : !isLoading && filteredProducts.length ? (
        <ProductCards></ProductCards>
      ) : !isLoading && !filteredProducts.length && !error ? (
        <img
          src={images.noSearchResultFound}
          alt="search result not found"
          className="max-w-[375px] m-auto"
        />
      ) : !isLoading && !filteredProducts.length && error ? (
        <div className="max-w-[375px] text-center m-auto">
          <img src={images.notFound} alt="not found" className="w-full" />
          <p className="text-lg mt-1">Not found. Please try again!</p>
        </div>
      ) : null}
    </div>
  );
};
export default HomePage;
