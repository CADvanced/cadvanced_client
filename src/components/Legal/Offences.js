import React, { useState, useEffect, useContext } from 'react';

import { useQuery, useSubscription } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Offence from './Offence';
import { AppContext } from '../../hoc/ContextProvider';

import { GET_CITIZEN_OFFENCES } from '../../graphql/Citizens/queries';
import { GET_OFFENCE } from '../../graphql/Offences/queries';
import {
    OFFENCE_ADDED,
    OFFENCE_UPDATED,
    OFFENCE_DELETED
} from '../../graphql/Offences/subscriptions';
import {
    TICKET_ADDED,
    TICKET_UPDATED,
    TICKET_DELETED
} from '../../graphql/Tickets/subscriptions';
import {
    ARREST_ADDED,
    ARREST_UPDATED,
    ARREST_DELETED
} from '../../graphql/Arrests/subscriptions';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    panel: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    cleanRecord: {
        textAlign: 'center',
        margin: theme.spacing.unit * 2,
        color: theme.palette.primary.darkShade
    },
    addOffence: {
        textAlign: 'right',
        margin: theme.spacing.unit * 2
    }
});

const Offences = ({ classes, doSave, updateSaved, citizen }) => {
    const [offences, setOffences] = useState([]);

    const context = useContext(AppContext);

    const empty = {
        date: '',
        time: '',
        location: '',
        ArrestId: null,
        arrest: null,
        charges: [],
        TicketId: null,
        ticket: null,
        CitizenId: citizen.id
    };

    const addNew = () => {
        setOffences([...offences, empty]);
    };

    // Query to get all offences
    const { data, subscribeToMore, refetch } = useQuery(GET_CITIZEN_OFFENCES, {
        variables: { id: citizen.id },
        skip: !citizen.id
    });

    // If an update comes from the API, update our local state
    useEffect(() => {
        if (data && data.hasOwnProperty('getCitizen')) {
            setOffences(data.getCitizen.offences);
        }
    }, [data]);

    useEffect(() => {
        if (doSave === 'Offences') {
            updateSaved(true);
        }
    }, [doSave]);

    // Subscriptions from which we should repopulate all offences
    [OFFENCE_ADDED, OFFENCE_DELETED].forEach(sub =>
        useEffect(() => {
            const unsubscribe = subscribeToMore({
                document: sub,
                updateQuery: prev => {
                    refetch();
                    return prev;
                }
            });
            return () => unsubscribe();
        }, [])
    );

    // Set up a query to be only used for refetching an offence when
    // we receive a subscription telling us it has changed
    const { refetch: offenceRefetch } = useQuery(GET_OFFENCE, {
        skip: true
    });

    // If an offence itself is updated, refetch
    useSubscription(OFFENCE_UPDATED, {
        onSubscriptionData: ({ subscriptionData }) => {
            offenceRefetch({
                id: subscriptionData.data.offenceUpdated.id
            });
        },
        fetchPolicy: 'network-only'
    });

    // Subscriptions from which we should repopulate an offence
    [
        { query: TICKET_ADDED, subProp: 'ticketAdded' },
        { query: TICKET_UPDATED, subProp: 'ticketUpdated' },
        { query: TICKET_DELETED, subProp: 'ticketDeleted' },
        { query: ARREST_ADDED, subProp: 'arrestAdded' },
        { query: ARREST_UPDATED, subProp: 'arrestUpdated' },
        { query: ARREST_DELETED, subProp: 'arrestDeleted' }
    ].forEach(sub => {
        useSubscription(sub.query, {
            onSubscriptionData: ({ subscriptionData }) => {
                offenceRefetch({
                    id: subscriptionData.data[sub.subProp].OffenceId
                });
            },
            fetchPolicy: 'network-only'
        });
    });

    return (
        <React.Fragment>
            {(!offences || offences.length === 0) && (
                <React.Fragment>
                    <Typography
                        className={classes.cleanRecord}
                        variant="h4"
                        component="h4"
                        gutterBottom
                    >
                        Clean record - impressive :-)
                    </Typography>
                    {context.userHasRoles([
                        'OWN_CITIZENS_RECORD',
                        'CITIZEN_MGR'
                    ]) && (
                            <Grid container className={classes.root}>
                                <Grid
                                    className={classes.cleanRecord}
                                    item
                                    md={12}
                                    xs={12}
                                >
                                    <Button
                                        onClick={addNew}
                                        variant="contained"
                                    >
                                        Add first offence
                                </Button>
                                </Grid>
                            </Grid>
                        )}
                </React.Fragment>
            )}
            {context.userHasRoles(['OWN_CITIZENS_RECORD', 'CITIZEN_MGR']) &&
                offences &&
                offences.length > 0 && (
                    <Grid container className={classes.root}>
                        <Grid
                            className={classes.addOffence}
                            item
                            md={12}
                            xs={12}
                        >
                            <Button
                                onClick={addNew}
                                variant="contained"
                            >
                                Add another offence
                            </Button>
                        </Grid>
                    </Grid>
                )}
            {offences &&
                offences.length > 0 &&
                offences.map((offence, idx) => (
                    <React.Fragment key={idx}>
                        <Offence offence={offence} citizen={citizen} />
                    </React.Fragment>
                ))}
        </React.Fragment>
    );
};

export default withStyles(styles)(Offences);
