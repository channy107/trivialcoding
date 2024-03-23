"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export interface BannerColumn {
  id: string;
  name: string;
  createdAt: string;
}

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "name",
    minSize: 300,
    maxSize: 500,
    header: "이름",
  },
  {
    accessorKey: "createdAt",
    minSize: 400,
    maxSize: 500,
    header: "생성날짜",
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
