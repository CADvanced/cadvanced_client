import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';
import {
    InMemoryCache,
    IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory';
import { split, ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';
import jwtDecode from 'jwt-decode';
import SecureLS from 'secure-ls';

import './index.css';
import App from './App';
import ContextProvider from './hoc/ContextProvider';
import introspectionQueryResultData from './fragmentTypes.json';

let refreshing = false;

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

const cache = new InMemoryCache({ fragmentMatcher });

const ls = new SecureLS({
    encodingType: 'aes',
    encryptionSecret: '8bqAoi7rhXpP!Y$$BRAaE56lC093W1#L',
    isCompression: false
});

const apiUrl = process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : `${window.location.protocol}//${window.location.hostname}`;
const wsUrl = process.env.REACT_APP_WS_URL
    ? process.env.REACT_APP_WS_URL
    : `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${
          window.location.hostname
      }`;

const httpLink = new HttpLink({
    uri: `${apiUrl}/api`,
    credentials: 'same-origin'
});

const getCurrentToken = () => {
    const session = ls.get('session');
    const sessionObj = session ? JSON.parse(session) : {};
    return sessionObj.hasOwnProperty('token') ? sessionObj.token : null;
};

const wsLink = new WebSocketLink({
    uri: `${wsUrl}/subscriptions`,
    options: {
        reconnect: true,
        connectionParams: {
            token: getCurrentToken()
        }
    }
});

const refreshToken = () => {
    refreshing = true;
    const token = getCurrentToken();
    if (token) {
        // Make a note in local storage of where we are
        ls.set('cameFrom', window.location.pathname);
        // Redirect to get a new token
        const { uuid } = jwtDecode(token);
        window.location.replace('/uuid/' + uuid);
    }
};

// A link to add the a token to the authorization header
// if appropriate
const authLink = setContext((_, { headers }) => {
    const session = ls.get('session');
    const sessionObj = session ? JSON.parse(session) : {};
    return sessionObj.hasOwnProperty('token')
        ? {
              headers: {
                  ...headers,
                  authorization: 'Bearer ' + sessionObj.token
              }
          }
        : headers;
});

// A link to handle errors we receive back in a semi graceful manner
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            /*
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
            */
            if (message.match(/expired/) && !refreshing) {
                refreshToken();
            }
        });
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});

// Use the appropriate link depending on whether this is a subscription or not
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    // Compose our non-ws links together to return a single link
    ApolloLink.from([authLink, errorLink, httpLink])
);

const client = new ApolloClient({
    link,
    cache
});

const app = (
    <ApolloProvider client={client}>
        <ContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ContextProvider>
    </ApolloProvider>
);

ReactDOM.render(app, document.getElementById('root'));
