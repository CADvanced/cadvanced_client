import gql from 'graphql-tag';

export const ETHNICITY_DELETED = gql`
    subscription {
        ethnicityDeleted
    }
`;

export const ETHNICITY_ADDED = gql`
    subscription {
        ethnicityAdded {
            id
            name
        }
    }
`;

export const ETHNICITY_UPDATED = gql`
    subscription {
        ethnicityUpdated {
            id
            name
        }
    }
`;
