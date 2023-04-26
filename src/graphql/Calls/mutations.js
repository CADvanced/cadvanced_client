import gql from 'graphql-tag';

export const CREATE_CALL = gql`
    mutation(
        $callerInfo: String
        $callGrade: CallGradeInput!
        $callType: CallTypeInput!
        $callIncidents: [IncidentTypeInput]!
        $callLocations: [LocationInput!]!
        $callDescriptions: [CallDescriptionInput]
        $markerX: Float
        $markerY: Float
        $DepartmentId: ID!
    ) {
        createCall(
            callerInfo: $callerInfo
            callGrade: $callGrade
            callType: $callType
            callIncidents: $callIncidents
            callLocations: $callLocations
            callDescriptions: $callDescriptions
            markerX: $markerX
            markerY: $markerY
            DepartmentId: $DepartmentId
        ) {
            id
            callerInfo
            markerX
            markerY
            DepartmentId
            callType {
                id
                name
                code
                readonly
                DepartmentId
            }
            callGrade {
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
        }
    }
`;

export const UPDATE_CALL = gql`
    mutation(
        $id: ID!
        $callerInfo: String
        $callGrade: CallGradeInput!
        $callType: CallTypeInput!
        $callIncidents: [IncidentTypeInput]!
        $callLocations: [LocationInput!]!
        $callDescriptions: [CallDescriptionInput]
        $markerX: Float
        $markerY: Float
        $DepartmentId: ID!
    ) {
        updateCall(
            id: $id
            callerInfo: $callerInfo
            callGrade: $callGrade
            callType: $callType
            callIncidents: $callIncidents
            callLocations: $callLocations
            callDescriptions: $callDescriptions
            markerX: $markerX
            markerY: $markerY
            DepartmentId: $DepartmentId
        ) {
            id
            callerInfo
            markerX
            markerY
            DepartmentId
            callType {
                id
                name
                code
                readonly
                DepartmentId
            }
            callGrade {
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
        }
    }
`;

export const ASSIGN_CALL_TO_UNIT = gql`
    mutation($callId: ID!, $unitId: ID!) {
        assignCallToUnit(CallId: $callId, UnitId: $unitId) {
            callId
            unitId
        }
    }
`;

export const DIVEST_CALL_FROM_UNIT = gql`
    mutation($callId: ID!, $unitId: ID!) {
        divestCallFromUnit(CallId: $callId, UnitId: $unitId) {
            callId
            unitId
        }
    }
`;

export const DELETE_CALL = gql`
    mutation($callId: ID!) {
        deleteCall(id: $callId)
    }
`;

export const DELETE_ALL_CALLS = gql`
    mutation($DepartmentId: ID!) {
        deleteAllCalls(DepartmentId: $DepartmentId)
    }
`;

export const CREATE_CALL_GRADE = gql`
    mutation($name: String!, $DepartmentId: ID!) {
        createCallGrade(name: $name, DepartmentId: $DepartmentId) {
            id
            name
            DepartmentId
            readonly
        }
    }
`;

export const DELETE_CALL_GRADE = gql`
    mutation($id: ID!) {
        deleteCallGrade(id: $id)
    }
`;

export const UPDATE_CALL_GRADE = gql`
    mutation($id: ID!, $name: String!, $DepartmentId: ID!) {
        updateCallGrade(id: $id, name: $name, DepartmentId: $DepartmentId ) {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const CREATE_CALL_TYPE = gql`
    mutation($name: String!, $DepartmentId: ID!) {
        createCallType(name: $name, DepartmentId: $DepartmentId) {
            id
            name
            DepartmentId
        }
    }
`;

export const DELETE_CALL_TYPE = gql`
    mutation($id: ID!) {
        deleteCallType(id: $id)
    }
`;

export const UPDATE_CALL_TYPE = gql`
    mutation($id: ID!, $name: String!, $DepartmentId: ID!) {
        updateCallType(id: $id, name: $name, DepartmentId: $DepartmentId) {
            id
            name
            DepartmentId
        }
    }
`;

export const CREATE_INCIDENT_TYPE = gql`
    mutation($name: String!, $DepartmentId: ID!) {
        createIncidentType(name: $name, DepartmentId: $DepartmentId) {
            id
            name
            DepartmentId
        }
    }
`;

export const DELETE_INCIDENT_TYPE = gql`
    mutation($id: ID!) {
        deleteIncidentType(id: $id)
    }
`;

export const UPDATE_INCIDENT_TYPE = gql`
    mutation($id: ID!, $name: String!, $DepartmentId: ID!) {
        updateIncidentType(id: $id, name: $name, DepartmentId: $DepartmentId) {
            id
            name
            code
            DepartmentId
            readonly
        }
    }
`;

export const UPDATE_CALL_MARKER = gql`
    mutation($id: ID!, $markerX: Float, $markerY: Float) {
        updateCallMarker(id: $id, markerX: $markerX, markerY: $markerY) {
            id
            markerX
            markerY
        }
    }
`;
