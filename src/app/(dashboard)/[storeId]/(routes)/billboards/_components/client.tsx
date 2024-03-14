"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const BillboardClient = () => {
  const { push } = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Billboards" description="Manage billboards in your store" />
        <Button size="icon" onClick={() => push(`/${params.storeId}/billboards/new`)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
    </>
  );
};
export default BillboardClient;
