import gql from 'graphql-tag';

export const LOCATION_DELETED = gql`
    subscription {
        locationDeleted
    }
`;

export const LOCATION_ADDED = gql`
    subscription {
        locationAdded {
            id
            name
            code
            readonly
        }
    }
`;

export const LOCATION_UPDATED = gql`
    subscription {
        locationUpdated {
            id
            name
            code
            readonly
        }
    }
`;
