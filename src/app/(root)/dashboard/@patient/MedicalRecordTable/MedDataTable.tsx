"use client";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OperationVariables, QueryResult } from "@apollo/client";
import { MedicalRecord } from "@prisma/client";
import { User } from "next-auth";
import { columns } from "./columns";

interface medDataTableProps {
  // addCourse: ({variables}:OperationVariables) => Promise<FetchResult<Course>>;
  sessionUser: User;
  getMedicalData: QueryResult<
    {
      medicalRecords: MedicalRecord[];
    },
    OperationVariables
  >;
}
export default function MedDataTable(props: medDataTableProps) {
  const { data, loading, error } = props.getMedicalData;
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
