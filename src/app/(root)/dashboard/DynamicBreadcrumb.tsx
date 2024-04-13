"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { capitalize } from "@/lib/utils";

export default function DynamicBreadcrumb() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const [displayedPaths, setDisplayedPaths] = useState(pathNames);
  useEffect(() => {
    const maxDisplayedItems = 3;

    if (pathNames.length > maxDisplayedItems) {
      const shortenedPaths = [
        ...pathNames.slice(0, maxDisplayedItems - 1),
        "<BreadcrumbEllipsis />",
        pathNames[pathNames.length - 1],
      ];
      setDisplayedPaths(shortenedPaths);
    } else {
      setDisplayedPaths(pathNames);
    }
  }, [paths]);
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {displayedPaths.map((path, index) => {
          if (path === "<BreadcrumbEllipsis />") {
            return (
              <>
                <BreadcrumbEllipsis />
                <BreadcrumbSeparator />
              </>
            );
          } else if (index === displayedPaths.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage>{capitalize(path)}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          } else {
            return (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link href={`/${path}`}>{capitalize(path)}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
