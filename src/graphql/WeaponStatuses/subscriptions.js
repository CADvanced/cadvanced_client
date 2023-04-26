import gql from 'graphql-tag';

export const WEAPON_STATUS_DELETED = gql`
    subscription {
        weaponStatusDeleted
    }
`;

export const WEAPON_STATUS_ADDED = gql`
    subscription {
        weaponStatusAdded {
            id
            name
        }
    }
`;

export const WEAPON_STATUS_UPDATED = gql`
    subscription {
        weaponStatusUpdated {
            id
            name
        }
    }
`;
