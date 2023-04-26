import gql from 'graphql-tag';

export const GET_CHARACTER = gql`
    query getCharacter {
        getCharacter {
            ... on Citizen {
                id
                firstName
                lastName
                active
                UserId
            }
            ... on Officer {
                id
                firstName
                lastName
                active
                UserId
                department {
                    id
                    name
                    logo
                    colour
                }
            }
        }
    }
`;
