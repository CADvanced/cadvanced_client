import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner';

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

const WarrantRead = ({ warrant, classes }) => {
    if (!warrant) {
        return <LoadingSpinner />;
    }

    return (
        <React.Fragment>
            {warrant.details && (
                <Grid container className={classes.root} spacing={32}>
                    <Grid item lg={2} xs={12}>
                        <Typography>
                            Valid from: {warrant.validFrom || 'Unknown date'}
                        </Typography>
                    </Grid>
                    <Grid item lg={2} xs={12}>
                        <Typography>
                            Valid to: {warrant.validFrom || 'Unknown date'}
                        </Typography>
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <Typography>
                            {warrant.details || 'No details'}
                        </Typography>
                    </Grid>
                </Grid>
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(WarrantRead);
