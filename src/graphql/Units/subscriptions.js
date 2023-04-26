import gql from 'graphql-tag';

export const UNIT_DELETED = gql`
    subscription {
        unitDeleted
    }
`;

export const UNIT_ADDED = gql`
    subscription {
        unitAdded {
            id
            callSign
            DepartmentId
            updatedAt
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
        }
    }
`;

export const UNIT_UPDATED = gql`
    subscription {
        unitUpdated {
            id
            callSign
            DepartmentId
            updatedAt
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
        }
    }
`;

export const UNIT_TYPE_ADDED = gql`
    subscription {
        unitTypeAdded {
            id
            name
            DepartmentId
        }
    }
`;

export const UNIT_TYPE_DELETED = gql`
    subscription {
        unitTypeDeleted
    }
`;

export const UNIT_STATE_DELETED = gql`
    subscription {
        unitStateDeleted
    }
`;

export const UNIT_TYPE_UPDATED = gql`
    subscription {
        unitTypeUpdated {
            id
            name
            DepartmentId
        }
    }
`;

export const UNIT_STATE_ADDED = gql`
    subscription {
        unitStateAdded {
            id
            name
            colour
            readonly
            active
            DepartmentId
        }
    }
`;

export const UNIT_STATE_UPDATED = gql`
    subscription {
        unitStateUpdated {
            id
            name
            colour
            active
            DepartmentId
        }
    }
`;

export const USER_UNIT_TOGGLE = gql`
    subscription {
        userUnitToggle {
            userId
            unitId
            userRankId
        }
    }
`;
