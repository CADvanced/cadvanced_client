import gql from 'graphql-tag';

export const ALL_CHARGES = gql`
    {
        allCharges {
            id
            name
        }
    }
`;
