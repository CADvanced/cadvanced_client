import gql from 'graphql-tag';

export const ALL_WEAPON_TYPES = gql`
    {
        allWeaponTypes {
            id
            name
        }
    }
`;
