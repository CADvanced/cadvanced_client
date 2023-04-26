import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_UNIT_TYPES } from '../../../../../graphql/Units/queries';
import {
    CREATE_UNIT_TYPE,
    UPDATE_UNIT_TYPE,
    DELETE_UNIT_TYPE
} from '../../../../../graphql/Units/mutations';
import {
    UNIT_TYPE_ADDED,
    UNIT_TYPE_DELETED,
    UNIT_TYPE_UPDATED
} from '../../../../../graphql/Units/subscriptions';

const withUnitTypes = WrappedComponent => {
    const queries = {
        ALL: ALL_UNIT_TYPES
    };
    const mutations = {
        CREATE: CREATE_UNIT_TYPE,
        UPDATE: UPDATE_UNIT_TYPE,
        DELETE: DELETE_UNIT_TYPE
    };
    const subscriptions = {
        ADDED: UNIT_TYPE_ADDED,
        UPDATED: UNIT_TYPE_UPDATED,
        DELETED: UNIT_TYPE_DELETED
    };
    class WithUnitTypes extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Unit type"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        deletedSubName="unitTypeDeleted"
                        addedSubName="unitTypeAdded"
                        allDataName="allUnitTypes"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(UNIT_TYPE_DELETED, { name: 'unitTypeDeleted' }),
        graphql(UNIT_TYPE_UPDATED, { name: 'unitTypeUpdated' })
    )(WithUnitTypes);
};

export default withUnitTypes;
