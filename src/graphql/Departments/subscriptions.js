import gql from 'graphql-tag';

export const DEPARTMENT_DELETED = gql`
    subscription {
        departmentDeleted
    }
`;

export const DEPARTMENT_ADDED = gql`
    subscription {
        departmentAdded {
            id
            name
            colour
            logo
            readonly
            bolo
        }
    }
`;

export const DEPARTMENT_UPDATED = gql`
    subscription {
        departmentUpdated {
            id
            name
            colour
            logo
            readonly
            bolo
        }
    }
`;

export const DEPARTMENT_ANNOUNCEMENT_ADDED = gql`
    subscription {
        departmentAnnouncementAdded {
            id
            text
            DepartmentId
            createdAt
            updatedAt
        }
    }
`;

export const DEPARTMENT_ANNOUNCEMENT_DELETED = gql`
    subscription {
        departmentAnnouncementDeleted
    }
`;
