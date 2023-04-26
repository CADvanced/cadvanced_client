import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_VEHICLE_MARKERS } from '../../../../../graphql/Markers/queries';
import {
    CREATE_VEHICLE_MARKER,
    DELETE_VEHICLE_MARKER,
    UPDATE_VEHICLE_MARKER
} from '../../../../../graphql/Markers/mutations';
import {
    VEHICLE_MARKER_ADDED,
    VEHICLE_MARKER_DELETED,
    VEHICLE_MARKER_UPDATED
} from '../../../../../graphql/Markers/subscriptions';

const withVehicleMarkers = WrappedComponent => {
    const queries = {
        ALL: ALL_VEHICLE_MARKERS
    };
    const mutations = {
        CREATE: CREATE_VEHICLE_MARKER,
        DELETE: DELETE_VEHICLE_MARKER,
        UPDATE: UPDATE_VEHICLE_MARKER
    };
    const subscriptions = {
        ADDED: VEHICLE_MARKER_ADDED,
        DELETED: VEHICLE_MARKER_DELETED,
        UPDATED: VEHICLE_MARKER_UPDATED
    };
    class WithVehicleMarkers extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Vehicle markers"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="vehicleMarkerAdded"
                        deletedSubName="vehicleMarkerDeleted"
                        allDataName="allVehicleMarkers"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(VEHICLE_MARKER_DELETED, { name: 'vehicleMarkerDeleted' }),
        graphql(VEHICLE_MARKER_UPDATED, { name: 'vehicleMarkerUpdated' })
    )(WithVehicleMarkers);
};

export default withVehicleMarkers;
