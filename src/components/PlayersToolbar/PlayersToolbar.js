import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
    }
};

const CallsToolbar = props => {
    return (
        <div className={props.classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={props.classes.title}
                    >
                        PLAYERS
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withStyles(styles)(CallsToolbar);
