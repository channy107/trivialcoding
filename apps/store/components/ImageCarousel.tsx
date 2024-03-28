"use client";

import Image from "next/image";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "@repo/ui/lib/utils";

interface IProps {
  images: string[];
  imageContainerStyle?: string;
}

const ImageCarousel = ({ imageContainerStyle, images }: IProps) => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
    >
      {images.map((image) => (
        <SwiperSlide key={image}>
          <div
            className={cn(
              "relative rounded aspect-square",
              imageContainerStyle
            )}
          >
            <Image
              key={image}
              src={image}
              fill
              alt={`carousel`}
              priority
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageCarousel;
