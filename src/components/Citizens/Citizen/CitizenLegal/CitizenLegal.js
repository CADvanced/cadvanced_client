import React, { useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Offences from '../../../Legal/Offences';

const styles = theme => ({
    root: {
        flexGrow: 1,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    }
});

const CitizenLegal = ({ classes, doSave, updateSaved, citizen }) => {
    useEffect(() => {
        if (doSave === 'Legal') {
            updateSaved(true);
        }
    }, [doSave]);

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item lg={12} xs={12}>
                <Offences citizen={citizen} />
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(CitizenLegal);
