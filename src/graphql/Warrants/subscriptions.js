import gql from 'graphql-tag';

export const WARRANT_DELETED = gql`
    subscription {
        warrantDeleted
    }
`;

export const WARRANT_ADDED = gql`
    subscription {
        warrantAdded {
            id
            validFrom
            validTo
            details
        }
    }
`;

export const WARRANT_UPDATED = gql`
    subscription {
        warrantUpdated {
            id
            validFrom
            validTo
            details
        }
    }
`;
