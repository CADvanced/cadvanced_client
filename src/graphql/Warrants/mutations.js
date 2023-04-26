import gql from 'graphql-tag';

export const CREATE_WARRANT = gql`
    mutation(
        $validFrom: String
        $validTo: String
        $details: String!
        $CitizenId: ID!
    ) {
        createWarrant(
            validFrom: $validFrom
            validTo: $validTo
            details: $details
            CitizenId: $CitizenId
        ) {
            id
            validFrom
            validTo
            details
        }
    }
`;

export const UPDATE_WARRANT = gql`
    mutation($id: ID!, $details: String!, $CitizenId: ID!) {
        updateWarrant(id: $id, details: $details, CitizenId: $CitizenId) {
            id
            validFrom
            validTo
            details
        }
    }
`;

export const DELETE_WARRANT = gql`
    mutation($id: ID!, $CitizenId: ID!) {
        deleteWarrant(id: $id, CitizenId: $CitizenId)
    }
`;
