"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { gql, useQuery } from "@apollo/client";
import { MedicalRecord } from "@prisma/client";
import { User } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

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

export default function MedDataTable({
  sessionUser,
}: {
  sessionUser: Readonly<User>;
}) {
  const { data, loading, error } = useQuery<{
    medicalRecords: MedicalRecord[];
  }>(GET_MEDICAL_RECORDS, {
    variables: {
      medicalRecord: {
        patientId: sessionUser.id,
      },
    },
  });
  // useQuery(GET_USER_WITH_ID, { ssr: fal  se });
  if (loading)
    return (
      <Table>
        <TableCaption>Your table is loading...</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead className="w-">
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-full" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-full" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-4 w-full" />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;
  return (
    // <Skeleton className="h-4 w-full" />
    <DataTable columns={columns} data={data.medicalRecords} />
  );
}
