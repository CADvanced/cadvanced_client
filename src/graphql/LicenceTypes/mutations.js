import gql from 'graphql-tag';

export const CREATE_LICENCE_TYPE = gql`
    mutation($name: String!) {
        createLicenceType(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_LICENCE_TYPE = gql`
    mutation($id: ID!, $name: String!) {
        updateLicenceType(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_LICENCE_TYPE = gql`
    mutation($id: ID!) {
        deleteLicenceType(id: $id)
    }
`;
