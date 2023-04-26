import gql from 'graphql-tag';

export const CREATE_LOCATION = gql`
    mutation($name: String!) {
        createLocation(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_LOCATION = gql`
    mutation($id: ID!, $name: String!) {
        updateLocation(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_LOCATION = gql`
    mutation($id: ID!) {
        deleteLocation(id: $id)
    }
`;
