import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_LOCATIONS } from '../../../../../graphql/Locations/queries';
import {
    CREATE_LOCATION,
    UPDATE_LOCATION,
    DELETE_LOCATION
} from '../../../../../graphql/Locations/mutations';
import {
    LOCATION_ADDED,
    LOCATION_DELETED,
    LOCATION_UPDATED
} from '../../../../../graphql/Locations/subscriptions';

const withLocations = WrappedComponent => {
    const queries = {
        ALL: ALL_LOCATIONS
    };
    const mutations = {
        CREATE: CREATE_LOCATION,
        UPDATE: UPDATE_LOCATION,
        DELETE: DELETE_LOCATION
    };
    const subscriptions = {
        ADDED: LOCATION_ADDED,
        UPDATED: LOCATION_UPDATED,
        DELETED: LOCATION_DELETED
    };
    class WithLocations extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Location"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        deletedSubName="locationDeleted"
                        addedSubName="locationAdded"
                        allDataName="allLocations"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(LOCATION_DELETED, { name: 'locationDeleted' }),
        graphql(LOCATION_UPDATED, { name: 'locationUpdated' })
    )(WithLocations);
};

export default withLocations;
