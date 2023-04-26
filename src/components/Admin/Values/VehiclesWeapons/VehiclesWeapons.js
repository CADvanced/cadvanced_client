import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import EditableItems from '../../EditableItems';
import withVehicleModels from './VehicleModels/withVehicleModels';
import withWeaponTypes from './WeaponTypes/withWeaponTypes';
import withWeaponStatuses from './WeaponStatuses/withWeaponStatuses';
import withVehicleMarkers from '../Citizens/Markers/withVehicleMarkers';
import withCrud from '../../withCrud';

const VehicleModels = withVehicleModels(withCrud(EditableItems));
const WeaponTypes = withWeaponTypes(withCrud(EditableItems));
const WeaponStatuses = withWeaponStatuses(withCrud(EditableItems));
const VehicleMarkers = withVehicleMarkers(withCrud(EditableItems));

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
        <React.Fragment>
            <Grid container className={classes.root} spacing={40}>
                <Grid item lg={12} xs={12}>
                    <Typography
                        align="center"
                        className={classes.pageHead}
                        variant="h2"
                        component="h2"
                    >
                        Vehicle & weapon values
                    </Typography>
                </Grid>
            </Grid>
            <Grid container className={classes.root} spacing={40}>
                <Grid item lg={3} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Weapon types
                    </Typography>
                    <WeaponTypes />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Weapon statuses
                    </Typography>
                    <WeaponStatuses />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Vehicle models
                    </Typography>
                    <VehicleModels />
                </Grid>
                <Grid item lg={3} xs={12}>
                    <Typography variant="h4" gutterBottom>
                        Vehicle markers
                    </Typography>
                    <VehicleMarkers />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(Citizens);
