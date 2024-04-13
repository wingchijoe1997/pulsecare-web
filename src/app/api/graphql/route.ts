import { ContextValue, apolloServer } from "@/apollo-server/server";
import { auth } from "@/auth";
import db from "@/lib/prisma-client";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { GraphQLError } from "graphql";

const handler = startServerAndCreateNextHandler(apolloServer, {
  context: async (): Promise<ContextValue> => {
    const session = await auth();

    if (!session) {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",

          http: { status: 401 },
        },
      });
    }
    const user = session.user;
    return {
      user,
      dataSources: {
        prisma: await db.$connect(),
      },
    };
  },
});

export { handler as GET, handler as POST };
