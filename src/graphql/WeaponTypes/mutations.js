import gql from 'graphql-tag';

export const CREATE_WEAPON_TYPE = gql`
    mutation($name: String!) {
        createWeaponType(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_WEAPON_TYPE = gql`
    mutation($id: ID!, $name: String!) {
        updateWeaponType(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_WEAPON_TYPE = gql`
    mutation($id: ID!) {
        deleteWeaponType(id: $id)
    }
`;
