import gql from 'graphql-tag';

export const WEAPON_TYPE_DELETED = gql`
    subscription {
        weaponTypeDeleted
    }
`;

export const WEAPON_TYPE_ADDED = gql`
    subscription {
        weaponTypeAdded {
            id
            name
        }
    }
`;

export const WEAPON_TYPE_UPDATED = gql`
    subscription {
        weaponTypeUpdated {
            id
            name
        }
    }
`;
