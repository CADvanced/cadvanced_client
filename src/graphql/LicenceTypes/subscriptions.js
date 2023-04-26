import gql from 'graphql-tag';

export const LICENCE_TYPE_DELETED = gql`
    subscription {
        licenceTypeDeleted
    }
`;

export const LICENCE_TYPE_ADDED = gql`
    subscription {
        licenceTypeAdded {
            id
            name
        }
    }
`;

export const LICENCE_TYPE_UPDATED = gql`
    subscription {
        licenceTypeUpdated {
            id
            name
        }
    }
`;
