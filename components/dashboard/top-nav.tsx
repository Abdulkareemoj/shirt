"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "~/components/shared/theme-toggle";
import UserDropdown from "./user-button";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function TopNav() {
  const pathname = usePathname();

  // Generate breadcrumbs based on the current path
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
            )}
            {index < breadcrumbs.length - 1 ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <UserDropdown /> <ModeToggle />
      </div>
    </nav>
  );
}

// Function to generate breadcrumbs based on the current path
function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Always start with home
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

  // Skip if we're on the home page
  if (pathname === "/") {
    return breadcrumbs;
  }

  // Split the path into segments and build breadcrumbs
  const segments = pathname.split("/").filter(Boolean);

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Format the segment for display (capitalize, replace hyphens with spaces)
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return breadcrumbs;
}
