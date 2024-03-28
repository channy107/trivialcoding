"use client";

import { TSelectBanner } from "@/db/schema";
import "swiper/css";
import ImageCarousel from "@/components/ImageCarousel";

interface IProps {
  mobileBanners?: TSelectBanner;
  webBanners?: TSelectBanner;
}

const Banner = ({ mobileBanners, webBanners }: IProps) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <ImageCarousel
        images={mobileBanners?.images || []}
        imageContainerStyle="rounded aspect-square lg:hidden"
      />
      <div className="hidden lg:block">
        <ImageCarousel
          images={webBanners?.images || []}
          imageContainerStyle="rounded aspect-[2/1]"
        />
      </div>
    </div>
  );
};

export default Banner;
