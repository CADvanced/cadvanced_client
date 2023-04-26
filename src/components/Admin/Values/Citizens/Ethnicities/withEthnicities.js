import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_ETHNICITIES } from '../../../../../graphql/Ethnicities/queries';
import {
    CREATE_ETHNICITY,
    DELETE_ETHNICITY,
    UPDATE_ETHNICITY
} from '../../../../../graphql/Ethnicities/mutations';
import {
    ETHNICITY_ADDED,
    ETHNICITY_DELETED,
    ETHNICITY_UPDATED
} from '../../../../../graphql/Ethnicities/subscriptions';

const withEthnicities = WrappedComponent => {
    const queries = {
        ALL: ALL_ETHNICITIES
    };
    const mutations = {
        CREATE: CREATE_ETHNICITY,
        DELETE: DELETE_ETHNICITY,
        UPDATE: UPDATE_ETHNICITY
    };
    const subscriptions = {
        ADDED: ETHNICITY_ADDED,
        DELETED: ETHNICITY_DELETED,
        UPDATED: ETHNICITY_UPDATED
    };
    class WithEthnicities extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Ethnicity"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="ethnicityAdded"
                        deletedSubName="ethnicityDeleted"
                        allDataName="allEthnicities"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(ETHNICITY_DELETED, { name: 'ethnicityDeleted' }),
        graphql(ETHNICITY_UPDATED, { name: 'ethnicityUpdated' })
    )(WithEthnicities);
};

export default withEthnicities;
