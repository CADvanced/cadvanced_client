import gql from 'graphql-tag';

export const UPDATE_PREFERENCE = gql`
    mutation($key: String!, $value: String!) {
        updatePreference(key: $key, value: $value) {
            id
            key
            value
            name
            desc
            type
        }
    }
`;
