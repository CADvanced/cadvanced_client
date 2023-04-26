import gql from 'graphql-tag';

export const ATTACH_MARKER_TO_CITIZEN = gql`
    mutation($CitizenId: ID!, $MarkerId: ID!) {
        attachMarkerToCitizen(CitizenId: $CitizenId, MarkerId: $MarkerId) {
            id
            name
            type
        }
    }
`;

export const DETACH_MARKER_FROM_CITIZEN = gql`
    mutation($CitizenId: ID!, $MarkerId: ID!) {
        detachMarkerFromCitizen(CitizenId: $CitizenId, MarkerId: $MarkerId)
    }
`;

export const UPDATE_CITIZEN_DETAILS = gql`
    mutation(
        $id: ID!
        $firstName: String
        $lastName: String
        $address: String
        $postalCode: String
        $GenderId: ID
        $EthnicityId: ID
        $dateOfBirth: String
        $weight: String
        $height: String
        $hair: String
        $eyes: String
    ) {
        updateCitizen(
            id: $id
            firstName: $firstName
            lastName: $lastName
            address: $address
            postalCode: $postalCode
            GenderId: $GenderId
            EthnicityId: $EthnicityId
            dateOfBirth: $dateOfBirth
            weight: $weight
            height: $height
            hair: $hair
            eyes: $eyes
        ) {
            id
            firstName
            lastName
            address
            postalCode
            gender {
                id
                name
            }
            ethnicity {
                id
                name
            }
            dateOfBirth
            weight
            height
            hair
            eyes
        }
    }
`;

export const CREATE_CITIZEN = gql`
    mutation(
        $firstName: String
        $lastName: String
        $address: String
        $postalCode: String
        $GenderId: ID
        $EthnicityId: ID
        $dateOfBirth: String
        $weight: String
        $height: String
        $hair: String
        $eyes: String
        $UserId: ID!
    ) {
        createCitizen(
            firstName: $firstName
            lastName: $lastName
            address: $address
            postalCode: $postalCode
            GenderId: $GenderId
            EthnicityId: $EthnicityId
            dateOfBirth: $dateOfBirth
            weight: $weight
            height: $height
            hair: $hair
            eyes: $eyes
            UserId: $UserId
        ) {
            id
            firstName
            lastName
            address
            postalCode
            gender {
                id
                name
            }
            ethnicity {
                id
                name
            }
            dateOfBirth
            weight
            height
            hair
            eyes
        }
    }
`;

export const DELETE_CITIZEN = gql`
    mutation($id: ID!) {
        deleteCitizen(id: $id)
    }
`;
