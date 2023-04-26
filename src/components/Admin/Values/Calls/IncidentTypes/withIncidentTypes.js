import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import { ALL_INCIDENT_TYPES } from '../../../../../graphql/Calls/queries';
import {
    CREATE_INCIDENT_TYPE,
    UPDATE_INCIDENT_TYPE,
    DELETE_INCIDENT_TYPE
} from '../../../../../graphql/Calls/mutations';
import {
    INCIDENT_TYPE_ADDED,
    INCIDENT_TYPE_DELETED,
    INCIDENT_TYPE_UPDATED
} from '../../../../../graphql/Calls/subscriptions';

const withIncidentTypes = WrappedComponent => {
    const queries = {
        ALL: ALL_INCIDENT_TYPES
    };
    const mutations = {
        CREATE: CREATE_INCIDENT_TYPE,
        UPDATE: UPDATE_INCIDENT_TYPE,
        DELETE: DELETE_INCIDENT_TYPE
    };
    const subscriptions = {
        ADDED: INCIDENT_TYPE_ADDED,
        UPDATED: INCIDENT_TYPE_UPDATED,
        DELETED: INCIDENT_TYPE_DELETED
    };
    class WithIncidentTypes extends Component {
        render() {
            const { ...other } = this.props;
            return (
                <React.Fragment>
                    <WrappedComponent
                        alphaSort="name"
                        label="Incident type"
                        queries={queries}
                        mutations={mutations}
                        subscriptions={subscriptions}
                        deletedSubName="incidentTypeDeleted"
                        addedSubName="incidentTypeAdded"
                        allDataName="allIncidentTypes"
                        {...other}
                    />
                </React.Fragment>
            );
        }
    }
    return compose(
        graphql(INCIDENT_TYPE_DELETED, { name: 'incidentTypeDeleted' }),
        graphql(INCIDENT_TYPE_UPDATED, { name: 'incidentTypeUpdated' })
    )(WithIncidentTypes);
};

export default withIncidentTypes;
