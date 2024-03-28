"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@repo/ui/lib/utils";
import { TSelectStoreCategory } from "@/db/schema";

interface IProps {
  data: TSelectStoreCategory[];
  name: string;
  valueKey: string;
}

const MediumCategories = ({ data, name, valueKey }: IProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <ul className="flex flex-col gap-2">
        {data.map((category) => (
          <li
            key={category.id}
            className={cn(
              "text-md text-gray-800 cursor-pointer hover:font-bold p-2",
              selectedValue === category.id ? "font-bold" : "font-normal"
            )}
            onClick={() => onClick(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediumCategories;
