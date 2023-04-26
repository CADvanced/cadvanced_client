import gql from 'graphql-tag';

export const GENDER_DELETED = gql`
    subscription {
        genderDeleted
    }
`;

export const GENDER_ADDED = gql`
    subscription {
        genderAdded {
            id
            name
        }
    }
`;

export const GENDER_UPDATED = gql`
    subscription {
        genderUpdated {
            id
            name
        }
    }
`;
