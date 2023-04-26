import gql from 'graphql-tag';

export const CHARGE_DELETED = gql`
    subscription {
        chargeDeleted
    }
`;

export const CHARGE_ADDED = gql`
    subscription {
        chargeAdded {
            id
            name
        }
    }
`;

export const CHARGE_UPDATED = gql`
    subscription {
        chargeUpdated {
            id
            name
        }
    }
`;
