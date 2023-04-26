import gql from 'graphql-tag';

export const CREATE_WEAPON = gql`
    mutation($CitizenId: ID!, $WeaponTypeId: ID!, $WeaponStatusId: ID!) {
        createWeapon(
            CitizenId: $CitizenId
            WeaponTypeId: $WeaponTypeId
            WeaponStatusId: $WeaponStatusId
        ) {
            id
            weaponType {
                id
                name
            }
            weaponStatus {
                id
                name
            }
        }
    }
`;

export const UPDATE_WEAPON = gql`
    mutation(
        $id: ID!
        $CitizenId: ID!
        $WeaponTypeId: ID!
        $WeaponStatusId: ID!
    ) {
        updateWeapon(
            id: $id
            CitizenId: $CitizenId
            WeaponTypeId: $WeaponTypeId
            WeaponStatusId: $WeaponStatusId
        ) {
            id
            weaponType {
                id
                name
            }
            weaponStatus {
                id
                name
            }
        }
    }
`;

export const DELETE_WEAPON = gql`
    mutation($id: ID!, $CitizenId: ID!) {
        deleteWeapon(id: $id, CitizenId: $CitizenId)
    }
`;
