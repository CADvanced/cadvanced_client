import gql from 'graphql-tag';

export const ALL_CALLS = gql`
    {
        allCalls {
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

export const ALL_CALL_TYPES = gql`
    {
        allCallTypes {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const ALL_CALL_GRADES = gql`
    {
        allCallGrades {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const ALL_INCIDENT_TYPES = gql`
    {
        allIncidentTypes {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const GET_CALL = gql`
    query getCallQuery($callId: ID!) {
        getCall(id: $callId) {
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
