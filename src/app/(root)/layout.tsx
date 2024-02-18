import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

async function getCurrentUserStore() {
  "use server";
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      userId: userId as string,
    },
  });

  return store;
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const store = await getCurrentUserStore();
  if (store) redirect(`/${store.id}`);

  return <>{children}</>;
}
