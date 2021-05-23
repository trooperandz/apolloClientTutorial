import React from 'react';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';

import Dogs from './Dogs';

const client = new ApolloClient({
  uri: 'https://71z1g.sse.codesandbox.io/',
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Dogs />
  </ApolloProvider>
);

export default App;
