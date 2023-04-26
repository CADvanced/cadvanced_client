import React from 'react';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

import FilteredSelect from '../../../lib/FilteredSelect';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import { ALL_CALL_GRADES } from '../../../graphql/Calls/queries';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        display: 'flex'
    }
});

const CallGrade = ({
    handleUpdate,
    department,
    classes,
    callGrade
}) => {
    const handleCallGradeUpdate = (data, value) => {
        var selected = data.allCallGrades.find(
            grade => Number(grade.id) === Number(value)
        );
        handleUpdate('callGrade', selected);
    };
    const filterByDept = toFilter => {
        return !department || (toFilter.DepartmentId === department);
    }
    return (
        <FormControl className={classes.formControl}>
            <Query query={ALL_CALL_GRADES}>
                {({ loading, error, data }) => {
                    if (loading) return <LoadingSpinner />;
                    if (error) return <p>Error</p>;
                    return (
                        <FilteredSelect
                            update={value => handleCallGradeUpdate(data, value)}
                            options={data.allCallGrades.filter(filterByDept).map(op => ({
                                label: op.name,
                                value: op.id
                            }))}
                            selected={callGrade.id || -1}
                            placeholder="Call grade"
                            noOptionsMessage="No call grades defined"
                        />
                    );
                }}
            </Query>
        </FormControl>
    );
};

export default withStyles(styles)(CallGrade);
