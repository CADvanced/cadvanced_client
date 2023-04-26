import gql from 'graphql-tag';

export const ARREST_ADDED = gql`
    subscription {
        arrestAdded {
            id
            date
            time
            OfficerId
            officer {
                id
                firstName
                lastName
            }
            charges {
                id
                name
            }
            OffenceId
        }
    }
`;

export const ARREST_UPDATED = gql`
    subscription {
        arrestUpdated {
            id
            date
            time
            OfficerId
            officer {
                id
                firstName
                lastName
            }
            charges {
                id
                name
            }
            OffenceId
        }
    }
`;

export const ARREST_DELETED = gql`
    subscription {
        arrestDeleted {
            id
            OffenceId
        }
    }
`;
