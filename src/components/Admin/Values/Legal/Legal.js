import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EditableItems from '../../EditableItems';
import withInsuranceStatuses from './InsuranceStatuses/withInsuranceStatuses';
import withLicenceStatuses from './LicenceStatuses/withLicenceStatuses';
import withLicenceTypes from './LicenceTypes/withLicenceTypes';
import withCharges from './Charges/withCharges';
import withCrud from '../../withCrud';

const InsuranceStatuses = withInsuranceStatuses(withCrud(EditableItems));
const LicenceStatuses = withLicenceStatuses(withCrud(EditableItems));
const LicenceTypes = withLicenceTypes(withCrud(EditableItems));
const Charges = withCharges(withCrud(EditableItems));

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    pageHead: {
        color: theme.palette.primary.darkShade,
        paddingBottom: theme.spacing.unit * 4
    }
});

const Citizens = props => {
    const { classes } = props;
    return (
        <Grid container className={classes.root} spacing={40}>
            <Grid item lg={12} xs={12}>
                <Typography
                    align="center"
                    className={classes.pageHead}
                    variant="h2"
                    component="h2"
                >
                    Legal values
                </Typography>
            </Grid>
            <Grid item lg={3} xs={12}>
                <Typography variant="h4" gutterBottom>
                    Insurance statuses
                </Typography>
                <InsuranceStatuses />
            </Grid>
            <Grid item lg={3} xs={12}>
                <Typography variant="h4" gutterBottom>
                    Licence statuses
                </Typography>
                <LicenceStatuses />
            </Grid>
            <Grid item lg={3} xs={12}>
                <Typography variant="h4" gutterBottom>
                    Licence types
                </Typography>
                <LicenceTypes />
            </Grid>
            <Grid item lg={3} xs={12}>
                <Typography variant="h4" gutterBottom>
                    Charges
                </Typography>
                <Charges />
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(Citizens);
