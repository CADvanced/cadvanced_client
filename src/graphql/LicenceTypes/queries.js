import gql from 'graphql-tag';

export const ALL_LICENCE_TYPES = gql`
    {
        allLicenceTypes {
            id
            name
        }
    }
`;
