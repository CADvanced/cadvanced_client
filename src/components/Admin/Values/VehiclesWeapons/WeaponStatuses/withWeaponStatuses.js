import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_WEAPON_STATUSES } from '../../../../../graphql/WeaponStatuses/queries';
import {
    CREATE_WEAPON_STATUS,
    DELETE_WEAPON_STATUS,
    UPDATE_WEAPON_STATUS
} from '../../../../../graphql/WeaponStatuses/mutations';
import {
    WEAPON_STATUS_ADDED,
    WEAPON_STATUS_DELETED,
    WEAPON_STATUS_UPDATED
} from '../../../../../graphql/WeaponStatuses/subscriptions';

const withWeaponStatuses = WrappedComponent => {
    const queries = {
        ALL: ALL_WEAPON_STATUSES
    };
    const mutations = {
        CREATE: CREATE_WEAPON_STATUS,
        DELETE: DELETE_WEAPON_STATUS,
        UPDATE: UPDATE_WEAPON_STATUS
    };
    const subscriptions = {
        ADDED: WEAPON_STATUS_ADDED,
        DELETED: WEAPON_STATUS_DELETED,
        UPDATED: WEAPON_STATUS_UPDATED
    };
    class WithWeaponStatuses extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="WeaponStatus"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="weaponStatusAdded"
                        deletedSubName="weaponStatusDeleted"
                        allDataName="allWeaponStatuses"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(WEAPON_STATUS_DELETED, { name: 'weaponStatusDeleted' }),
        graphql(WEAPON_STATUS_UPDATED, { name: 'weaponStatusUpdated' })
    )(WithWeaponStatuses);
};

export default withWeaponStatuses;
