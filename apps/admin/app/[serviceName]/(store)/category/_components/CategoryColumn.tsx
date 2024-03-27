"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export interface CategoryColumn {
  id: string;
  name: string;
  type: string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    minSize: 300,
    maxSize: 500,
    header: "카테고리",
  },
  {
    accessorKey: "type",
    minSize: 150,
    maxSize: 400,
    header: "타입",
  },

  {
    accessorKey: "createdAt",
    minSize: 150,
    maxSize: 300,
    header: "생성날짜",
  },
  {
    id: "actions",
    size: 50,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
