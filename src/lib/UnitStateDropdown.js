import React from 'react';

import { Query } from 'react-apollo';

import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import FilteredSelect from './FilteredSelect';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ALL_UNIT_STATES } from '../graphql/Units/queries';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    }
});

const UnitStateDropdown = props => {
    const { classes, department } = props;

    const handleUpdate = (data, value) => {
        const selected = data.allUnitStates.find(
            type => Number(type.id) === Number(value)
        );
        props.handleUpdate('unitState', selected);
    };

    const filterByDept = toFilter => !department || (department === toFilter.DepartmentId);

    return (
        <FormControl fullWidth className={classes.formControl}>
            <Query query={ALL_UNIT_STATES} className={classes.root}>
                {({ loading, error, data }) => {
                    if (loading) return <LoadingSpinner />;
                    if (error) return <p>Error loading unit states</p>;
                    return (
                        <FilteredSelect
                            update={value => handleUpdate(data, value)}
                            options={data.allUnitStates
                                .filter(filterByDept)
                                .map(op => ({
                                    label: op.name,
                                    value: op.id,
                                    colour: '#' + op.colour
                                }))}
                            selected={props.unitState.id || -1}
                            placeholder="Unit state"
                            noOptionsMessage="No unit states defined"
                        />
                    );
                }}
            </Query>
        </FormControl>
    );
};

export default withStyles(styles)(UnitStateDropdown);
