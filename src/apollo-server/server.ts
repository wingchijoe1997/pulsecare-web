import db from "@/lib/prisma-client";
import { ApolloServer } from "@apollo/server";
import { User } from "next-auth";
import { dateScalarResolver } from "./resolvers/DateScalar";
import mutationResolvers from "./resolvers/medicalRecord.resolver";
import queryResolvers from "./resolvers/nurse.resolver";
import typeDefs from "./typedefs/typedefs";

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
