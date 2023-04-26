import gql from 'graphql-tag';

export const CREATE_ETHNICITY = gql`
    mutation($name: String!) {
        createEthnicity(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_ETHNICITY = gql`
    mutation($id: ID!, $name: String!) {
        updateEthnicity(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_ETHNICITY = gql`
    mutation($id: ID!) {
        deleteEthnicity(id: $id)
    }
`;
