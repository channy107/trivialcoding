"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { TSelectBanner } from "@/db/schema";
import "swiper/css";
import ImageCarousel from "@/components/ImageCarousel";

interface IProps {
  data: TSelectBanner[];
}

const Banner = ({ data }: IProps) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <ImageCarousel
        images={data[0].images}
        imageContainerStyle="rounded aspect-square md:aspect-[2/1]"
      />
    </div>
  );
};

export default Banner;
