"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/dataTable";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { CategoryColumn, columns } from "./columns";

const BillboardClient = ({ data }: { data: CategoryColumn[] }) => {
  const { push } = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Categories" description="Manage Categories in your store" />
        <Button size="icon" onClick={() => push(`/${params.storeId}/categories/new`)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
export default BillboardClient;
