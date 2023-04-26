import gql from 'graphql-tag';

export const CREATE_OFFENCE = gql`
    mutation(
        $date: String
        $time: String
        $location: String
        $charges: [ChargeInput]
        $CitizenId: ID!
    ) {
        createOffence(
            date: $date
            time: $time
            location: $location
            charges: $charges
            CitizenId: $CitizenId
        ) {
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

export const UPDATE_OFFENCE = gql`
    mutation(
        $id: ID!
        $date: String
        $time: String
        $location: String
        $charges: [ChargeInput]
        $CitizenId: ID!
    ) {
        updateOffence(
            id: $id
            date: $date
            time: $time
            location: $location
            charges: $charges
            CitizenId: $CitizenId
        ) {
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

export const DELETE_OFFENCE = gql`
    mutation($id: ID!, $CitizenId: ID!) {
        deleteOffence(id: $id, CitizenId: $CitizenId)
    }
`;
