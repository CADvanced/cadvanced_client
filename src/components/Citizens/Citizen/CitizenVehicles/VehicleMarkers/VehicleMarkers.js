import React, { useContext } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MarkersEdit from './MarkersEdit';
import MarkersRead from './MarkersRead';
import { AppContext } from '../../../../../hoc/ContextProvider';

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing.unit / 2
    },
    noMarkers: {
        textAlign: 'center',
        margin: theme.spacing.unit * 2,
        color: theme.palette.primary.darkShade
    }
});

const VehicleMarkers = ({ classes, vehicle }) => {
    const context = useContext(AppContext);

    return (
        <React.Fragment>
            {vehicle.markers && (
                <Grid
                    container
                    justify="center"
                    className={classes.root}
                    spacing={40}
                >
                    {context.userHasRoles([
                        'OWN_CITIZENS_RECORD',
                        'CITIZEN_MGR'
                    ]) && (
                        <Grid item lg={12} xs={12}>
                            <MarkersEdit
                                markers={vehicle.markers}
                                vehicle={vehicle}
                            />
                        </Grid>
                    )}
                    {!context.userHasRoles([
                        'OWN_CITIZENS_RECORD',
                        'CITIZEN_MGR'
                    ]) &&
                        vehicle.markers.length > 0 && (
                            <Grid item lg={12} xs={12}>
                                <MarkersRead markers={vehicle.markers} />
                            </Grid>
                        )}
                </Grid>
            )}
        </React.Fragment>
    );
};

export default withStyles(styles)(VehicleMarkers);
