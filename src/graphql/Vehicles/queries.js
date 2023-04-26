import gql from 'graphql-tag';

export const ALL_VEHICLES = gql`
    {
        allVehicles {
            id
            colour
            licencePlate
            vehicleModel {
                id
                name
            }
            insuranceStatus {
                id
                name
            }
            citizen {
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
                warrants {
                    id
                    validFrom
                    validTo
                    details
                }
                dateOfBirth
                weight
                height
                hair
                eyes
            }
        }
    }
`;

export const ALL_VEHICLES_MARKERS = gql`
    query allVehiclesMarkers($id: ID!) {
        allVehiclesMarkers(id: $id) {
            id
            name
        }
    }
`;

export const SEARCH_VEHICLES = gql`
    query searchVehiclesQuery(
        $licencePlate: String
        $colour: String
        $vehicleModel: ID
    ) {
        searchVehicles(
            licencePlate: $licencePlate
            colour: $colour
            vehicleModel: $vehicleModel
        ) {
            id
            colour
            licencePlate
            vehicleModel {
                id
                name
            }
            insuranceStatus {
                id
                name
            }
            markers {
                name
            }
            citizen {
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
                licences {
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
                warrants {
                    id
                    validFrom
                    validTo
                    details
                }
                dateOfBirth
                weight
                height
                hair
                eyes
            }
        }
    }
`;
