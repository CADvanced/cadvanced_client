import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_CHARGES } from '../../../../../graphql/Charges/queries';
import {
    CREATE_CHARGE,
    DELETE_CHARGE,
    UPDATE_CHARGE
} from '../../../../../graphql/Charges/mutations';
import {
    CHARGE_ADDED,
    CHARGE_DELETED,
    CHARGE_UPDATED
} from '../../../../../graphql/Charges/subscriptions';

const withCharges = WrappedComponent => {
    const queries = {
        ALL: ALL_CHARGES
    };
    const mutations = {
        CREATE: CREATE_CHARGE,
        DELETE: DELETE_CHARGE,
        UPDATE: UPDATE_CHARGE
    };
    const subscriptions = {
        ADDED: CHARGE_ADDED,
        DELETED: CHARGE_DELETED,
        UPDATED: CHARGE_UPDATED
    };
    class WithCharges extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Charge"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="chargeAdded"
                        deletedSubName="chargeDeleted"
                        allDataName="allCharges"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(CHARGE_DELETED, { name: 'chargeDeleted' }),
        graphql(CHARGE_UPDATED, { name: 'chargeUpdated' })
    )(WithCharges);
};

export default withCharges;
