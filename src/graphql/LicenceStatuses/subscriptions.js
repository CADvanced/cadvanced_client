import gql from 'graphql-tag';

export const LICENCE_STATUS_DELETED = gql`
    subscription {
        licenceStatusDeleted
    }
`;

export const LICENCE_STATUS_ADDED = gql`
    subscription {
        licenceStatusAdded {
            id
            name
        }
    }
`;

export const LICENCE_STATUS_UPDATED = gql`
    subscription {
        licenceStatusUpdated {
            id
            name
        }
    }
`;
