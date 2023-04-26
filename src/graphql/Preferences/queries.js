import gql from 'graphql-tag';

export const GET_PREFERENCE = gql`
    query getPreference($key: String!) {
        getPreference(key: $key) {
            id
            key
            value
            name
            desc
            type
        }
    }
`;

export const ALL_PREFERENCES = gql`
    {
        allPreferences {
            id
            key
            value
            name
            desc
            type
        }
    }
`;

export const INITIALISE_FIVEM = gql`
    {
        initialiseFiveM {
            message
        }
    }
`;
