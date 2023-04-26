import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_CALL_TYPES } from '../../../../../graphql/Calls/queries';
import {
    CREATE_CALL_TYPE,
    UPDATE_CALL_TYPE,
    DELETE_CALL_TYPE
} from '../../../../../graphql/Calls/mutations';
import {
    CALL_TYPE_ADDED,
    CALL_TYPE_DELETED,
    CALL_TYPE_UPDATED
} from '../../../../../graphql/Calls/subscriptions';

const withCallTypes = WrappedComponent => {
    const queries = {
        ALL: ALL_CALL_TYPES
    };
    const mutations = {
        CREATE: CREATE_CALL_TYPE,
        UPDATE: UPDATE_CALL_TYPE,
        DELETE: DELETE_CALL_TYPE
    };
    const subscriptions = {
        ADDED: CALL_TYPE_ADDED,
        UPDATED: CALL_TYPE_UPDATED,
        DELETED: CALL_TYPE_DELETED
    };
    class WithCallTypes extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Call type"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        deletedSubName="callTypeDeleted"
                        addedSubName="callTypeAdded"
                        allDataName="allCallTypes"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(CALL_TYPE_DELETED, { name: 'callTypeDeleted' }),
        graphql(CALL_TYPE_UPDATED, { name: 'callTypeUpdated' })
    )(WithCallTypes);
};

export default withCallTypes;
