import gql from 'graphql-tag';

export const ALL_CITIZEN_MARKERS = gql`
    query allCitizenMarkers {
        allCitizenMarkers {
            id
            name
        }
    }
`;

export const ALL_VEHICLE_MARKERS = gql`
    query allVehicleMarkers {
        allVehicleMarkers {
            id
            name
        }
    }
`;
