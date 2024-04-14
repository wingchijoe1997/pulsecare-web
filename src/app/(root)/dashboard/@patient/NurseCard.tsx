import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const NurseCard = ({ className }: { className?: string }) => (
  <Card className={cn("flex flex-col justify-between", className)}>
    <CardHeader className="pb-2">
      <CardDescription>Your Nurse</CardDescription>
      <div className="flex flex-row items-center justify-between gap-4 pb-2">
        <CardTitle className="text-4xl">Marcus Chui</CardTitle>
        <Avatar>
          <AvatarImage alt="" src="https://github.com/marcuschui2022.png" />
          <AvatarFallback>TA</AvatarFallback>
        </Avatar>
      </div>
    </CardHeader>

    <CardFooter>
      <Progress value={100} aria-label="25% increase" />
    </CardFooter>
  </Card>
);
