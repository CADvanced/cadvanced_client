import React, { Component } from 'react';
import { Query } from 'react-apollo';

import { ALL_CALLS } from '../graphql/Calls/queries';

const withCalls = WrappedComponent => {
    class WithCalls extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <Query query={ALL_CALLS}>
                    {({ _, data }) => {
                        if (data) {
                            return (
                                <WrappedComponent
                                    allCalls={data.allCalls}
                                    {...other}
                                />
                            );
                        } else {
                            return <WrappedComponent {...other} />;
                        }
                    }}
                </Query>
            );
        }
    }
    return WithCalls;
};

export default withCalls;
