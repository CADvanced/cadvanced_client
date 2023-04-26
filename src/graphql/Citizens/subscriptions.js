import gql from 'graphql-tag';

export const CITIZEN_ADDED = gql`
    subscription {
        citizenAdded {
            id
            firstName
            lastName
            address
            postalCode
            GenderId
            gender {
                id
                name
            }
            EthnicityId
            ethnicity {
                id
                name
            }
            dateOfBirth
            weight
            height
            hair
            eyes
            active
            createdAt
        }
    }
`;

export const CITIZEN_UPDATED = gql`
    subscription {
        citizenUpdated {
            id
            firstName
            lastName
            address
            postalCode
            GenderId
            gender {
                id
                name
            }
            EthnicityId
            ethnicity {
                id
                name
            }
            dateOfBirth
            weight
            height
            hair
            eyes
            active
            createdAt
        }
    }
`;

export const CITIZEN_DELETED = gql`
    subscription {
        citizenDeleted
    }
`;

export const MARKER_ATTACHED_TO_CITIZEN = gql`
    subscription {
        markerAttachedToCitizen {
            id
            name
            type
        }
    }
`;

export const MARKER_DETACHED_FROM_CITIZEN = gql`
    subscription {
        markerDetachedFromCitizen
    }
`;
