import gql from 'graphql-tag';

export const CHARACTER_ACTIVE_UPDATED = gql`
    subscription {
        characterActiveUpdated {
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
                    colour
                }
            }
        }
    }
`;
