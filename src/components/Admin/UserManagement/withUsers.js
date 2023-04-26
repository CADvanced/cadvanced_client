import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_USERS } from '../../../graphql/Users/queries';
import { DELETE_USER, UPDATE_USER } from '../../../graphql/Users/mutations';
import {
    USER_DELETED,
    USER_UPDATED
} from '../../../graphql/Users/subscriptions';

const withUsers = WrappedComponent => {
    const queries = {
        ALL: ALL_USERS
    };
    const mutations = {
        DELETE: DELETE_USER,
        UPDATE: UPDATE_USER
    };
    const subscriptions = {
        DELETED: USER_DELETED,
        UPDATED: USER_UPDATED
    };
    class WithUsers extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        label="User"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        deletedSubName="userDeleted"
                        allDataName="allUsers"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(USER_DELETED, { name: 'userDeleted' }),
        graphql(USER_UPDATED, { name: 'userUpdated' })
    )(WithUsers);
};

export default withUsers;
