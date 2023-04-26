import gql from 'graphql-tag';

export const ALL_INSURANCE_STATUSES = gql`
    {
        allInsuranceStatuses {
            id
            name
        }
    }
`;
