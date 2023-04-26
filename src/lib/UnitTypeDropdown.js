import React from 'react';

import { Query } from 'react-apollo';

import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import FilteredSelect from './FilteredSelect';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ALL_UNIT_TYPES } from '../graphql/Units/queries';

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

const UnitTypeDropdown = props => {
    const { classes, department } = props;

    const filterToDept = toFilter => !department || (toFilter.DepartmentId === department);

    const handleUpdate = (data, value) => {
        const selected = data.allUnitTypes.find(
            type => Number(type.id) === Number(value)
        );
        props.handleUpdate('unitType', selected);
    };

    return (
        <FormControl fullWidth className={classes.formControl}>
            <Query query={ALL_UNIT_TYPES} className={classes.root}>
                {({ loading, error, data }) => {
                    if (loading) return <LoadingSpinner />;
                    if (error) return <p>Error loading unit types</p>;
                    return (
                        <FilteredSelect
                            update={value => handleUpdate(data, value)}
                            options={data.allUnitTypes
                                .filter(filterToDept)
                                .map(op => ({
                                    label: op.name,
                                    value: op.id
                                }))}
                            selected={props.unitType.id || -1}
                            placeholder="Unit type"
                            noOptionsMessage="No unit types defined"
                        />
                    );
                }}
            </Query>
        </FormControl>
    );
};

export default withStyles(styles)(UnitTypeDropdown);
