// Create a strongly typed `PostSelect` object with `satisfies`

import db from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";

const patientWhere = {
  role: "patient",
} satisfies Prisma.UserWhereInput;

const patientSelect = {
  id: true,
  email: true,
  name: true,
} satisfies Prisma.UserSelect;
// Infer the resulting payload type

// The result type is equivalent to `MyPostPayload | null`

const patient = await db.user.findFirst({
  where: patientWhere,
  select: patientSelect,
});

patient.ro;
