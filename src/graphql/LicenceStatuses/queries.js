import gql from 'graphql-tag';

export const ALL_LICENCE_STATUSES = gql`
    {
        allLicenceStatuses {
            id
            name
        }
    }
`;
