import gql from 'graphql-tag';

export const CREATE_WEAPON_STATUS = gql`
    mutation($name: String!) {
        createWeaponStatus(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_WEAPON_STATUS = gql`
    mutation($id: ID!, $name: String!) {
        updateWeaponStatus(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_WEAPON_STATUS = gql`
    mutation($id: ID!) {
        deleteWeaponStatus(id: $id)
    }
`;
