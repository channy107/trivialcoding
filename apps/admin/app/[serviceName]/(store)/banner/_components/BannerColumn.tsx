"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./CellAction";

export interface BannerColumn {
  id: string;
  type: string;
  createdAt: string;
}

export const columns: ColumnDef<BannerColumn>[] = [
  {
    accessorKey: "type",
    minSize: 300,
    maxSize: 500,
    header: "type",
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
