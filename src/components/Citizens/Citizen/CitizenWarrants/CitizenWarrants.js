import React, { useState, useEffect, useContext } from 'react';

import { useQuery } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { ALL_CITIZEN_WARRANTS_BRIEF } from '../../../../graphql/Citizens/queries';
import {
    WARRANT_ADDED,
    WARRANT_UPDATED,
    WARRANT_DELETED
} from '../../../../graphql/Warrants/subscriptions';
import WarrantEdit from './WarrantEdit';
import WarrantRead from './WarrantRead';
import { AppContext } from '../../../../hoc/ContextProvider';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    panel: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    noWarrants: {
        textAlign: 'center',
        margin: theme.spacing.unit * 2,
        color: theme.palette.primary.darkShade
    }
});

const empty = {
    validFrom: '',
    validTo: '',
    details: ''
};

const CitizenWarrants = ({ classes, doSave, updateSaved, citizen }) => {
    const [warrants, setWarrants] = useState([]);

    const context = useContext(AppContext);

    const { data, subscribeToMore, refetch } = useQuery(
        ALL_CITIZEN_WARRANTS_BRIEF,
        {
            variables: { CitizenId: citizen.id },
            skip: !citizen.id
        }
    );

    // If an update comes from the API, update our local state
    useEffect(() => {
        if (data && data.hasOwnProperty('allCitizenWarrants')) {
            setWarrants([...data.allCitizenWarrants, empty]);
        }
    }, [data]);

    useEffect(() => {
        if (doSave === 'Warrants') {
            updateSaved(true);
        }
    }, [doSave]);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: WARRANT_ADDED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: WARRANT_UPDATED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: WARRANT_DELETED,
            updateQuery: prev => {
                refetch();
                return prev;
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <React.Fragment>
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
                        <Paper className={classes.panel}>
                            {warrants &&
                                warrants.map((warrant, idx) => (
                                    <WarrantEdit
                                        key={idx}
                                        warrant={warrant}
                                        citizen={citizen}
                                    />
                                ))}
                        </Paper>
                    </Grid>
                )}
                {!context.userHasRoles([
                    'OWN_CITIZENS_RECORD',
                    'CITIZEN_MGR'
                ]) && (
                    <Grid item lg={12} xs={12}>
                        {warrants && warrants.length > 1 && (
                            <Paper className={classes.panel}>
                                {warrants.map((warrant, idx) => (
                                    <WarrantRead
                                        key={idx}
                                        warrant={warrant}
                                        citizen={citizen}
                                    />
                                ))}
                            </Paper>
                        )}
                        {warrants.length === 1 && (
                            <Typography
                                className={classes.noWarrants}
                                variant="h4"
                                component="h4"
                                gutterBottom
                            >
                                No active warrants
                            </Typography>
                        )}
                    </Grid>
                )}
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(CitizenWarrants);
