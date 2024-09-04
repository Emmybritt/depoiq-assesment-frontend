"use client";

import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/app/_modules/infrastructure/apollo/apollo-client";

const ApolloWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
