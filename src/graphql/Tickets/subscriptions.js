import gql from 'graphql-tag';

export const TICKET_ADDED = gql`
    subscription {
        ticketAdded {
            id
            date
            time
            location
            points
            fine
            notes
            OfficerId
            officer {
                id
                firstName
                lastName
            }
            OffenceId
        }
    }
`;

export const TICKET_UPDATED = gql`
    subscription {
        ticketUpdated {
            id
            date
            time
            location
            points
            fine
            notes
            OfficerId
            officer {
                id
                firstName
                lastName
            }
        }
    }
`;

export const TICKET_DELETED = gql`
    subscription {
        ticketDeleted {
            id
            OffenceId
        }
    }
`;
