"use client";

import { z } from "zod";
import { ShoppingCart } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Currency from "@components/Currency";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";
import { Button } from "@repo/ui/components/ui/button";
import useCart from "@/hooks/useCart";
import { TSelectStoreProduct } from "@/db/schema";

interface IProps {
  data: TSelectStoreProduct;
}

const cartFormSchema = z.object({
  size: z.string().min(1, {
    message: "사이즈를 선택해주세요.",
  }),
  color: z.string().min(1, {
    message: "색상을 선택해주세요.",
  }),
});

const Info = ({ data }: IProps) => {
  const cart = useCart();

  const form = useForm<z.infer<typeof cartFormSchema>>({
    resolver: zodResolver(cartFormSchema),
    defaultValues: {
      size: "",
      color: "",
    },
  });

  const {
    formState: { errors },
  } = form;

  const onAddToCart = (formData: z.infer<typeof cartFormSchema>) => {
    const newData = {
      id: data.id,
      images: data.thumbnailImages,
      name: data.name,
      price: data.price + "",
      color: formData.color,
      size: formData.size,
    };
    cart.addItem(newData);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAddToCart)}>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>사이즈</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="사이즈"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data.sizesToProducts.map((item) => (
                          <SelectItem key={item.id} value={item.size.name}>
                            {item.size.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>색상</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="색상"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data.colorsToProducts.map((item) => (
                          <SelectItem key={item.id} value={item.color.name}>
                            {item.color.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mt-10 flex items-center gap-x-3">
            <Button type="submit" className="flex items-center gap-x-2">
              Add To Cart
              <ShoppingCart size={20} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Info;
