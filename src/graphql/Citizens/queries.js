import gql from 'graphql-tag';

export const ALL_CITIZENS = gql`
    {
        allCitizens {
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

export const GET_USER_CITIZENS = gql`
    query getUserCitizens($UserId: ID!) {
        getUserCitizens(UserId: $UserId) {
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
            markers {
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

export const GET_CITIZEN_OFFENCES = gql`
    query getCitizenOffencesQuery($id: ID!) {
        getCitizen(id: $id) {
            offences {
                id
                date
                time
                location
                CitizenId
                ArrestId
                arrest {
                    id
                    date
                    time
                    OfficerId
                    officer {
                        id
                        firstName
                        lastName
                    }
                    charges {
                        id
                        name
                    }
                }
                charges {
                    id
                    name
                }
                TicketId
                ticket {
                    id
                    date
                    time
                    location
                    points
                    fine
                    notes
                    OfficerId
                    officer {
                        id
                        firstName
                        lastName
                    }
                }
            }
        }
    }
`;

export const GET_CITIZEN_WEAPONS = gql`
    query getCitizen($id: ID!) {
        getCitizen(id: $id) {
            id
            weapons {
                id
                name
            }
        }
    }
`;

export const ALL_CITIZEN_VEHICLES = gql`
    query allCitizenVehicles($CitizenId: ID!) {
        allCitizenVehicles(CitizenId: $CitizenId) {
            id
            licencePlate
            colour
            VehicleModelId
            vehicleModel {
                id
                name
            }
            InsuranceStatusId
            insuranceStatus {
                id
                name
            }
        }
    }
`;

export const ALL_CITIZEN_VEHICLES_BRIEF = gql`
    query allCitizenVehicles($CitizenId: ID!) {
        allCitizenVehicles(CitizenId: $CitizenId) {
            id
            licencePlate
            colour
            VehicleModelId
            InsuranceStatusId
            markers {
                id
                name
            }
        }
    }
`;

export const ALL_CITIZEN_WEAPONS_BRIEF = gql`
    query allCitizenWeapons($CitizenId: ID!) {
        allCitizenWeapons(CitizenId: $CitizenId) {
            id
            WeaponTypeId
            WeaponStatusId
        }
    }
`;

export const ALL_CITIZEN_LICENCES_BRIEF = gql`
    query allCitizenLicences($CitizenId: ID!) {
        allCitizenLicences(CitizenId: $CitizenId) {
            id
            LicenceTypeId
            LicenceStatusId
        }
    }
`;

export const ALL_CITIZEN_WARRANTS_BRIEF = gql`
    query allCitizenWarrants($CitizenId: ID!) {
        allCitizenWarrants(CitizenId: $CitizenId) {
            id
            validFrom
            validTo
            details
        }
    }
`;

export const ALL_CITIZENS_MARKERS = gql`
    query allCitizensMarkers($id: ID!) {
        allCitizensMarkers(id: $id) {
            id
            name
        }
    }
`;

export const SEARCH_CITIZENS = gql`
    query searchCitizensQuery(
        $firstName: String
        $lastName: String
        $dateOfBirth: String
        $id: ID
        $bool: String
    ) {
        searchCitizens(
            firstName: $firstName
            lastName: $lastName
            dateOfBirth: $dateOfBirth
            id: $id
            bool: $bool
        ) {
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
            vehicles {
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
            }
            weapons {
                id
                weaponType {
                    id
                    name
                }
                weaponStatus {
                    id
                    name
                }
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
            markers {
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
