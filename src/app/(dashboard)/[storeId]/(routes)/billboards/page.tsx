import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { notFound, redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import BillboardClient from "./_components/client";
import { BillboardColumn } from "./_components/columns";

async function getBillboards(storeId: string) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!billboards) notFound();

  return billboards;
}

const Page = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await getBillboards(params.storeId);

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
    id: billboard.id,
    label: billboard.label,
    createAt: format(billboard.createdAt, "d MMM yyy"),
  }));

  return <BillboardClient data={formattedBillboards} />;
};
export default Page;
