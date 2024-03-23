"use client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@repo/ui/components/ui/button";

import Heading from "@components/Heading";
import DataTable from "@components/DataTable";
import { BrandColumn, columns } from "./BrandColumn";

import { ADMIN_STORE_ROUTES } from "@/routes";

interface Props {
  data: BrandColumn[];
}

const BrandTable = ({ data }: Props) => {
  const router = useRouter();
  const params = useParams<{ serviceName: string }>();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`브랜드 목록 (${data.length})`} />
        <Button onClick={() => router.push(`${ADMIN_STORE_ROUTES.ADD_BRAND}`)}>
          <Plus className="mr-2 h-4 w-4" />
          만들기
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};

export default BrandTable;
