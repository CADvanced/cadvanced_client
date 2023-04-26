import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import { getCharacterName } from '../../lib/Misc';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    assignedText: {
        color: theme.palette.primary.darkShade
    }
});

const UserPopup = props => {
    return (
        <React.Fragment>
            <h2>{getCharacterName(props.user)}</h2>
            {props.user.units.length === 0 && (
                <Typography>Currently unassigned</Typography>
            )}
            {props.user.units.length > 0 && (
                <React.Fragment>
                    <Typography className={props.classes.assignedText}>
                        Currently assigned to:{' '}
                        {props.user.units.map(unit => unit.callSign).join(', ')}
                    </Typography>
                </React.Fragment>
            )}
            <Button
                className={props.classes.button}
                variant="contained"
                onClick={props.openUserModal}
                close={props.close}
            >
                Manage unit assignments
            </Button>
        </React.Fragment>
    );
};

export default withStyles(styles)(UserPopup);
