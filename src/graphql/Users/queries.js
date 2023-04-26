import gql from 'graphql-tag';

export const GET_USER = gql`
    query getUserQuery($id: ID!) {
        getUser(id: $id) {
            id
            userName
            steamId
            avatarUrl
            roles {
                id
                name
                code
            }
            citizens {
                id
                firstName
                lastName
            }
        }
    }
`;

export const GET_USER_SESSION = gql`
    query getUserSession {
        userSession @client {
            __typename
            userId
            userName
            avatarUrl
            lastUpdated
            token
            roles {
                id
                name
                code
            }
        }
    }
`;

export const ALL_USER_LOCATIONS = gql`
    query allUserLocations($mustHaveLocation: Boolean) {
        allUserLocations(mustHaveLocation: $mustHaveLocation) {
            id
            userName
            avatarUrl
            steamId
            x
            y
            alias
            units {
                id
                callSign
            }
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
`;

export const ALL_USER_RANKS = gql`
    {
        allUserRanks {
            id
            name
            position
            DepartmentId
        }
    }
`;

export const ALL_USER_TYPES = gql`
    {
        allUserTypes {
            id
            name
            code
        }
    }
`;

export const ALL_USERS = gql`
    {
        allUsers {
            id
            userName
            avatarUrl
            steamId
            alias
            roles {
                id
                name
                code
            }
            units {
                id
                callSign
            }
        }
    }
`;

export const ALL_USER_UNITS = gql`
    {
        allUserUnits {
            UserId
            UnitId
            UserRankId
        }
    }
`;
