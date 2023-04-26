import gql from 'graphql-tag';

export const CREATE_LICENCE_STATUS = gql`
    mutation($name: String!) {
        createLicenceStatus(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_LICENCE_STATUS = gql`
    mutation($id: ID!, $name: String!) {
        updateLicenceStatus(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_LICENCE_STATUS = gql`
    mutation($id: ID!) {
        deleteLicenceStatus(id: $id)
    }
`;
