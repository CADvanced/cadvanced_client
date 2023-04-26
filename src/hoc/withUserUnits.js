import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';

import { ALL_USER_UNITS } from '../graphql/Users/queries';

const withUserUnits = WrappedComponent => {
    class WithUserUnits extends Component {
        updateUserUnits = () => {
            this.props.client.query({
                query: ALL_USER_UNITS,
                fetchPolicy: 'network-only'
            });
        };
        render() {
            const { ...other } = this.props;
            return (
                <Query query={ALL_USER_UNITS} fetchPolicy="network-only">
                    {({ _, data }) => {
                        if (data) {
                            return (
                                <WrappedComponent
                                    allUserUnits={data.allUserUnits}
                                    updateUserUnits={this.updateUserUnits}
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
    return withApollo(WithUserUnits);
};

export default withUserUnits;
