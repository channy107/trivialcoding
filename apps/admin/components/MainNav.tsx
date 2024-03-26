"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";
import { TSelectServiceCategory } from "@/db/schema";

interface Props {
  categories: TSelectServiceCategory[];
}

const MainNav = ({ categories }: Props) => {
  const pathname = usePathname();
  const params = useParams<{ serviceName: string }>();

  const serviceCategory = pathname.split("/").pop();

  const routes = categories.map((category) => ({
    href: `/${params.serviceName}/${category.name}`,
    label: category.label,
    active: serviceCategory === category.name,
  }));

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-6")}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
