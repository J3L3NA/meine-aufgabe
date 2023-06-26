import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// initiating apollo client; setting headers for query
const client = new ApolloClient({
  uri: 'https://staging.api.wissenwirkt.com/api/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("X-Auth-Token", "X-Auth-Account-Id") }
});


// wrapping app in apollo provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
