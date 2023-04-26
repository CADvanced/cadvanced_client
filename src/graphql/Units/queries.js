import gql from 'graphql-tag';

export const ALL_UNITS = gql`
    {
        allUnits {
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
            users {
                id
                avatarUrl
                userName
                character {
                    ... on Citizen {
                        id
                        firstName
                        lastName
                        active
                        UserId
                    }
                    ... on Officer {
                        id
                        firstName
                        lastName
                        active
                        UserId
                        DepartmentId
                        department {
                            id
                            name
                            colour
                            logo
                        }
                    }
                }
            }
        }
    }
`;

export const ALL_UNIT_TYPES = gql`
    {
        allUnitTypes {
            id
            name
            DepartmentId
        }
    }
`;

export const ALL_UNIT_STATES = gql`
    {
        allUnitStates {
            id
            name
            colour
            readonly
            active
            DepartmentId
        }
    }
`;

export const GET_UNIT = gql`
    query getUnitQuery($unitId: ID!) {
        getUnit(id: $unitId) {
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
            users {
                id
                avatarUrl
                userName
                character {
                    ... on Citizen {
                        id
                        firstName
                        lastName
                        active
                        UserId
                    }
                    ... on Officer {
                        id
                        firstName
                        lastName
                        active
                        UserId
                        DepartmentId
                        department {
                            id
                            name
                            colour
                            logo
                        }
                    }
                }
            }
        }
    }
`;
