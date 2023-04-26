import gql from 'graphql-tag';

export const ALL_WARRANTS = gql`
    {
        allWarrants {
            id
            validFrom
            validTo
            details
        }
    }
`;
