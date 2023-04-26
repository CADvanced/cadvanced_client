import React, { Component } from 'react';

import { Query, graphql } from 'react-apollo';

import compose from 'lodash.flowright';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

import { ALL_UNITS } from '../../../graphql/Units/queries';
import {
    ASSIGN_CALL_TO_UNIT,
    DIVEST_CALL_FROM_UNIT
} from '../../../graphql/Calls/mutations';

class CallUnits extends Component {
    // Toggle unit assignment
    toggle = e => {
        const unitId = e.target.value;
        const selected = this.props.units.find(u => u.id === unitId)
            ? true
            : false;
        if (selected) {
            this.props.divest({
                variables: { callId: this.props.callId, unitId: unitId }
            });
        } else {
            this.props.assign({
                variables: { callId: this.props.callId, unitId: unitId }
            });
        }
    };

    // Is a given unit assigned
    isAssigned = iteratedId => {
        return this.props.units.find(u => u.id === iteratedId) ? true : false;
    };

    filterByDept = toFilter => !this.props.department || (this.props.department === toFilter.DepartmentId)

    render() {
        return (
            <FormControl component="fieldset">
                <FormGroup>
                    <Query query={ALL_UNITS}>
                        {({ loading, error, data }) => {
                            if (loading) return <LoadingSpinner />;
                            if (error) return <p>Error</p>;
                            return (
                                <FormGroup row>
                                    {data.allUnits.filter(this.filterByDept).map(unit => {
                                        const assigned = this.isAssigned(unit.id);
                                        if (unit.unitState.active || assigned) {
                                            return (
                                                <FormControlLabel
                                                    key={unit.id}
                                                    control={
                                                        <Checkbox
                                                            checked={assigned}
                                                            onClick={this.toggle}
                                                            value={unit.id}
                                                        />
                                                    }
                                                    label={unit.callSign}
                                                />
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </FormGroup>
                            );
                        }}
                    </Query>
                </FormGroup>
            </FormControl>
        );
    }
}

export default compose(
    graphql(DIVEST_CALL_FROM_UNIT, { name: 'divest' }),
    graphql(ASSIGN_CALL_TO_UNIT, { name: 'assign' })
)(CallUnits);
