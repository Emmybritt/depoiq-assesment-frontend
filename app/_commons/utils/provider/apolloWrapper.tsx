"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/app/_modules/infrastructure/apollo/apollo-client";

const ApolloClientProvider: React.FC<{
  children: React.ReactNode;
  initialApolloState: any;
}> = (props) => {
  const apolloClient = useApollo(JSON.parse(props.initialApolloState));

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
};

export default ApolloClientProvider;
