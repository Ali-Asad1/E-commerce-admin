"use client";

import { ColumnDef } from "@tanstack/react-table";

export type BillboardColumn = {
  id: string;
  label: string;
  createAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createAt",
    header: "Date",
  },
];
