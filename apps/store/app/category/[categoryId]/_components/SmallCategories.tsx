"use client";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { TSelectStoreCategory } from "@/db/schema";

interface IProps {
  data: TSelectStoreCategory[];
  valueKey: string;
}

const SmallCategories = ({ data, valueKey }: IProps) => {
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
    <ul className="flex border rounded">
      {data.map((category) => (
        <li
          key={category.id}
          className={`p-4 cursor-pointer ${selectedValue === category.id ? "font-bold" : ""}`}
          onClick={() => onClick(category.id)}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};

export default SmallCategories;
