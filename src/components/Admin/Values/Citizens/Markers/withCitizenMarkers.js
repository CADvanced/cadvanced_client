import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_CITIZEN_MARKERS } from '../../../../../graphql/Markers/queries';
import {
    CREATE_CITIZEN_MARKER,
    DELETE_CITIZEN_MARKER,
    UPDATE_CITIZEN_MARKER
} from '../../../../../graphql/Markers/mutations';
import {
    CITIZEN_MARKER_ADDED,
    CITIZEN_MARKER_DELETED,
    CITIZEN_MARKER_UPDATED
} from '../../../../../graphql/Markers/subscriptions';

const withCitizenMarkers = WrappedComponent => {
    const queries = {
        ALL: ALL_CITIZEN_MARKERS
    };
    const mutations = {
        CREATE: CREATE_CITIZEN_MARKER,
        DELETE: DELETE_CITIZEN_MARKER,
        UPDATE: UPDATE_CITIZEN_MARKER
    };
    const subscriptions = {
        ADDED: CITIZEN_MARKER_ADDED,
        DELETED: CITIZEN_MARKER_DELETED,
        UPDATED: CITIZEN_MARKER_UPDATED
    };
    class WithCitizenMarkers extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Citizen markers"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="citizenMarkerAdded"
                        deletedSubName="citizenMarkerDeleted"
                        allDataName="allCitizenMarkers"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(CITIZEN_MARKER_DELETED, { name: 'citizenMarkerDeleted' }),
        graphql(CITIZEN_MARKER_UPDATED, { name: 'citizenMarkerUpdated' })
    )(WithCitizenMarkers);
};

export default withCitizenMarkers;
