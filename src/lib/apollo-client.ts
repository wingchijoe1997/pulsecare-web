import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { headers } from 'next/headers'

// TODO: fix this any type
let client: ApolloClient<any> | null = null;

export const getClient = (): ApolloClient<any> => {
  // retrieve the base url

  // const headersInstance = headers()
  const httpLink = new HttpLink({
    uri: "http://localhost:3000/api/graphql",
    headers: {
      cookie: "",
    },
  });

  /* Create a new client if there's no existing one
     or if we are running on the server. */
  if (!client || typeof window === "undefined") {
    client = new ApolloClient<any>({
      link: httpLink,
      cache: new InMemoryCache(),
      credentials: "include",
    });
  }

  return client;
};
