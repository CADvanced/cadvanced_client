import React from 'react';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import FilteredSelect from '../../../lib/FilteredSelect';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { ALL_CALL_TYPES } from '../../../graphql/Calls/queries';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        display: 'flex'
    }
});

const CallType = ({
    handleUpdate,
    department,
    classes,
    callType
}) => {
    const handleCallTypeUpdate = (data, value) => {
        var selected = data.allCallTypes.find(
            type => Number(type.id) === Number(value)
        );
        handleUpdate('callType', selected);
    };
    const filterByDept = toFilter => {
        return !department || (toFilter.DepartmentId === department);
    }
    return (
        <FormControl className={classes.formControl}>
            <Query query={ALL_CALL_TYPES}>
                {({ loading, error, data }) => {
                    if (loading) return <LoadingSpinner />;
                    if (error) return <p>Error</p>;
                    return (
                        <FilteredSelect
                            update={value => handleCallTypeUpdate(data, value)}
                            options={data.allCallTypes.filter(filterByDept).map(op => ({
                                label: op.name,
                                value: op.id
                            }))}
                            selected={callType.id || -1}
                            placeholder="Call type"
                            noOptionsMessage="No call types defined"
                        />
                    );
                }}
            </Query>
        </FormControl>
    );
};

export default withStyles(styles)(CallType);
