import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_LICENCE_STATUSES } from '../../../../../graphql/LicenceStatuses/queries';
import {
    CREATE_LICENCE_STATUS,
    DELETE_LICENCE_STATUS,
    UPDATE_LICENCE_STATUS
} from '../../../../../graphql/LicenceStatuses/mutations';
import {
    LICENCE_STATUS_ADDED,
    LICENCE_STATUS_DELETED,
    LICENCE_STATUS_UPDATED
} from '../../../../../graphql/LicenceStatuses/subscriptions';

const withLicenceStatuses = WrappedComponent => {
    const queries = {
        ALL: ALL_LICENCE_STATUSES
    };
    const mutations = {
        CREATE: CREATE_LICENCE_STATUS,
        DELETE: DELETE_LICENCE_STATUS,
        UPDATE: UPDATE_LICENCE_STATUS
    };
    const subscriptions = {
        ADDED: LICENCE_STATUS_ADDED,
        DELETED: LICENCE_STATUS_DELETED,
        UPDATED: LICENCE_STATUS_UPDATED
    };
    class WithLicenceStatuses extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Licence status"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="licenceStatusAdded"
                        deletedSubName="licenceStatusDeleted"
                        allDataName="allLicenceStatuses"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(LICENCE_STATUS_DELETED, { name: 'licenceStatusDeleted' }),
        graphql(LICENCE_STATUS_UPDATED, { name: 'licenceStatusUpdated' })
    )(WithLicenceStatuses);
};

export default withLicenceStatuses;
