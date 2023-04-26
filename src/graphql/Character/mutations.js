import gql from 'graphql-tag';

export const SET_CHARACTER = gql`
    mutation($type: CharacterType!, $id: ID!, $active: Boolean!) {
        setCharacter(type: $type, id: $id, active: $active) {
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
            }
        }
    }
`;
