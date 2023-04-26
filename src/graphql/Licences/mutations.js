import gql from 'graphql-tag';

export const CREATE_LICENCE = gql`
    mutation($CitizenId: ID!, $LicenceTypeId: ID!, $LicenceStatusId: ID!) {
        createLicence(
            CitizenId: $CitizenId
            LicenceTypeId: $LicenceTypeId
            LicenceStatusId: $LicenceStatusId
        ) {
            id
            licenceType {
                id
                name
            }
            licenceStatus {
                id
                name
            }
        }
    }
`;

export const UPDATE_LICENCE = gql`
    mutation(
        $id: ID!
        $CitizenId: ID!
        $LicenceTypeId: ID!
        $LicenceStatusId: ID!
    ) {
        updateLicence(
            id: $id
            CitizenId: $CitizenId
            LicenceTypeId: $LicenceTypeId
            LicenceStatusId: $LicenceStatusId
        ) {
            id
            licenceType {
                id
                name
            }
            licenceStatus {
                id
                name
            }
        }
    }
`;

export const DELETE_LICENCE = gql`
    mutation($id: ID!, $CitizenId: ID!) {
        deleteLicence(id: $id, CitizenId: $CitizenId)
    }
`;
