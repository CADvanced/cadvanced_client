import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_UNIT_STATES } from '../../../../../graphql/Units/queries';
import {
    CREATE_UNIT_STATE,
    DELETE_UNIT_STATE,
    UPDATE_UNIT_STATE
} from '../../../../../graphql/Units/mutations';
import {
    UNIT_STATE_ADDED,
    UNIT_STATE_DELETED,
    UNIT_STATE_UPDATED
} from '../../../../../graphql/Units/subscriptions';

const withUnitStates = WrappedComponent => {
    const queries = {
        ALL: ALL_UNIT_STATES
    };
    const mutations = {
        CREATE: CREATE_UNIT_STATE,
        DELETE: DELETE_UNIT_STATE,
        UPDATE: UPDATE_UNIT_STATE
    };
    const subscriptions = {
        ADDED: UNIT_STATE_ADDED,
        DELETED: UNIT_STATE_DELETED,
        UPDATED: UNIT_STATE_UPDATED
    };
    class WithUnitStates extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Unit state"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="unitStateAdded"
                        deletedSubName="unitStateDeleted"
                        allDataName="allUnitStates"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(UNIT_STATE_DELETED, { name: 'unitStateDeleted' }),
        graphql(UNIT_STATE_UPDATED, { name: 'unitStateUpdated' })
    )(WithUnitStates);
};

export default withUnitStates;
