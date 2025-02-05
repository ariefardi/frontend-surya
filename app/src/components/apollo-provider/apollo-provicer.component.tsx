"use client";

import { ApolloProvider } from "@apollo/client";
// import client from "@/lib/apolloClient";
import client from "@/app/src/lib/apolloClient";

export default function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
