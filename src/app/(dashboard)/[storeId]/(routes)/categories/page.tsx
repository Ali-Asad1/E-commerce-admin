import { auth } from "@clerk/nextjs";
import { format } from "date-fns";
import { notFound, redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import CategoryClient from "./_components/client";
import { CategoryColumn } from "./_components/columns";

async function getCategories(storeId: string) {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!categories) notFound();

  return categories;
}

const Page = async ({ params }: { params: { storeId: string } }) => {
  const categories = await getCategories(params.storeId);

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, "d MMM yyy"),
  }));

  return <CategoryClient data={formattedCategories} />;
};
export default Page;
