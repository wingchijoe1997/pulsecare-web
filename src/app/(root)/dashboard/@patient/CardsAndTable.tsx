"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, ListFilter } from "lucide-react";
import { User } from "next-auth";
import { AddMedicalDataCard } from "./AddMedicalRecordCard";
import MedDataTable from "./MedicalRecordTable/MedDataTable";
import { NurseCard } from "./NurseCard";
import { useMutation, useQuery, gql } from "@apollo/client";
import { MedicalRecord } from "@prisma/client";

const GET_MEDICAL_RECORDS = gql`
  query MedicalRecord($medicalRecord: MedicalRecordInput) {
    medicalRecords(medicalRecord: $medicalRecord) {
      id
      # patientId
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

// To share the get MedData function with the AddMedicalDataCard
export default function CardsAndTable({ sessionUser }: { sessionUser: User }) {
  const getMedicalData = useQuery<{
    medicalRecords: MedicalRecord[];
  }>(GET_MEDICAL_RECORDS, {
    variables: {
      medicalRecord: {
        patientId: sessionUser.id,
      },
    },
  });

  const [addMedicalData, state] = useMutation<MedicalRecord>(ADD_MEDICAL_DATA, {
    onCompleted: () => {
      getMedicalData.refetch();
    },
  });

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <AddMedicalDataCard
          sessionUser={sessionUser}
          className="col-span-2"
          addMedicalData={addMedicalData}
          state={state}
        />

        <NurseCard className="col-span-2" />
        {/* <Card>
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">$5,329</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label="12% increase" />
        </CardFooter>
      </Card> */}
      </div>
      <Tabs defaultValue="week">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger disabled value="week">
              Week
            </TabsTrigger>
            <TabsTrigger disabled value="month">
              Month
            </TabsTrigger>
            <TabsTrigger disabled value="year">
              Year
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Fulfilled
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Export</span>
            </Button>
          </div>
        </div>
        <TabsContent value="week">
          <Card>
            <CardHeader className="px-7">
              <CardTitle>MedData</CardTitle>
              <CardDescription>Recent medical data entries.</CardDescription>
            </CardHeader>
            <CardContent>
              <MedDataTable
                getMedicalData={getMedicalData}
                sessionUser={sessionUser}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
