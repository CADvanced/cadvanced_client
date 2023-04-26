import gql from 'graphql-tag';

export const CREATE_INSURANCE_STATUS = gql`
    mutation($name: String!) {
        createInsuranceStatus(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_INSURANCE_STATUS = gql`
    mutation($id: ID!, $name: String!) {
        updateInsuranceStatus(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_INSURANCE_STATUS = gql`
    mutation($id: ID!) {
        deleteInsuranceStatus(id: $id)
    }
`;
