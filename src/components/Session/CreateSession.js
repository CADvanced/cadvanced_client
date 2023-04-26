import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { Redirect } from 'react-router';
import SecureLS from 'secure-ls';

import jwtDecode from 'jwt-decode';

import withContext from '../../hoc/ContextConsumer';
import { GET_USER } from '../../graphql/Users/queries';

class CreateSession extends Component {
    state = {
        authenticated: false
    };

    componentDidMount() {
        const { authenticateUser, client, context } = this.props;
        // We're about to create a new session, so remove the
        // Apollo cache
        this.props.client.resetStore();
        // Send the mutation that regenerates the user's uuid
        // this will return the token and the new uuid,
        // which will then be cached. We then grab the user's
        // object, which will also be cached
        authenticateUser().then(response => {
            const token = response.data.authenticateUser.token;
            const { id } = jwtDecode(token);
            const updatedSession = {
                ...context.userSession,
                token
            };
            context.setSession(updatedSession);
            return client
                .query({
                    query: GET_USER,
                    variables: { id }
                })
                .then(user => {
                    const session = {
                        ...user.data.getUser,
                        token: token
                    };
                    delete session.__typename;
                    context.setSession(session);
                    return this.setState({
                        authenticated: true
                    });
                });
        });
    }
    render() {
        // See if we came from anywhere, and go there if necessary
        const ls = new SecureLS({
            encodingType: 'aes',
            encryptionSecret: '8bqAoi7rhXpP!Y$$BRAaE56lC093W1#L',
            isCompression: false
        });
        const goTo = ls.get('cameFrom');
        const url = goTo ? goTo : '/';
        return !this.state.authenticated ? null : <Redirect to={url} />;
    }
}

export default withContext(withApollo(CreateSession));
