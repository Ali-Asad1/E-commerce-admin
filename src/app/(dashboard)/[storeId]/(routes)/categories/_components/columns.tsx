"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cellAciton";
import HeaderAction from "./headerAction";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <HeaderAction column={column} label="Name" />,
  },
  {
    accessorKey: "billboardLabel",
    header: ({ column }) => <HeaderAction column={column} label="Billboard" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <HeaderAction column={column} label="Date" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
