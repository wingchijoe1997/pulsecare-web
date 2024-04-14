import db from "@/lib/prisma-client";
import { ApolloServer } from "@apollo/server";
import gql from "graphql-tag";
import { User } from "next-auth";
import queryResolvers from "./resolvers/nurse.resolver";
import typeDefs from "./typedefs/typedefs";
import { dateScalarResolver } from "./resolvers/DateScalar";
import mutationResolvers from "./resolvers/medicalRecord.resolver";

export interface ContextValue {
  sessionUser: User;
  dataSources: {
    prisma: typeof db;
  };
}
//const typeDefs = gql`
//type Query {
//hello: String
//}
//`;

export const apolloServer = new ApolloServer<ContextValue>({
  resolvers: [dateScalarResolver, queryResolvers, mutationResolvers],
  typeDefs,
});
