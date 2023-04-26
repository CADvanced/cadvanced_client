import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_LICENCE_TYPES } from '../../../../../graphql/LicenceTypes/queries';
import {
    CREATE_LICENCE_TYPE,
    DELETE_LICENCE_TYPE,
    UPDATE_LICENCE_TYPE
} from '../../../../../graphql/LicenceTypes/mutations';
import {
    LICENCE_TYPE_ADDED,
    LICENCE_TYPE_DELETED,
    LICENCE_TYPE_UPDATED
} from '../../../../../graphql/LicenceTypes/subscriptions';

const withLicenceTypes = WrappedComponent => {
    const queries = {
        ALL: ALL_LICENCE_TYPES
    };
    const mutations = {
        CREATE: CREATE_LICENCE_TYPE,
        DELETE: DELETE_LICENCE_TYPE,
        UPDATE: UPDATE_LICENCE_TYPE
    };
    const subscriptions = {
        ADDED: LICENCE_TYPE_ADDED,
        DELETED: LICENCE_TYPE_DELETED,
        UPDATED: LICENCE_TYPE_UPDATED
    };
    class WithLicenceTypes extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Licence type"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="licenceTypeAdded"
                        deletedSubName="licenceTypeDeleted"
                        allDataName="allLicenceTypes"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(LICENCE_TYPE_DELETED, { name: 'licenceTypeDeleted' }),
        graphql(LICENCE_TYPE_UPDATED, { name: 'licenceTypeUpdated' })
    )(WithLicenceTypes);
};

export default withLicenceTypes;
