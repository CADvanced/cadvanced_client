import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_INSURANCE_STATUSES } from '../../../../../graphql/InsuranceStatuses/queries';
import {
    CREATE_INSURANCE_STATUS,
    DELETE_INSURANCE_STATUS,
    UPDATE_INSURANCE_STATUS
} from '../../../../../graphql/InsuranceStatuses/mutations';
import {
    INSURANCE_STATUS_ADDED,
    INSURANCE_STATUS_DELETED,
    INSURANCE_STATUS_UPDATED
} from '../../../../../graphql/InsuranceStatuses/subscriptions';

const withInsuranceStatuses = WrappedComponent => {
    const queries = {
        ALL: ALL_INSURANCE_STATUSES
    };
    const mutations = {
        CREATE: CREATE_INSURANCE_STATUS,
        DELETE: DELETE_INSURANCE_STATUS,
        UPDATE: UPDATE_INSURANCE_STATUS
    };
    const subscriptions = {
        ADDED: INSURANCE_STATUS_ADDED,
        DELETED: INSURANCE_STATUS_DELETED,
        UPDATED: INSURANCE_STATUS_UPDATED
    };
    class WithInsuranceStatuses extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Insurance status"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="insuranceStatusAdded"
                        deletedSubName="insuranceStatusDeleted"
                        allDataName="allInsuranceStatuses"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(INSURANCE_STATUS_DELETED, { name: 'insuranceStatusDeleted' }),
        graphql(INSURANCE_STATUS_UPDATED, { name: 'insuranceStatusUpdated' })
    )(WithInsuranceStatuses);
};

export default withInsuranceStatuses;
