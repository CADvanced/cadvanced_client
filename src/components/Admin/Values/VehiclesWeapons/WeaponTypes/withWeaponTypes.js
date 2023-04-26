import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_WEAPON_TYPES } from '../../../../../graphql/WeaponTypes/queries';
import {
    CREATE_WEAPON_TYPE,
    DELETE_WEAPON_TYPE,
    UPDATE_WEAPON_TYPE
} from '../../../../../graphql/WeaponTypes/mutations';
import {
    WEAPON_TYPE_ADDED,
    WEAPON_TYPE_DELETED,
    WEAPON_TYPE_UPDATED
} from '../../../../../graphql/WeaponTypes/subscriptions';

const withWeaponTypes = WrappedComponent => {
    const queries = {
        ALL: ALL_WEAPON_TYPES
    };
    const mutations = {
        CREATE: CREATE_WEAPON_TYPE,
        DELETE: DELETE_WEAPON_TYPE,
        UPDATE: UPDATE_WEAPON_TYPE
    };
    const subscriptions = {
        ADDED: WEAPON_TYPE_ADDED,
        DELETED: WEAPON_TYPE_DELETED,
        UPDATED: WEAPON_TYPE_UPDATED
    };
    class WithWeaponTypes extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="WeaponType"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        addedSubName="weaponTypeAdded"
                        deletedSubName="weaponTypeDeleted"
                        allDataName="allWeaponTypes"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(WEAPON_TYPE_DELETED, { name: 'weaponTypeDeleted' }),
        graphql(WEAPON_TYPE_UPDATED, { name: 'weaponTypeUpdated' })
    )(WithWeaponTypes);
};

export default withWeaponTypes;
