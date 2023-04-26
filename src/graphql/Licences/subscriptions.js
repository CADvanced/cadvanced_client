import gql from 'graphql-tag';

export const LICENCE_ADDED = gql`
    subscription {
        licenceAdded {
            id
            licenceType {
                id
                name
            }
            licenceStatus {
                id
                name
            }
        }
    }
`;

export const LICENCE_UPDATED = gql`
    subscription {
        licenceUpdated {
            id
            licenceType {
                id
                name
            }
            licenceStatus {
                id
                name
            }
        }
    }
`;

export const LICENCE_DELETED = gql`
    subscription {
        licenceDeleted
    }
`;
