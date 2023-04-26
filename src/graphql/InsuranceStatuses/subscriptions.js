import gql from 'graphql-tag';

export const INSURANCE_STATUS_DELETED = gql`
    subscription {
        insuranceStatusDeleted
    }
`;

export const INSURANCE_STATUS_ADDED = gql`
    subscription {
        insuranceStatusAdded {
            id
            name
        }
    }
`;

export const INSURANCE_STATUS_UPDATED = gql`
    subscription {
        insuranceStatusUpdated {
            id
            name
        }
    }
`;
