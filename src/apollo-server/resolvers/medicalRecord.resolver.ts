import { Resolver, Resolvers } from "@apollo/client";
import { ContextValue } from "../server";

const patientMedicalRecords: Resolver = async (
  _,
  { id },
  { dataSources: { prisma } }: ContextValue,
) => {
  const medicalRecords = await prisma.medicalRecord.findMany({
    where: {
      patientId: _.id,
    },
  });
  return medicalRecords;
};
const createMedicalRecord: Resolver = async (
  _,
  { medicalRecord },
  { sessionUser, dataSources: { prisma } }: ContextValue,
) => {
  const newMedicalRecord = await prisma.medicalRecord.create({
    data: { patientId: sessionUser.id, ...medicalRecord },
  });
  return newMedicalRecord;
};

export const mutationResolvers: Resolvers = {
  User: {
    medicalRecords: patientMedicalRecords,
  },

  Mutation: {
    createMedicalRecord,
  },
};

export default mutationResolvers;
