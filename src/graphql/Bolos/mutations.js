import gql from 'graphql-tag';

export const CREATE_BOLO = gql`
    mutation createBolo(
        $boloType: String!
        $details: BoloDetailsInput!
        $DepartmentId: ID!
    ) {
        createBolo(
            boloType: $boloType
            details: $details
            DepartmentId: $DepartmentId
        ) {
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
        }
    }
`;

export const DELETE_BOLO = gql`
    mutation deleteBolo(
        $id: ID!
    ) {
        deleteBolo(
            id: $id
        )
    }
`;

export const UPDATE_BOLO = gql`
mutation updateBolo(
    $id: ID!
    $boloType: String!
    $details: BoloDetailsInput!
    $DepartmentId: ID!
) {
  updateBolo(
    id: $id
    boloType: $boloType
    details: $details
    DepartmentId: $DepartmentId
  ) {
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
  }
}
`;