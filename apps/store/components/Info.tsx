"use client";

import { ShoppingCart } from "lucide-react";

import Currency from "@components/Currency";
import { Button } from "@repo/ui/components/ui/button";
import useCart from "@/hooks/useCart";
import { TSelectStoreProduct } from "@/db/schema";

interface InfoProps {
  data: TSelectStoreProduct;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>
            {data?.sizesToProducts.map((item) => item.size.name).join(", ")}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          {data?.colorsToProducts.map((item) => (
            <div
              className="h-6 w-6 rounded-full border border-gray-600"
              style={{ backgroundColor: item.color.value }}
            />
          ))}
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
