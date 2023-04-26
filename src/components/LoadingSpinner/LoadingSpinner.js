import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
        marginTop: theme.spacing.unit * 8,
        marginBottom: theme.spacing.unit * 4
    }
});

const LoadingSpinner = ({ classes, size = 40 }) => {
    return (
        <Grid container className={classes.root}>
            <Grid item lg={12} xs={12}>
                <CircularProgress size={size} color="secondary" />
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(LoadingSpinner);
