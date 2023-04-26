import gql from 'graphql-tag';

export const GET_OFFENCE = gql`
    query getOffence($id: ID!) {
        getOffence(id: $id) {
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
