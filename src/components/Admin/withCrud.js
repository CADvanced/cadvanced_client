import React, { Component } from 'react';
import { Query, Mutation, withApollo } from 'react-apollo';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import compose from 'lodash.flowright';

const withCrud = WrappedComponent => {
    class WithCrud extends Component {
        componentDidMount() {
            if (
                this.props.hasOwnProperty('subscriptions') &&
                this.props.subscriptions.hasOwnProperty('ADDED')
            ) {
                this.subscribeToMoreStuff();
            }
        }

        // Following receipt of a subscription notifying us of a deletion
        // having been deleted, refetch all
        refetchAll() {
            this.props.client.query({
                query: this.props.queries.ALL,
                // We don't want to use the cache for this fetch,
                // doing so causes us to just use the cache after the
                // first deletion is done
                fetchPolicy: 'network-only'
            });
        }

        // Following receipt of a subscription, identify what happened
        // and act accordingly.
        componentDidUpdate(prevProps) {
            // Did a subscription trigger this update
            const deletedSubName = this.props.deletedSubName;
            if (this.props.hasOwnProperty(deletedSubName)) {
                if (
                    this.props[deletedSubName].hasOwnProperty(deletedSubName) &&
                    this.props[deletedSubName][deletedSubName] !==
                        prevProps[deletedSubName][deletedSubName]
                ) {
                    this.refetchAll();
                }
            }
        }

        render() {
            const { addedSubName, ...other } = this.props;
            return (
                <React.Fragment>
                    <Query query={this.props.queries.ALL}>
                        {({ subscribeToMore, data, loading, error }) => {
                            this.subscribeToMoreStuff = () => {
                                subscribeToMore({
                                    document: this.props.subscriptions.ADDED,
                                    updateQuery: (
                                        prev,
                                        { subscriptionData }
                                    ) => {
                                        if (!subscriptionData.data) return prev;
                                        const newThing =
                                            subscriptionData.data[addedSubName];
                                        return Object.assign({}, prev, {
                                            [this.props.allDataName]: [
                                                ...prev[this.props.allDataName],
                                                newThing
                                            ]
                                        });
                                    }
                                });
                            };
                            if (loading) {
                                return <LoadingSpinner />;
                            } else if (error) {
                                return <p>Error</p>;
                            } else if (data) {
                                return (
                                    <Mutation
                                        mutation={this.props.mutations.DELETE}
                                    >
                                        {(deleteItem, { loading, error }) => (
                                            <WrappedComponent
                                                apiLoading={loading}
                                                apiError={error}
                                                label={this.props.label}
                                                deleteItem={deleteItem}
                                                mutations={this.props.mutations}
                                                allData={
                                                    data[this.props.allDataName]
                                                }
                                                {...other}
                                            />
                                        )}
                                    </Mutation>
                                );
                            } else {
                                return <WrappedComponent {...other} />;
                            }
                        }}
                    </Query>
                </React.Fragment>
            );
        }
    }
    return compose(withApollo)(WithCrud);
};

export default withCrud;
