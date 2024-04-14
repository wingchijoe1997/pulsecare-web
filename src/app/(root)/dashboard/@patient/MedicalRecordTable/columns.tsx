import { MedicalRecord } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

// chestPain: z.coerce.number(),
// restingBloodPressure: z.coerce.number(),
// cholesterol: z.coerce.number().min(100).max(240),
// fastingBloodSugar: z.boolean(),
// restingElectrocardio: z.coerce.number(),
// maxHeartRate: z.coerce.number().min(50).max(220),
export const columns: ColumnDef<MedicalRecord>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
    cell: ({ row }) => {
      return `${row.original.id.substring(0, 3)}${row.original.id.slice(-2)}`;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Registered",
    cell: ({ row }) => {
      return new Date(row.original.createdAt).toLocaleDateString();
    },
  },
  {
    accessorKey: "chestPain",
    header: "Chest Pain",
    cell: ({ row }) => {
      const chestPain = row.original.chestPain;
      switch (chestPain) {
        case 1:
          return "Typical Angina";
        case 2:
          return "Atypical Angina";
        case 3:
          return "Non-Anginal Pain";
        case 4:
          return "Asymptomatic";
        default:
          return "Unknown";
      }
    },
  },
  {
    accessorKey: "restingBloodPressure",
    header: "Resting Blood Pressure",
  },
  {
    accessorKey: "cholesterol",
    header: "Cholesterol",
  },
  {
    accessorKey: "fastingBloodSugar",
    header: "Fasting Blood Sugar",
  },
  {
    accessorKey: "restingElectrocardio",
    header: "Resting Electrocardio",
  },
  {
    accessorKey: "maxHeartRate",
    header: "Max Heart Rate",
  },
];
