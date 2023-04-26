import gql from 'graphql-tag';

export const WEAPON_ADDED = gql`
    subscription {
        weaponAdded {
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

export const WEAPON_UPDATED = gql`
    subscription {
        weaponUpdated {
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

export const WEAPON_DELETED = gql`
    subscription {
        weaponDeleted
    }
`;
