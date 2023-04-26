import gql from 'graphql-tag';

export const UPDATE_MAP = gql`
    mutation($id: String!, $name: String!, $active: Boolean!) {
        updateMap(id: $id, name: $name, active: $active) {
            id
            name
            processed
            active
            readonly
        }
    }
`;

export const DELETE_MAP = gql`
    mutation($id: ID!) {
        deleteMap(id: $id)
    }
`;
