import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_CALL_GRADES } from '../../../../../graphql/Calls/queries';
import {
    CREATE_CALL_GRADE,
    UPDATE_CALL_GRADE,
    DELETE_CALL_GRADE
} from '../../../../../graphql/Calls/mutations';
import {
    CALL_GRADE_ADDED,
    CALL_GRADE_DELETED,
    CALL_GRADE_UPDATED
} from '../../../../../graphql/Calls/subscriptions';

const withCallGrades = WrappedComponent => {
    const queries = {
        ALL: ALL_CALL_GRADES
    };
    const mutations = {
        CREATE: CREATE_CALL_GRADE,
        UPDATE: UPDATE_CALL_GRADE,
        DELETE: DELETE_CALL_GRADE
    };
    const subscriptions = {
        ADDED: CALL_GRADE_ADDED,
        UPDATED: CALL_GRADE_UPDATED,
        DELETED: CALL_GRADE_DELETED
    };
    class WithCallGrades extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Call grade"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        deletedSubName="callGradeDeleted"
                        addedSubName="callGradeAdded"
                        allDataName="allCallGrades"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(CALL_GRADE_DELETED, { name: 'callGradeDeleted' }),
        graphql(CALL_GRADE_UPDATED, { name: 'callGradeUpdated' })
    )(WithCallGrades);
};

export default withCallGrades;
