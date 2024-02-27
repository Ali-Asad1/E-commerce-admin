import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

import MainNav from "@/components/mainNav";
import StoreSwitcher from "@/components/storeSwitcher";

async function getUserStores() {
  const user = auth();
  if (!user) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId: user.userId as string,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return stores;
}

const Navbar = async () => {
  const stores = await getUserStores();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
