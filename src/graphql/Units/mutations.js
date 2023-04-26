import gql from 'graphql-tag';

export const CREATE_UNIT = gql`
    mutation($callSign: String!, $unitTypeId: ID!, $unitStateId: ID!, $DepartmentId: ID!) {
        createUnit(
            callSign: $callSign
            UnitTypeId: $unitTypeId
            UnitStateId: $unitStateId
            DepartmentId: $DepartmentId
        ) {
            id
            callSign
            DepartmentId
            unitType {
                id
                name
            }
            unitState {
                id
                name
                colour
                active
            }
            assignedCalls {
                callIncidents {
                    id
                    name
                    code
                    readonly
                }
                callLocations {
                    id
                    name
                    code
                    readonly
                }
            }
            users {
                id
                avatarUrl
                userName
            }
        }
    }
`;
export const UPDATE_UNIT = gql`
    mutation(
        $id: ID!
        $callSign: String!
        $unitTypeId: ID!
        $unitStateId: ID!
        $DepartmentId: ID!
    ) {
        updateUnit(
            id: $id
            callSign: $callSign
            UnitTypeId: $unitTypeId
            UnitStateId: $unitStateId
            DepartmentId: $DepartmentId
        ) {
            id
            callSign
            DepartmentId
            unitType {
                id
                name
            }
            unitState {
                id
                name
                colour
                active
            }
            assignedCalls {
                callIncidents {
                    id
                    name
                    code
                    readonly
                }
                callLocations {
                    id
                    name
                    code
                    readonly
                }
            }
            users {
                id
                avatarUrl
                userName
            }
        }
    }
`;
export const USER_UNIT_TOGGLE = gql`
    mutation($UserId: ID!, $UnitId: ID!, $UserRankId: ID!) {
        userUnitToggle(
            UserId: $UserId
            UnitId: $UnitId
            UserRankId: $UserRankId
        ) {
            userId
            unitId
            userRankId
        }
    }
`;

export const DELETE_UNIT = gql`
    mutation($unitId: ID!) {
        deleteUnit(id: $unitId)
    }
`;

export const CREATE_UNIT_TYPE = gql`
    mutation($name: String!, $DepartmentId: ID!) {
        createUnitType(name: $name, DepartmentId: $DepartmentId) {
            id
            DepartmentId
        }
    }
`;

export const CREATE_UNIT_STATE = gql`
    mutation($name: String!, $colour: String!, $active: Boolean!, $DepartmentId: ID!) {
        createUnitState(name: $name, colour: $colour, active: $active, DepartmentId: $DepartmentId) {
            id
            name
            colour
            active
            DepartmentId
        }
    }
`;

export const DELETE_UNIT_TYPE = gql`
    mutation($id: ID!) {
        deleteUnitType(id: $id)
    }
`;

export const UPDATE_UNIT_TYPE = gql`
    mutation($id: ID!, $name: String!, $DepartmentId: ID!) {
        updateUnitType(id: $id, name: $name, DepartmentId: $DepartmentId) {
            id
            name
            DepartmentId
        }
    }
`;

export const DELETE_UNIT_STATE = gql`
    mutation($id: ID!) {
        deleteUnitState(id: $id)
    }
`;

export const UPDATE_UNIT_STATE = gql`
    mutation($id: ID!, $name: String!, $colour: String!, $active: Boolean!, $DepartmentId: ID!) {
        updateUnitState(
            id: $id
            name: $name
            colour: $colour
            active: $active
            DepartmentId: $DepartmentId
        ) {
            id
            name
            colour
            DepartmentId
        }
    }
`;

export const REMOVE_USER_FROM_UNIT = gql`
    mutation($UserId: ID!, $UnitId: ID!) {
        removeUserFromUnit(UserId: $UserId, UnitId: $UnitId) {
            id
            callSign
            DepartmentId
            unitType {
                id
                name
            }
            unitState {
                id
                name
                colour
                active
            }
            assignedCalls {
                callIncidents {
                    id
                    name
                    code
                    readonly
                }
                callLocations {
                    id
                    name
                    code
                    readonly
                }
            }
            users {
                id
                avatarUrl
                userName
            }
        }
    }
`;
