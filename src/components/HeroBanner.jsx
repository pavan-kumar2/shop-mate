import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import images from "../utils/images";
import { Autoplay, EffectCoverflow } from "swiper/modules";

const DESKTOP_BANNER = [
  images.banner1,
  images.banner2,
  images.banner3,
  images.banner4,
];

const MOBILE_BANNER = [
  images.mobileBanner1,
  images.mobileBanner2,
  images.mobileBanner3,
  images.mobileBanner4,
];

export default function HeroBanner() {
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
          <SwiperSlide key={i} className="rounded-b-xl overflow-hidden">
            <img
              className="h-[300px] w-full object-fill"
              src={banner}
              alt={"banner-image" + i}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
