import React from 'react';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';

import ExchangeRate from './ExchangeRate';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <ExchangeRate />
  </ApolloProvider>
);

export default App;
