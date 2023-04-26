import gql from 'graphql-tag';

export const USER_LOCATION_CHANGED = gql`
    subscription {
        userLocationChanged {
            id
            userName
            avatarUrl
            steamId
            alias
            x
            y
        }
    }
`;

export const USER_RANK_ADDED = gql`
    subscription {
        userRankAdded {
            id
            name
            position
            DepartmentId
        }
    }
`;

export const USER_RANK_DELETED = gql`
    subscription {
        userRankDeleted
    }
`;

export const USER_RANK_UPDATED = gql`
    subscription {
        userRankUpdated {
            id
            name
            position
            DepartmentId
        }
    }
`;

export const USER_DELETED = gql`
    subscription {
        userDeleted
    }
`;

export const USER_UNIT_ASSIGNED = gql`
    subscription {
        userUnitAssigned {
            UserId
            UnitId
            UserRankId
        }
    }
`;

export const USER_UPDATED = gql`
    subscription {
        userUpdated {
            id
            userName
            avatarUrl
            steamId
            alias
        }
    }
`;
