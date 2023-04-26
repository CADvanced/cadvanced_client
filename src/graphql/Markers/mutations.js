import gql from 'graphql-tag';

export const CREATE_CITIZEN_MARKER = gql`
    mutation($name: String!) {
        createCitizenMarker(name: $name) {
            id
            name
        }
    }
`;

export const CREATE_VEHICLE_MARKER = gql`
    mutation($name: String!) {
        createVehicleMarker(name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_CITIZEN_MARKER = gql`
    mutation($id: ID!, $name: String!) {
        updateCitizenMarker(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const UPDATE_VEHICLE_MARKER = gql`
    mutation($id: ID!, $name: String!) {
        updateVehicleMarker(id: $id, name: $name) {
            id
            name
        }
    }
`;

export const DELETE_CITIZEN_MARKER = gql`
    mutation($id: ID!) {
        deleteCitizenMarker(id: $id)
    }
`;

export const DELETE_VEHICLE_MARKER = gql`
    mutation($id: ID!) {
        deleteVehicleMarker(id: $id)
    }
`;
