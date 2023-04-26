import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { Mutation } from 'react-apollo';

import { AUTHENTICATE_USER } from '../../graphql/Users/mutations';
import CreateSession from './CreateSession';

class Session extends Component {
    state = {
        create: false
    };
    componentDidMount() {
        if (this.props.match.params.hasOwnProperty('uuid')) {
            this.setState({
                create: true
            });
        }
    }
    render() {
        if (!this.state.create) {
            return null;
        }
        // It may seem strange that we create the mutation here then
        // send it in a separate component, I effectively wanted to fire
        // the mutation when the component mounted, but that seemed harder
        // than I anticipated, hence this. Suggested here:
        // https://github.com/apollographql/react-apollo/issues/1939#issuecomment-404616804
        return (
            <Mutation
                mutation={AUTHENTICATE_USER}
                variables={{ uuid: this.props.match.params.uuid }}
            >
                {(authenticateUser, { loading, error, data }) => {
                    // If we get an error back from authenticateUser
                    // it's likely no user has the UUID, so a possibly replay
                    if (error) {
                        return <Redirect to="/noauth" />;
                    }
                    return (
                        <CreateSession authenticateUser={authenticateUser} />
                    );
                }}
            </Mutation>
        );
    }
}

export default Session;
