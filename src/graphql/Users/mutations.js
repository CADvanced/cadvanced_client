import gql from 'graphql-tag';

export const UPDATE_SESSION = gql`
    mutation(
        $userId: ID
        $userName: String
        $avatarUrl: String
        $lastUpdated: String
        $token: String
    ) {
        updateSession(
            userId: $userId
            userName: $userName
            avatarUrl: $avatarUrl
            lastUpdated: $lastUpdated
            token: $token
        ) @client
    }
`;

export const AUTHENTICATE_USER = gql`
    mutation($uuid: String!) {
        authenticateUser(uuid: $uuid) {
            token
        }
    }
`;

export const CREATE_USER_RANK = gql`
    mutation($name: String!, $DepartmentId: ID!) {
        createUserRank(name: $name, DepartmentId: $DepartmentId) {
            id
            name
            position
            DepartmentId
        }
    }
`;

export const DELETE_USER_RANK = gql`
    mutation($id: ID!) {
        deleteUserRank(id: $id)
    }
`;

export const UPDATE_USER_RANK = gql`
    mutation($id: ID!, $name: String!, $position: String, $DepartmentId: ID!) {
        updateUserRank(id: $id, name: $name, position: $position, DepartmentId: $DepartmentId) {
            id
            name
            position
            DepartmentId
        }
    }
`;

export const DELETE_USER = gql`
    mutation($id: ID!) {
        deleteUser(id: $id)
    }
`;

export const ASSIGN_USER_ROLES = gql`
    mutation($UserId: ID!, $UserRoles: [UserTypeInput]) {
        assignUserRoles(UserId: $UserId, UserRoles: $UserRoles) {
            id
            userName
            avatarUrl
            steamId
            roles {
                id
                name
                code
            }
        }
    }
`;

export const UPDATE_USER_ASSIGNMENTS = gql`
    mutation($assignments: [UserUnitInput], $userId: ID!) {
        updateUserAssignments(assignments: $assignments, userId: $userId) {
            UserId
            UnitId
            UserRankId
        }
    }
`;

export const UPDATE_USER = gql`
    mutation(
        $id: ID!
        $userName: String!
        $steamId: String!
        $avatarUrl: String!
        $alias: String
    ) {
        updateUser(
            id: $id
            userName: $userName
            steamId: $steamId
            avatarUrl: $avatarUrl
            alias: $alias
        ) {
            id
            userName
            steamId
            avatarUrl
            alias
        }
    }
`;
