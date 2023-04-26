import gql from 'graphql-tag';

export const ALL_LOCATIONS = gql`
    {
        allLocations {
            id
            name
            code
            readonly
        }
    }
`;
