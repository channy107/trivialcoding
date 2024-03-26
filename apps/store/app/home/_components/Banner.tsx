"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { TSelectBanner } from "@/db/schema";
import "swiper/css";

interface IProps {
  data: TSelectBanner[];
}

const Banner = ({ data }: IProps) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <Swiper spaceBetween={20} slidesPerView={1} loop={true}>
        {data[0].images.map((image) => (
          <SwiperSlide key={image}>
            <div className="rounded-xl relative aspect-square md:aspect-[2/1] overflow-hidden ">
              <Image src={image} fill alt={"banner iamge"} priority />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
