import gql from 'graphql-tag';

export const OFFENCE_ADDED = gql`
    subscription {
        offenceAdded {
            id
            date
            time
            location
            ArrestId
            arrest {
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
            }
            charges {
                id
                name
            }
            TicketId
            ticket {
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
    }
`;

export const OFFENCE_UPDATED = gql`
    subscription {
        offenceUpdated {
            id
            date
            time
            location
            ArrestId
            arrest {
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
            }
            charges {
                id
                name
            }
            TicketId
            ticket {
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
    }
`;

export const OFFENCE_DELETED = gql`
    subscription {
        offenceDeleted
    }
`;
