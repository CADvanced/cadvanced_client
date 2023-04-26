import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EditableUsers from './EditableUsers';
import withUsers from './withUsers';
import withCrud from '../withCrud';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    }
});

const Users = withUsers(withCrud(EditableUsers));

const UserManagement = props => {
    const { classes } = props;
    return (
        <Grid container justify="center" className={classes.root} spacing={40}>
            <Grid item lg={12} xs={12}>
                <Typography
                    align="center"
                    className={classes.pageHead}
                    variant="h2"
                    component="h2"
                >
                    User management
                </Typography>
            </Grid>
            <Grid item>
                <Users />
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(UserManagement);
