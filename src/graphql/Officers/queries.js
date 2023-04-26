import gql from 'graphql-tag';

export const ALL_OFFICERS = gql`
    {
        allOfficers {
            id
            firstName
            lastName
            active
            DepartmentId
        }
    }
`;

export const GET_USER_OFFICERS = gql`
    query getUserOfficers($UserId: ID!, $DepartmentId: ID!) {
        getUserOfficers(UserId: $UserId, DepartmentId: $DepartmentId) {
            id
            firstName
            lastName
            active
            DepartmentId
            department {
                id
                name
                colour
                logo
            }
        }
    }
`;
