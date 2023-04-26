import gql from 'graphql-tag';

export const CREATE_DEPARTMENT = gql`
    mutation($name: String!) {
        createDepartment(name: $name) {
            id
            name
            colour
            logo
            readonly
            bolo
        }
    }
`;

export const UPDATE_DEPARTMENT = gql`
    mutation($id: ID!, $name: String!, $colour: String, $logo: String, $bolo: Boolean) {
        updateDepartment(id: $id, name: $name, colour: $colour, logo: $logo, bolo: $bolo) {
            id
            name
            colour
            logo
            readonly
            bolo
        }
    }
`;

export const DELETE_DEPARTMENT = gql`
    mutation($id: ID!) {
        deleteDepartment(id: $id)
    }
`;

export const CREATE_DEPARTMENT_ANNOUNCEMENT = gql`
    mutation($text: String!, $DepartmentId: ID!) {
        createDepartmentAnnouncement(text: $text, DepartmentId: $DepartmentId) {
            id
            text
            DepartmentId
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_DEPARTMENT_ANNOUNCEMENT = gql`
    mutation($id: ID!, $text: String!, $DepartmentId: ID!) {
        updateDepartmentAnnouncement(id: $id, text: $text, DepartmentId: $DepartmentId) {
            id
            text
            DepartmentId
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_DEPARTMENT_ANNOUNCEMENT = gql`
    mutation($id: ID!) {
        deleteDepartmentAnnouncement(id: $id)
    }
`;
