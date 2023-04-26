import React from 'react';
import { Query } from 'react-apollo';

import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ALL_UNITS } from '../graphql/Units/queries';

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

const UnitsDropdown = props => {
    const { classes } = props;
    return (
        <Query query={ALL_UNITS} className={classes.root}>
            {({ loading, error, data }) => {
                if (loading) return <LoadingSpinner />;
                if (error) return <p>Error loading units</p>;
                return (
                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel htmlFor="callSign-select">
                            Callsign
                        </InputLabel>
                        <Select
                            id="callSign-select"
                            value={props.unitId}
                            onChange={e =>
                                props.handleUpdate('unitId', e.target.value)
                            }
                        >
                            {data.allUnits.map(unit => (
                                <MenuItem key={unit.id} value={unit.id}>
                                    {unit.callSign}
                                </MenuItem>
                            ))}
                            ;
                        </Select>
                    </FormControl>
                );
            }}
        </Query>
    );
};

export default withStyles(styles)(UnitsDropdown);
