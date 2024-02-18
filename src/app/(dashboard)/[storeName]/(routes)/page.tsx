import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function getStore(storeId: string) {
  "use server";
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return store;
}

const Page = async ({ params }: { params: { storeId: string } }) => {
  const store = await getStore(params.storeId);

  return <div>Store : {store?.name}</div>;
};
export default Page;
