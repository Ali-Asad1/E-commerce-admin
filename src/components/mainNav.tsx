"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/utils/utils";

const MainNav: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      label: "Overview",
      href: `/${params.storeId}`,
      active: pathname === `/${params.storeId}`,
    },
    {
      label: "Billboards",
      href: `/${params.storeId}/billboards`,
      active: pathname.includes(`/${params.storeId}/billboards`),
    },
    {
      label: "Categories",
      href: `/${params.storeId}/categories`,
      active: pathname.includes(`/${params.storeId}/categories`),
    },
    {
      label: "Settings",
      href: `/${params.storeId}/settings`,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active ? "text-black dark:text-white" : "text-muted-foreground",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
export default MainNav;
