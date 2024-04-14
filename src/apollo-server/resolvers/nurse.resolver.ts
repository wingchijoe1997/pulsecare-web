import { Resolver, Resolvers } from "@apollo/client";
import { ContextValue } from "../server";

// TODO: Remove this -> just for testing
const user: Resolver = async (
  _,
  { user },
  { dataSources: { prisma } }: ContextValue,
) => await prisma.user.findUnique({ where: { ...user } }).catch(() => null);

// TODO: Remove this -> just for testing
const users: Resolver = async (
  _,
  { user },
  { dataSources: { prisma } }: ContextValue,
) => await prisma.user.findMany({ where: user });

const patient: Resolver = async (
  _,
  { user },
  { sessionUser, dataSources: { prisma } }: ContextValue,
) => {
  if (sessionUser.role === "patient") return null;

  return await prisma.user
    .findUnique({ where: { role: "patient", ...user } })
    .catch(() => null);
};

const patients: Resolver = async (
  _,
  { user },
  { sessionUser, dataSources: { prisma } }: ContextValue,
) => {
  // if (sessionUser.role === "patient") return null;
  return await prisma.user.findMany({ where: { role: "patient", ...user } });
};

const nurse: Resolver = async (
  _,
  { user },
  { dataSources: { prisma } }: ContextValue,
) => {
  return await prisma.user
    .findUnique({ where: { role: "nurse", ...user } })
    .catch(() => null);
};

const nurses: Resolver = async (
  _,
  { user },
  { dataSources: { prisma } }: ContextValue,
) => {
  return await prisma.user.findMany({ where: { role: "nurse", ...user } });
};

const nursePatients: Resolver = async (
  _,
  { user },
  { dataSources: { prisma } }: ContextValue,
) => {
  const patients = await prisma.user.findMany({
    where: { role: "patient", nurseId: _.id, ...user },
  });
  return patients;
};

const patientNurse: Resolver = async (
  _,
  { user },
  { dataSources: { prisma } }: ContextValue,
) => {
  return await prisma.user.findUnique({
    where: { role: "nurse", id: _.nurseId, ...user },
  });
};

export const queryResolvers: Resolvers = {
  Query: {
    user,
    users,
    patient,
    patients,
    nurse,
    nurses,
  },
  User: {
    patients: nursePatients,
    nurse: patientNurse,
  },
};

export default queryResolvers;
