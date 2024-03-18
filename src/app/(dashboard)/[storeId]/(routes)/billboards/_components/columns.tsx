"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellAction from "./cellAciton";
import HeaderAction from "./headerAction";

export type BillboardColumn = {
  id: string;
  label: string;
  createAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: ({ column }) => <HeaderAction column={column} label="Label" />,
  },
  {
    accessorKey: "createAt",
    header: ({ column }) => <HeaderAction column={column} label="Date" />,
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
