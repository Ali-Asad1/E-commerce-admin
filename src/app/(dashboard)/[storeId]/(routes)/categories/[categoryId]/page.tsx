import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import CategoryForm from "./_components/categoryForm";

async function getBillboards(storeId: string) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const billboards = await prismadb.billboard
    .findMany({
      where: {
        storeId,
      },
      orderBy: {
        label: "asc",
      },
    })
    .catch(() => null);

  return billboards;
}

async function getCategory(categoryId: string) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const category = await prismadb.category
    .findFirst({
      where: {
        id: categoryId,
      },
    })
    .catch(() => null);

  if (!category) notFound();

  return category;
}

const Page = async ({ params }: { params: { categoryId: string; storeId: string } }) => {
  let category = null;
  if (params.categoryId !== "new") {
    category = await getCategory(params.categoryId);
  }
  const billboards = await getBillboards(params.storeId);

  return <CategoryForm billboards={billboards} initialData={category} />;
};
export default Page;
