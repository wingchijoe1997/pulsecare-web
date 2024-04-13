import db from "@/lib/prisma-client";
import { ApolloServer } from "@apollo/server";
import gql from "graphql-tag";
import { User } from "next-auth";

export interface ContextValue {
  user: User;
  dataSources: {
    prisma: Awaited<ReturnType<typeof db.$connect>>;
  };
}
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};
export const apolloServer = new ApolloServer<ContextValue>({
  resolvers,
  typeDefs,
});
