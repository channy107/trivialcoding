"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import Heading from "@components/Heading";
import DataTable from "@components/DataTable";
import { CategoryColumn, columns } from "./CategoryColumn";
import { Button } from "@repo/ui/components/ui/button";
import { ADMIN_STORE_ROUTES } from "@/routes";

interface Props {
  data: CategoryColumn[];
}

const CategoryTable = ({ data }: Props) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`카테고리 목록 (${data.length})`} />
        <Button
          onClick={() => router.push(`${ADMIN_STORE_ROUTES.ADD_CATEGORY}`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          만들기
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="smallCategory" />
    </>
  );
};

export default CategoryTable;
