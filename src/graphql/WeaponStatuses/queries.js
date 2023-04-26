import gql from 'graphql-tag';

export const ALL_WEAPON_STATUSES = gql`
    {
        allWeaponStatuses {
            id
            name
        }
    }
`;
