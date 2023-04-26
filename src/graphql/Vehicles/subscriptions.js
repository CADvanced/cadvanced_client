import gql from 'graphql-tag';

export const VEHICLE_ADDED = gql`
    subscription {
        vehicleAdded {
            id
            colour
            licencePlate
            vehicleModel {
                id
                name
            }
            insuranceStatus {
                id
                name
            }
        }
    }
`;

export const VEHICLE_UPDATED = gql`
    subscription {
        vehicleUpdated {
            id
            colour
            licencePlate
            vehicleModel {
                id
                name
            }
            insuranceStatus {
                id
                name
            }
        }
    }
`;

export const VEHICLE_DELETED = gql`
    subscription {
        vehicleDeleted
    }
`;

export const MARKER_ATTACHED_TO_VEHICLE = gql`
    subscription {
        markerAttachedToVehicle {
            id
            name
            type
        }
    }
`;

export const MARKER_DETACHED_FROM_VEHICLE = gql`
    subscription {
        markerDetachedFromVehicle
    }
`;
