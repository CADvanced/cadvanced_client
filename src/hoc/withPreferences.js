import React, { Component } from 'react';
import { Query, withApollo } from 'react-apollo';

import { ALL_PREFERENCES } from '../graphql/Preferences/queries';

const withPrefrences = WrappedComponent => {
    class WithPreferences extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <Query query={ALL_PREFERENCES} fetchPolicy="network-only">
                    {({ _, data }) => {
                        if (data) {
                            return (
                                <WrappedComponent
                                    allPreferences={data.allPreferences}
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
    return withApollo(WithPreferences);
};

export default withPrefrences;
