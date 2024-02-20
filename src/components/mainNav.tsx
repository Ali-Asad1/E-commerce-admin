"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/utils/cnUtils";

const MainNav: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      label: "Overview",
      href: `/${params.storeId}`,
      active: pathname === `/${params.storeId}`,
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
            item.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
export default MainNav;
