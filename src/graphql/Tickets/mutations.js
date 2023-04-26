import gql from 'graphql-tag';

export const UPDATE_TICKET = gql`
    mutation(
        $id: ID!
        $date: String
        $time: String
        $location: String
        $points: String
        $fine: String
        $notes: String
        $CitizenId: ID!
        $OfficerId: ID!
        $OffenceId: ID!
    ) {
        updateTicket(
            id: $id
            date: $date
            time: $time
            location: $location
            points: $points
            fine: $fine
            notes: $notes
            CitizenId: $CitizenId
            OfficerId: $OfficerId
            OffenceId: $OffenceId
        ) {
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

export const CREATE_TICKET = gql`
    mutation(
        $date: String
        $time: String
        $location: String
        $points: String
        $fine: String
        $notes: String
        $CitizenId: ID!
        $OfficerId: ID!
        $OffenceId: ID!
    ) {
        createTicket(
            date: $date
            time: $time
            location: $location
            points: $points
            fine: $fine
            notes: $notes
            CitizenId: $CitizenId
            OfficerId: $OfficerId
            OffenceId: $OffenceId
        ) {
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

export const DELETE_TICKET = gql`
    mutation($id: ID!, $CitizenId: ID!) {
        deleteTicket(id: $id, CitizenId: $CitizenId)
    }
`;
