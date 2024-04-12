import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Activity, LifeBuoy, LucideIcon } from "lucide-react";
import Link from "next/link";

// Create a prop to pass link and lucide icons based on role.
export type SidebarLinks = {
  name: string;
  link: string;
  icon: LucideIcon;
}[];

export default function SideBar({
  sidebarLinks,
}: {
  sidebarLinks: SidebarLinks;
}) {
  return (
    <aside className="inset-y fixed hidden left-0 z-20 sm:flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Link href="/" passHref>
          <Button variant="outline" size="icon" aria-label="Home">
            <Activity className="size-5" />
          </Button>
        </Link>
      </div>
      <nav className="grid gap-1 p-2">
        {/* Loop through the props to create the sidebar links */}
        {sidebarLinks.map(({ name, link, icon }, index) => {
          const Icon: LucideIcon = icon;
          // Study a strategy to set the selected link
          const isSelected = false;
          return (
            <Link key={index} href={link} passHref>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-lg ${isSelected ? "bg-muted" : ""}`}
                      aria-label={name}
                    >
                      <Icon className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={5}>
                    {name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          );
        })}
      </nav>
      <nav className="mt-auto grid gap-1 p-2">
        <Link href="/settings" passHref>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Help"
                >
                  <LifeBuoy className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </nav>
    </aside>
  );
}
