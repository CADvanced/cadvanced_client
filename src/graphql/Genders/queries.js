import gql from 'graphql-tag';

export const ALL_GENDERS = gql`
    {
        allGenders {
            id
            name
        }
    }
`;
