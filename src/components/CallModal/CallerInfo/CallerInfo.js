import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    }
});

const CallerInfo = props => {
    return (
        <TextField
            multiline
            fullWidth
            id="form_callerInfo"
            label="Caller information"
            className={props.classes.textField}
            value={props.callerInfo}
            onChange={event =>
                props.handleUpdate('callerInfo', event.target.value)
            }
            margin="normal"
        />
    );
};

export default withStyles(styles)(CallerInfo);
