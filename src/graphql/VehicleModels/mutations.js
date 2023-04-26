import gql from 'graphql-tag';

export const CREATE_VEHICLE_MODEL = gql`
    mutation($name: String!) {
        createVehicleModel(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_VEHICLE_MODEL = gql`
    mutation($id: ID!, $name: String!) {
        updateVehicleModel(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_VEHICLE_MODEL = gql`
    mutation($id: ID!) {
        deleteVehicleModel(id: $id)
    }
`;
