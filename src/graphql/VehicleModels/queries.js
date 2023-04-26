import gql from 'graphql-tag';

export const ALL_VEHICLE_MODELS = gql`
    {
        allVehicleModels {
            id
            name
        }
    }
`;
