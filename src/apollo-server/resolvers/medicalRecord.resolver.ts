import { Resolver, Resolvers } from "@apollo/client";
import { ContextValue } from "../server";

const medicalRecord: Resolver = async (
  _,
  { medicalRecord },
  { dataSources: { prisma } }: ContextValue,
) => {
  return await prisma.medicalRecord.findUnique({
    where: { ...medicalRecord },
  });
};

const medicalRecords: Resolver = async (
  _,
  { medicalRecord },
  { dataSources: { prisma } }: ContextValue,
) => {
  return await prisma.medicalRecord.findMany({ where: medicalRecord });
};

const patientMedicalRecords: Resolver = async (
  _,
  __,
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
  Query: {
    medicalRecord,
    medicalRecords,
  },
  User: {
    medicalRecords: patientMedicalRecords,
  },

  Mutation: {
    createMedicalRecord,
  },
};

export default mutationResolvers;
