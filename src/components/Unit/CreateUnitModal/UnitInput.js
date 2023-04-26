import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

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

const UnitInput = props => {
    const { classes } = props;
    return (
        <FormControl fullWidth className={classes.formControl}>
            <InputLabel htmlFor="callSign-input">
                Enter a new callsign:
            </InputLabel>
            <Input
                fullWidth
                id="callSign-input"
                className={classes.textField}
                value={props.callSign}
                onChange={e => props.handleUpdate('callSign', e.target.value)}
            />
        </FormControl>
    );
};
export default withStyles(styles)(UnitInput);
