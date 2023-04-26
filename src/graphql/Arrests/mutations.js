import gql from 'graphql-tag';

export const UPDATE_ARREST = gql`
    mutation(
        $id: ID!
        $date: String
        $time: String
        $charges: [ChargeInput]
        $OfficerId: ID!
        $OffenceId: ID!
        $CitizenId: ID!
    ) {
        updateArrest(
            id: $id
            date: $date
            time: $time
            charges: $charges
            OfficerId: $OfficerId
            OffenceId: $OffenceId
            CitizenId: $CitizenId
        ) {
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

export const CREATE_ARREST = gql`
    mutation(
        $date: String
        $time: String
        $charges: [ChargeInput]
        $OfficerId: ID!
        $OffenceId: ID!
        $CitizenId: ID!
    ) {
        createArrest(
            date: $date
            time: $time
            charges: $charges
            OfficerId: $OfficerId
            OffenceId: $OffenceId
            CitizenId: $CitizenId
        ) {
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

export const DELETE_ARREST = gql`
    mutation($id: ID!, $CitizenId: ID!) {
        deleteArrest(id: $id, CitizenId: $CitizenId)
    }
`;
