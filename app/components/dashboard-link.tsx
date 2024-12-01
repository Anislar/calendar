"use client";
import {
  CalendarCheck,
  HomeIcon,
  LucideIcon,
  Settings,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface INavigationProps {
  id: number;
  name: string;
  href: string;
  icon: LucideIcon;
}
export const dashboardLinksArray: INavigationProps[] = [
  {
    id: 0,
    name: "Event Types",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Meetings",
    href: "/dashboard/meetings",
    icon: Users2,
  },
  {
    id: 2,
    name: "Availability",
    href: "/dashboard/availability",
    icon: CalendarCheck,
  },
  {
    id: 3,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
function DashboardLinks() {
  const pathname = usePathname();
  return (
    <>
      {dashboardLinksArray.map((link) => (
        <Link
          className={cn(
            link.href === pathname
              ? "text-primary bg-primary/10"
              : " text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
          key={link.id}
          href={link.href}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
}

export default DashboardLinks;
