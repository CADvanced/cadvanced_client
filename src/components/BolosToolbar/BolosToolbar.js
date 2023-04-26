import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

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
    bolosIcon: {
        marginRight: 20
    }
};

const BolosToolbar = ({ classes, openBoloModal }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <ErrorOutline className={classes.bolosIcon} />
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.title}
                    >
                        BOLOS
                    </Typography>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        onClick={openBoloModal}
                    >
                        <AddCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(BolosToolbar);
