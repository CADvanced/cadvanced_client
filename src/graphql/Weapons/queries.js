import gql from 'graphql-tag';

export const ALL_WEAPONS = gql`
    {
        allWeapons {
            id
            weaponType {
                id
                name
            }
            weaponStatus {
                id
                name
            }
            citizen {
                id
                firstName
                lastName
                address
                postalCode
                GenderId
                gender {
                    id
                    name
                }
                EthnicityId
                ethnicity {
                    id
                    name
                }
                dateOfBirth
                weight
                height
                hair
                eyes
            }
        }
    }
`;
