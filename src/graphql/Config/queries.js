import gql from 'graphql-tag';

export const ALL_CONFIG = gql`
    {
        allConfig {
            key
            value
        }
    }
`;