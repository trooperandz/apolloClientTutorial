import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import 'react-native-gesture-handler';

import RootNavigation from './navigations';
import Dogs from './Dogs';

const client = new ApolloClient({
  uri: 'https://71z1g.sse.codesandbox.io/',
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <RootNavigation />
  </ApolloProvider>
);

export default App;
