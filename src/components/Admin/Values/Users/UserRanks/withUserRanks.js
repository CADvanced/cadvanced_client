import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_USER_RANKS } from '../../../../../graphql/Users/queries';
import {
    CREATE_USER_RANK,
    UPDATE_USER_RANK,
    DELETE_USER_RANK
} from '../../../../../graphql/Users/mutations';
import {
    USER_RANK_ADDED,
    USER_RANK_DELETED,
    USER_RANK_UPDATED
} from '../../../../../graphql/Users/subscriptions';

const withUserRanks = WrappedComponent => {
    const queries = {
        ALL: ALL_USER_RANKS
    };
    const mutations = {
        CREATE: CREATE_USER_RANK,
        UPDATE: UPDATE_USER_RANK,
        DELETE: DELETE_USER_RANK
    };
    const subscriptions = {
        ADDED: USER_RANK_ADDED,
        UPDATED: USER_RANK_UPDATED,
        DELETED: USER_RANK_DELETED
    };
    class WithUserRanks extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        label="User rank"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        deletedSubName="userRankDeleted"
                        addedSubName="userRankAdded"
                        allDataName="allUserRanks"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(USER_RANK_DELETED, { name: 'userRankDeleted' }),
        graphql(USER_RANK_UPDATED, { name: 'userRankUpdated' })
    )(WithUserRanks);
};

export default withUserRanks;
