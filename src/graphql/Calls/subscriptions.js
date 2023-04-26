import gql from 'graphql-tag';

export const CALL_ADDED = gql`
    subscription {
        callAdded {
            id
            callerInfo
            DepartmentId
            markerX
            markerY
            callGrade {
                id
                name
                code
                readonly
                DepartmentId
            }
            callType {
                id
                name
                code
                readonly
                DepartmentId
            }
            callLocations {
                id
                name
                code
                readonly
            }
            callIncidents {
                id
                name
                code
                readonly
                DepartmentId
            }
            callDescriptions {
                id
                text
            }
            assignedUnits {
                id
                callSign
            }
        }
    }
`;

export const CALL_UPDATED = gql`
    subscription {
        callUpdated {
            id
            callerInfo
            markerX
            markerY
            DepartmentId
            callGrade {
                id
                name
                code
                readonly
                DepartmentId
            }
            callType {
                id
                name
                code
                readonly
                DepartmentId
            }
            callLocations {
                id
                name
                code
                readonly
            }
            callIncidents {
                id
                name
                code
                readonly
                DepartmentId
            }
            callDescriptions {
                id
                text
            }
            assignedUnits {
                id
                callSign
            }
        }
    }
`;

export const CALL_DELETED = gql`
    subscription {
        callDeleted
    }
`;

export const ALL_CALLS_DELETED = gql`
    subscription {
        allCallsDeleted
    }
`;

export const CALL_GRADE_ADDED = gql`
    subscription {
        callGradeAdded {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const CALL_GRADE_DELETED = gql`
    subscription {
        callGradeDeleted
    }
`;

export const CALL_GRADE_UPDATED = gql`
    subscription {
        callGradeUpdated {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const CALL_TYPE_ADDED = gql`
    subscription {
        callTypeAdded {
            id
            name
            code
            readonly
            DepartmentId
        }
    }
`;

export const CALL_TYPE_DELETED = gql`
    subscription {
        callTypeDeleted
    }
`;

export const CALL_TYPE_UPDATED = gql`
    subscription {
        callTypeUpdated {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const INCIDENT_TYPE_ADDED = gql`
    subscription {
        incidentTypeAdded {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const INCIDENT_TYPE_DELETED = gql`
    subscription {
        incidentTypeDeleted
    }
`;

export const INCIDENT_TYPE_UPDATED = gql`
    subscription {
        incidentTypeUpdated {
            id
            name
            code
            readonly
            DepartmentId
        }
    }
`;

export const UNIT_CALL_TOGGLE = gql`
    subscription {
        unitCallToggle {
            callId
            unitId
        }
    }
`;
