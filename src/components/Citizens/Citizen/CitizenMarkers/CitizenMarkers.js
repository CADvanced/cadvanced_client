import React, { useState, useEffect, useContext } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { ALL_CITIZENS_MARKERS } from '../../../../graphql/Citizens/queries';
import {
    MARKER_ATTACHED_TO_CITIZEN,
    MARKER_DETACHED_FROM_CITIZEN
} from '../../../../graphql/Citizens/subscriptions';
import MarkersEdit from './MarkersEdit';
import MarkersRead from './MarkersRead';
import { AppContext } from '../../../../hoc/ContextProvider';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    panel: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    noMarkers: {
        textAlign: 'center',
        margin: theme.spacing.unit * 2,
        color: theme.palette.primary.darkShade
    }
});

const CitizenMarkers = ({ classes, doSave, updateSaved, citizen }) => {
    const [citizensMarkers, setCitizensMarkers] = useState([]);

    const context = useContext(AppContext);

    const { data, subscribeToMore, refetch } = useQuery(ALL_CITIZENS_MARKERS, {
        variables: { id: citizen.id },
        skip: !citizen.id
    });

    // If an update comes from the API, update our local state
    useEffect(() => {
        if (data && data.hasOwnProperty('allCitizensMarkers')) {
            setCitizensMarkers(data.allCitizensMarkers);
        }
    }, [data]);

    useEffect(() => {
        if (doSave === 'Citizen markers') {
            updateSaved(true);
        }
    }, [doSave]);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: MARKER_ATTACHED_TO_CITIZEN,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: MARKER_DETACHED_FROM_CITIZEN,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <Grid container justify="center" className={classes.root} spacing={40}>
            {context.userHasRoles(['OWN_CITIZENS_RECORD', 'CITIZEN_MGR']) && (
                <Grid item lg={12} xs={12}>
                    <Paper className={classes.panel}>
                        {citizensMarkers && (
                            <MarkersEdit
                                markers={citizensMarkers}
                                citizen={citizen}
                            />
                        )}
                    </Paper>
                </Grid>
            )}
            {!context.userHasRoles(['OWN_CITIZENS_RECORD', 'CITIZEN_MGR']) && (
                <Grid item lg={12} xs={12}>
                    {citizensMarkers && citizensMarkers.length > 0 && (
                        <Paper className={classes.panel}>
                            <MarkersRead markers={citizensMarkers} />
                        </Paper>
                    )}
                    {citizensMarkers.length === 0 && (
                        <Typography
                            className={classes.noMarkers}
                            variant="h4"
                            component="h4"
                            gutterBottom
                        >
                            No markers
                        </Typography>
                    )}
                </Grid>
            )}
        </Grid>
    );
};

export default withStyles(styles)(CitizenMarkers);
