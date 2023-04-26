import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_GENDERS } from '../../../../../graphql/Genders/queries';
import {
    CREATE_GENDER,
    DELETE_GENDER,
    UPDATE_GENDER
} from '../../../../../graphql/Genders/mutations';
import {
    GENDER_ADDED,
    GENDER_DELETED,
    GENDER_UPDATED
} from '../../../../../graphql/Genders/subscriptions';

const withGenders = WrappedComponent => {
    const queries = {
        ALL: ALL_GENDERS
    };
    const mutations = {
        CREATE: CREATE_GENDER,
        DELETE: DELETE_GENDER,
        UPDATE: UPDATE_GENDER
    };
    const subscriptions = {
        ADDED: GENDER_ADDED,
        DELETED: GENDER_DELETED,
        UPDATED: GENDER_UPDATED
    };
    class WithGenders extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Gender"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="genderAdded"
                        deletedSubName="genderDeleted"
                        allDataName="allGenders"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(GENDER_DELETED, { name: 'genderDeleted' }),
        graphql(GENDER_UPDATED, { name: 'genderUpdated' })
    )(WithGenders);
};

export default withGenders;
