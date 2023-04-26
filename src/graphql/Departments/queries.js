import gql from 'graphql-tag';

export const ALL_DEPARTMENTS = gql`
    {
        allDepartments {
            id
            name
            colour
            logo
            readonly
            bolo
            announcements {
                id
            }
            documents {
                id
            }
        }
    }        
`;

export const ALL_DEPARTMENT_ANNOUNCEMENTS = gql`
    query allDepartmentAnnouncements($id: ID) {
        allDepartmentAnnouncements(id: $id) {
            id
            text
            DepartmentId
            createdAt
            updatedAt
        }
    }
`;