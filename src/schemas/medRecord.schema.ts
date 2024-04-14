import { Prisma } from "@prisma/client";
import z from "zod";

export const MedRecordSchema = z.object({
  chestPain: z.coerce.number(),
  restingBloodPressure: z.coerce.number(),
  cholesterol: z.coerce.number().min(100).max(240),
  fastingBloodSugar: z.boolean(),
  restingElectrocardio: z.coerce.number(),
  maxHeartRate: z.coerce.number().min(50).max(220),
  // this will be optional
  // exerciseInduced: z.boolean(),
  // stDepressionInducedByExercise: z.number(),
  // slope: z.number(),
  // vesselsColoredByFluoroscopy: z.number(),
  // thalliumStressTest: z.number(),
  // hasHeartDisease: z.boolean(),
}) satisfies z.ZodType<Prisma.MedicalRecordCreateInput>;
