import gql from 'graphql-tag';

export const UPDATE_OFFICER = gql`
    mutation($id: ID!, $firstName: String, $lastName: String) {
        updateOfficer(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

export const CREATE_OFFICER = gql`
    mutation($firstName: String, $lastName: String, $UserId: ID!, $DepartmentId: ID!) {
        createOfficer(
            firstName: $firstName
            lastName: $lastName
            UserId: $UserId
            DepartmentId: $DepartmentId
        ) {
            id
            firstName
            lastName
            DepartmentId
        }
    }
`;

export const DELETE_OFFICER = gql`
    mutation($id: ID!) {
        deleteOfficer(id: $id)
    }
`;
