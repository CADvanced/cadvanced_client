import gql from 'graphql-tag';

export const OFFICER_ADDED = gql`
    subscription {
        officerAdded {
            id
            firstName
            lastName
            active
            DepartmentId
        }
    }
`;

export const OFFICER_UPDATED = gql`
    subscription {
        officerUpdated {
            id
            firstName
            lastName
            active
            DepartmentId
        }
    }
`;

export const OFFICER_DELETED = gql`
    subscription {
        officerDeleted
    }
`;
