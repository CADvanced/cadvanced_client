import gql from 'graphql-tag';

export const CITIZEN_MARKER_DELETED = gql`
    subscription {
        citizenMarkerDeleted
    }
`;

export const VEHICLE_MARKER_DELETED = gql`
    subscription {
        vehicleMarkerDeleted
    }
`;

export const CITIZEN_MARKER_ADDED = gql`
    subscription citizenMarkerAdded {
        citizenMarkerAdded {
            id
            name
        }
    }
`;

export const VEHICLE_MARKER_ADDED = gql`
    subscription vehicleMarkerAdded {
        vehicleMarkerAdded {
            id
            name
        }
    }
`;

export const CITIZEN_MARKER_UPDATED = gql`
    subscription {
        citizenMarkerUpdated {
            id
            name
        }
    }
`;

export const VEHICLE_MARKER_UPDATED = gql`
    subscription {
        vehicleMarkerUpdated {
            id
            name
        }
    }
`;
