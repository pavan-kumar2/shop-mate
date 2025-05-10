import React, { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import images from "../utils/images";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Link } from "react-router-dom";

const DESKTOP_BANNER = [
  { id: "3", imgUrl: images.banner1, title: "Mens Cotton Jacket" },
  { id: "6", imgUrl: images.banner2, title: "Solid Gold Petite Micropave" },
  {
    id: "17",
    imgUrl: images.banner3,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  },
  {
    id: "14",
    imgUrl: images.banner4,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
  },
];

const MOBILE_BANNER = [
  { id: "3", imgUrl: images.mobileBanner1, title: "Mens Cotton Jacket" },
  {
    id: "6",
    imgUrl: images.mobileBanner2,
    title: "Solid Gold Petite Micropave",
  },
  {
    id: "17",
    imgUrl: images.mobileBanner3,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  },
  {
    id: "14",
    imgUrl: images.mobileBanner4,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
  },
];

const HeroBanner = () => {
  const [heroBanner, setHeroBanner] = useState(DESKTOP_BANNER);

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = window.matchMedia("(max-width:767px)").matches;
      setHeroBanner(isMobile ? MOBILE_BANNER : DESKTOP_BANNER);
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return (
    <div>
      <Swiper
        effect="coverflow"
        spaceBetween={25}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        coverflowEffect={{ rotate: 50 }}
        modules={[Autoplay, EffectCoverflow]}
      >
        {heroBanner.map((banner, i) => (
          <SwiperSlide
            key={"banner" + i}
            className="rounded-b-xl cursor-pointer overflow-hidden"
          >
            <Link
              to={`/product/${encodeURIComponent(banner.title)}`}
              state={{ productId: banner.id }}
            >
              <img
                className=" w-full object-fill"
                src={banner.imgUrl}
                alt={"banner-image" + i}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(HeroBanner);
