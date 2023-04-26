import gql from 'graphql-tag';

export const CREATE_VEHICLE = gql`
    mutation(
        $colour: String
        $licencePlate: String
        $CitizenId: ID!
        $VehicleModelId: ID
        $InsuranceStatusId: ID
    ) {
        createVehicle(
            colour: $colour
            licencePlate: $licencePlate
            CitizenId: $CitizenId
            VehicleModelId: $VehicleModelId
            InsuranceStatusId: $InsuranceStatusId
        ) {
            id
            licencePlate
            colour
            vehicleModel {
                id
                name
            }
            insuranceStatus {
                id
                name
            }
        }
    }
`;

export const UPDATE_VEHICLE = gql`
    mutation(
        $id: ID!
        $colour: String
        $licencePlate: String
        $CitizenId: ID!
        $VehicleModelId: ID
        $InsuranceStatusId: ID
    ) {
        updateVehicle(
            id: $id
            colour: $colour
            licencePlate: $licencePlate
            CitizenId: $CitizenId
            VehicleModelId: $VehicleModelId
            InsuranceStatusId: $InsuranceStatusId
        ) {
            id
            licencePlate
            colour
            vehicleModel {
                id
                name
            }
            insuranceStatus {
                id
                name
            }
        }
    }
`;

export const DELETE_VEHICLE = gql`
    mutation($id: ID!, $CitizenId: ID!) {
        deleteVehicle(id: $id, CitizenId: $CitizenId)
    }
`;

export const ATTACH_MARKER_TO_VEHICLE = gql`
    mutation($VehicleId: ID!, $MarkerId: ID!) {
        attachMarkerToVehicle(VehicleId: $VehicleId, MarkerId: $MarkerId) {
            id
            name
            type
        }
    }
`;

export const DETACH_MARKER_FROM_VEHICLE = gql`
    mutation($VehicleId: ID!, $MarkerId: ID!) {
        detachMarkerFromVehicle(VehicleId: $VehicleId, MarkerId: $MarkerId)
    }
`;
