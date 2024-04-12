import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Activity,
  LineChart,
  Package,
  PanelLeft,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";

// Create a prop to pass link and lucide icons based on role.
import { SidebarLinks } from "./Sidebar";

export default function CollapsibleSidebar({
  sidebarLinks,
}: {
  sidebarLinks: SidebarLinks;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Activity className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Pulsecare</span>
          </Link>
          {/* Loop through the props to create the sidebar links */}
          {sidebarLinks.map(({ name, link, icon }, index) => {
            const Icon = icon;
            return (
              <Link
                key={index}
                href={link}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                {name}
              </Link>
            );
          })}
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Customers
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LineChart className="h-5 w-5" />
            Settings
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
