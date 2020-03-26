import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://192.168.1.112:4000/graphql', // TODO update with final URI
});

type GQLProviderProps = {
  children?: JSX.Element | JSX.Element[];
};

const GQLProvider = ({children}: GQLProviderProps) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default GQLProvider;
