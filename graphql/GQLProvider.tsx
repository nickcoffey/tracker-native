import React from 'react'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'

const client = new ApolloClient({
  uri: 'https://api-lift-track.herokuapp.com/'
})

type GQLProviderProps = {
  children?: JSX.Element | JSX.Element[]
}

const GQLProvider = ({children}: GQLProviderProps) => <ApolloProvider client={client}>{children}</ApolloProvider>

export default GQLProvider
