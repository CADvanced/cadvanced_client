import gql from 'graphql-tag';

export const ALL_BOLOS = gql`
    {
        allBolos {
            id
            boloType
            DepartmentId
            details {
                description
                knownName
                weapons
                lastLocation
                reason        
                licencePlate
                driverDescription
                occupants
            }
            updatedAt
        }
    }        
`;