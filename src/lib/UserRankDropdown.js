import React from 'react';

import { Query } from 'react-apollo';

import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import FilteredSelect from './FilteredSelect';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ALL_USER_RANKS } from '../graphql/Users/queries';

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

const UserRankDropdown = ({
    classes,
    departmentId,
    handleUpdate,
    userRank
}) => {
    const filterRanks = toFilter => !departmentId ?
        toFilter :
        toFilter.DepartmentId === departmentId;

    return (
        <Query query={ALL_USER_RANKS} className={classes.root}>
            {({ loading, error, data }) => {
                if (loading) return <LoadingSpinner />;
                if (error) return <p>Error loading user ranks</p>;
                return (
                    <FormControl className={classes.formControl}>
                        <FilteredSelect
                            update={value => handleUpdate(value)}
                            options={data.allUserRanks
                                .sort((a, b) => a.position - b.position)
                                .filter(filterRanks)
                                .map(op => ({
                                    label: op.name,
                                    value: op.id,
                                    colour: '#' + op.colour
                                }))}
                            selected={userRank || -1}
                            placeholder="User rank"
                            noOptionsMessage="No user ranks defined"
                        />
                    </FormControl>
                );
            }}
        </Query>
    );
};

export default withStyles(styles)(UserRankDropdown);
