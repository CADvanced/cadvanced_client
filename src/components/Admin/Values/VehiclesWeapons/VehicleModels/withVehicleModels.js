import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_VEHICLE_MODELS } from '../../../../../graphql/VehicleModels/queries';
import {
    CREATE_VEHICLE_MODEL,
    DELETE_VEHICLE_MODEL,
    UPDATE_VEHICLE_MODEL
} from '../../../../../graphql/VehicleModels/mutations';
import {
    VEHICLE_MODEL_ADDED,
    VEHICLE_MODEL_DELETED,
    VEHICLE_MODEL_UPDATED
} from '../../../../../graphql/VehicleModels/subscriptions';

const withVehicleModels = WrappedComponent => {
    const queries = {
        ALL: ALL_VEHICLE_MODELS
    };
    const mutations = {
        CREATE: CREATE_VEHICLE_MODEL,
        DELETE: DELETE_VEHICLE_MODEL,
        UPDATE: UPDATE_VEHICLE_MODEL
    };
    const subscriptions = {
        ADDED: VEHICLE_MODEL_ADDED,
        DELETED: VEHICLE_MODEL_DELETED,
        UPDATED: VEHICLE_MODEL_UPDATED
    };
    class WithVehicleModels extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="VehicleModel"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="vehicleModelAdded"
                        deletedSubName="vehicleModelDeleted"
                        allDataName="allVehicleModels"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(VEHICLE_MODEL_DELETED, { name: 'vehicleModelDeleted' }),
        graphql(VEHICLE_MODEL_UPDATED, { name: 'vehicleModelUpdated' })
    )(WithVehicleModels);
};

export default withVehicleModels;
