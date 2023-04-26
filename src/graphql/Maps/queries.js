import gql from 'graphql-tag';

export const ALL_MAPS = gql`
    {
        allMaps {
            id
            name
            active
            processed
            readonly
        }
    }
`;