import gql from 'graphql-tag';

export const ALL_ETHNICITIES = gql`
    {
        allEthnicities {
            id
            name
        }
    }
`;
