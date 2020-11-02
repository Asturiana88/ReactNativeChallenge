import 'react-native-gesture-handler';
import React from 'react';

import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { StatusBar } from 'react-native'



const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <ApolloProvider client={client}>
      <StatusBar />
      <Navigation colorScheme={colorScheme} />
    </ApolloProvider>
  )
}

export default App;