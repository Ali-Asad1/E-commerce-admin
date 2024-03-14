import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import BillboardsForm from "./_components/billboardForm";

async function getBillboard(billboardId: string) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const billboard = await prismadb.billboard
    .findFirst({
      where: {
        id: billboardId,
      },
    })
    .catch(() => null);

  if (!billboard) notFound();

  return billboard;
}

const Page = async ({ params }: { params: { billboardId: string } }) => {
  let billboard = null;
  if (params.billboardId !== "new") {
    billboard = await getBillboard(params.billboardId);
  }
  return <BillboardsForm initialData={billboard} />;
};
export default Page;
