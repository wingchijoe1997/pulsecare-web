"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

import { ActivityIcon, Menu } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { logout } from "@/actions/logout";
import { UserAvatar } from "./ui/user-avatar";
import { Badge } from "./ui/badge";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/nurse",
    label: "Protecte₫ Route",
  },
  {
    href: "/about",
    label: "About",
  },
];

export default function Topbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useCurrentUser();
  // create a function to handle the logout as server action
  const handleLogout = async () => {
    logout();
  };
  return (
    <header className="fixed border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex gap-5">
              <ActivityIcon />
              PulseCare
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                />

                <span className="sr-only">Menu Icon</span>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    PulseCare
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </Link>
                  ))}
                  {/* TODO: Implement Sign In Button */}
                  <Button
                    className={`border ${buttonVariants({ variant: "secondary" })}`}
                  >
                    <ActivityIcon className="mr-2 w-5 h-5" />
                    Sign-In
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            {/* TODO: Implement Sign In Button */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex gap-4 items-center">
                    <p className="text-muted-foreground">Hello, {user.name}</p>
                    <UserAvatar
                      user={{
                        name: user.name || undefined,
                        image: user.image || undefined,
                      }}
                      className="h-8 w-8"
                    />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {/* {session.data && <p className="font-medium">{JSON.stringify(session.data.user)}</p>} */}
                      <p className="font-medium">{user.name}</p>
                      {user.id}
                      <p>
                        <Badge>{user.role}</Badge>
                      </p>

                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={handleLogout}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login" passHref>
                <Button
                  className={`border ${buttonVariants({ variant: "secondary" })}`}
                >
                  <ActivityIcon className="mr-2 w-5 h-5" />
                  Sign-In
                </Button>
              </Link>
            )}

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
