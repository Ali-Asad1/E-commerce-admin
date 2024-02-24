import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import SettingsForm from "./_components/settingsForm";

async function getCurrentStore(storeId: string) {
  const user = auth();
  if (!user) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId: user.userId as string,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!store) notFound();

  return store;
}

const Page = async ({ params }: { params: { storeId: string } }) => {
  const store = await getCurrentStore(params.storeId);

  return (
    <>
      <SettingsForm initialData={store} />
    </>
  );
};
export default Page;
