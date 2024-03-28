"use client";

import { useRouter } from "next/navigation";

import Currency from "@components/Currency";
import { TSelectStoreProduct } from "@/db/schema";
import ImageCarousel from "./ImageCarousel";

interface IProps {
  data: TSelectStoreProduct;
}

const ProductCard = ({ data }: IProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  return (
    <div
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
      onClick={handleClick}
    >
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <ImageCarousel images={data.thumbnailImages} />
      </div>
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-gray-500">{`${data.largeCategory.name} > ${data.mediumCategory.name}`}</p>
      </div>

      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
