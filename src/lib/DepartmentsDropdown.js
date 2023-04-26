import React, { useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem } from '@material-ui/core';

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ALL_DEPARTMENTS } from '../graphql/Departments/queries';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 300
    }
});

const DepartmentsDropdown = ({
    selectedDepartment,
    setSelectedDepartment,
    classes,
    filter = x => x
}) => {
    const { loading, data } = useQuery(ALL_DEPARTMENTS);

    // Ensure that if we've not been passed a selected department
    // set a default one
    useEffect(() => {
        if (!selectedDepartment && data) {
            setSelectedDepartment(data.allDepartments[0].id);
        }
    }, [data]);

    return (
        <FormControl className={classes.formControl}>
            {(loading || !data) && <LoadingSpinner />}
            {selectedDepartment && (
                <Select
                    value={selectedDepartment}
                    onChange={e => setSelectedDepartment(e.target.value)}
                    className={classes.select}
                >
                    {data && data.allDepartments.filter(filter).map(option => (
                        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                    ))}
                </Select>
            )}
        </FormControl>
    );
};

export default withStyles(styles)(DepartmentsDropdown);