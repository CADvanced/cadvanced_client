import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Call from '@material-ui/icons/Call';

const styles = {
    title: {
        font: '1em "Jura", sans-serif',
        fontWeight: 700,
        flex: 1
    },
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    callsIcon: {
        marginRight: 20
    }
};

const CallsToolbar = props => {
    return (
        <div className={props.classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Call className={props.classes.callsIcon} />
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={props.classes.title}
                    >
                        CALLS
                    </Typography>
                    <IconButton
                        className={props.classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        onClick={() => props.openCallModal()}
                    >
                        <AddCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(CallsToolbar);
