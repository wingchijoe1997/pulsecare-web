"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AddMedicalDataForm } from "./AddMedicalRecordForm";
import { User } from "next-auth";

import { gql, useMutation } from "@apollo/client";
import { MedicalRecord } from "@prisma/client";
const ADD_MEDICAL_DATA = gql`
  mutation CreateMedicalRecord($medicalRecord: MedicalRecordInput) {
    createMedicalRecord(medicalRecord: $medicalRecord) {
      id
      patientId
      chestPain
      restingBloodPressure
      cholesterol
      fastingBloodSugar
      restingElectrocardio
      maxHeartRate
      exerciseInduced
      stDepressionInducedByExercise
      slope
      vesselsColoredByFluoroscopy
      thalliumStressTest
      hasHeartDisease
      createdAt
      updatedAt
    }
  }
`;
export const AddMedicalDataCard = ({
  sessionUser,
  className,
}: {
  sessionUser: Readonly<User>;
  className?: string;
}) => {
  const [addMedicalData, state] = useMutation<MedicalRecord>(ADD_MEDICAL_DATA, {
    // refetchQueries: [{ query: ADD_MEDICAL_DATA }]
  });
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
