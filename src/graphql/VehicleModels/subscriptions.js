import gql from 'graphql-tag';

export const VEHICLE_MODEL_DELETED = gql`
    subscription {
        vehicleModelDeleted
    }
`;

export const VEHICLE_MODEL_ADDED = gql`
    subscription {
        vehicleModelAdded {
            id
            name
        }
    }
`;

export const VEHICLE_MODEL_UPDATED = gql`
    subscription {
        vehicleModelUpdated {
            id
            name
        }
    }
`;
