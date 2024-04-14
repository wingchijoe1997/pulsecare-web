import { BarChart, Heart, Pill, Users } from "lucide-react";
import { SidebarLinks } from "../Sidebar";

export const sidebarLinks: SidebarLinks = [
  {
    name: "Monitored Patients",
    link: "/dashboard/patients",
    icon: Users,
  },
  {
    name: "Medications",
    link: "/dashboard/medications",
    icon: Pill,
  },
  {
    name: "Conditions",
    link: "/dashboard/conditions",
    icon: Heart,
  },
  {
    name: "Insights",
    link: "/dashboard/insights",
    icon: BarChart,
  },
];
