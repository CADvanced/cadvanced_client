import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import { ALL_CITIZEN_VEHICLES_BRIEF } from '../../../../graphql/Citizens/queries';
import {
    VEHICLE_ADDED,
    VEHICLE_UPDATED,
    VEHICLE_DELETED,
    MARKER_ATTACHED_TO_VEHICLE,
    MARKER_DETACHED_FROM_VEHICLE
} from '../../../../graphql/Vehicles/subscriptions';
import Vehicle from './Vehicle';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    panel: {
        ...theme.mixins.gutters()
    }
});

const empty = {
    colour: '',
    licencePlate: '',
    VehicleModelId: null,
    InsuranceStatusId: null
};

const CitizenVehicles = ({ classes, doSave, updateSaved, citizen }) => {
    const [vehicles, setVehicles] = useState([]);

    const { data, subscribeToMore, refetch } = useQuery(
        ALL_CITIZEN_VEHICLES_BRIEF,
        {
            variables: { CitizenId: citizen.id },
            skip: !citizen.id
        }
    );

    // If an update comes from the API, update our local state
    useEffect(() => {
        if (data && data.hasOwnProperty('allCitizenVehicles')) {
            setVehicles([...data.allCitizenVehicles, empty]);
        }
    }, [data]);

    useEffect(() => {
        if (doSave === 'Vehicles') {
            updateSaved(true);
        }
    }, [doSave]);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: VEHICLE_ADDED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: VEHICLE_UPDATED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: VEHICLE_DELETED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: MARKER_ATTACHED_TO_VEHICLE,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: MARKER_DETACHED_FROM_VEHICLE,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <Grid container justify="center" className={classes.root}>
            <Grid item xs={12}>
                <Paper className={classes.panel}>
                    {vehicles &&
                        vehicles.map((vehicle, idx) => (
                            <React.Fragment key={idx}>
                                <Vehicle vehicle={vehicle} citizen={citizen} />
                                <Divider />
                            </React.Fragment>
                        ))}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(CitizenVehicles);
