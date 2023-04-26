import gql from 'graphql-tag';

export const CREATE_CHARGE = gql`
    mutation($name: String!) {
        createCharge(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_CHARGE = gql`
    mutation($id: ID!, $name: String!) {
        updateCharge(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_CHARGE = gql`
    mutation($id: ID!) {
        deleteCharge(id: $id)
    }
`;
