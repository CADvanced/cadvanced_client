import gql from 'graphql-tag';

export const CREATE_GENDER = gql`
    mutation($name: String!) {
        createGender(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_GENDER = gql`
    mutation($id: ID!, $name: String!) {
        updateGender(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_GENDER = gql`
    mutation($id: ID!) {
        deleteGender(id: $id)
    }
`;
