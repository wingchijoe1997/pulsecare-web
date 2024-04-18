"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { AddMedicalDataForm } from "./AddMedicalRecordForm";

import { MutationResult, OperationVariables } from "@apollo/client";

interface addMedicalDataCardProps {
  sessionUser: User;
  className?: string;
  addMedicalData: ({ variables }: OperationVariables) => Promise<any>;
  state: MutationResult;
}

export const AddMedicalDataCard = ({
  sessionUser,
  className,
  addMedicalData,
  state,
}: addMedicalDataCardProps) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-3">
        <CardTitle>Your Medical Data</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing our new feature that allows you to store and manage your
          medical data. These will be shared with your nurse.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <AddMedicalDataForm
          addMedicalData={addMedicalData}
          {...{ sessionUser }}
          state={state}
        />
      </CardFooter>
    </Card>
  );
};
