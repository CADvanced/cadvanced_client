import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    }
});

const AdminFront = ({ classes }) => {
    return (
        <Typography
            align="center"
            className={classes.pageHead}
            variant="h2"
            component="h2"
        >
            Admin
        </Typography>
    );
};

export default withStyles(styles)(AdminFront);
