import React, { useState, useEffect, createRef } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

import withContext from '../../hoc/ContextConsumer';
import Citizen from './Citizen/Citizen';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { GET_USER_CITIZENS } from '../../graphql/Citizens/queries';
import { SET_CHARACTER } from '../../graphql/Character/mutations';
import { CHARACTER_ACTIVE_UPDATED } from '../../graphql/Character/subscriptions';
import {
    CITIZEN_ADDED,
    CITIZEN_UPDATED,
    CITIZEN_DELETED
} from '../../graphql/Citizens/subscriptions';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 5,
        flexGrow: 1
    },
    headerPad: {
        height: theme.spacing.unit * 2
    },
    pageHead: {
        color: theme.palette.primary.darkShade
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing.unit * 6,
        right: theme.spacing.unit * 6,
        zIndex: 1100
    },
    noCitizens: {
        textAlign: 'center',
        marginTop: theme.spacing.unit * 10,
        color: theme.palette.primary.darkShade
    }
});

const empty = {
    address: '',
    dateOfBirth: '',
    EthnicityId: null,
    eyes: '',
    firstName: '',
    GenderId: null,
    hair: '',
    height: '',
    lastName: '',
    postalCode: '',
    weight: ''
};

const Citizens = props => {
    const { classes, context } = props;

    if (!context.userSession.id) {
        return <LoadingSpinner />;
    }

    const [setCharacter] = useMutation(SET_CHARACTER);
    const { loading, data, subscribeToMore, refetch } = useQuery(
        GET_USER_CITIZENS,
        {
            variables: { UserId: context.userSession.id }
        }
    );

    const [citizens, setCitizens] = useState([]);
    const [expanded, setExpanded] = useState();
    const [addedNew, setAddedNew] = useState(false);

    // Subscribe to active updates, so our cache gets updated
    useSubscription(CHARACTER_ACTIVE_UPDATED);

    const refs = citizens.reduce((acc, value, idx) => {
        acc[idx] = createRef();
        return acc;
    }, {});

    useEffect(() => {
        setCitizens(data ? data.getUserCitizens : []);
    }, [data]);

    [CITIZEN_ADDED, CITIZEN_UPDATED, CITIZEN_DELETED].forEach(query => {
        useEffect(() => {
            const unsubscribe = subscribeToMore({
                document: query,
                updateQuery: prev => {
                    refetch();
                    return prev;
                }
            });
            return () => unsubscribe();
        }, []);
    });

    useEffect(() => {
        if (addedNew) {
            refs[citizens.length - 1].current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setAddedNew(false);
        }
    }, [addedNew]);

    const addEmpty = () => {
        if (citizens.length === 0 || citizens[0].hasOwnProperty('id')) {
            const oldCitizens = [...citizens];
            oldCitizens.push(empty);
            setCitizens(oldCitizens);
            setExpanded(citizens.length);
            setAddedNew(true);
        }
    };

    const removeIncomplete = idx => {
        let toSet = [...citizens];
        toSet.splice(idx, 1);
        setCitizens(toSet);
    };

    const updateActive = id => {
        const current = citizens.find(cit => cit.id === id);
        if (current) {
            const newState = !current.active;
            return setCharacter({
                variables: { type: 'citizen', id: id, active: newState }
            });
        }
    };

    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            <Fab
                onClick={addEmpty}
                color="secondary"
                aria-label="add"
                className={classes.fab}
            >
                <AddIcon />
            </Fab>
            <Grid
                container
                className={classes.pageHead}
                spacing={32}
                justify="center"
                direction="row"
                alignItems="center"
            >
                <Grid className={classes.headerPad} item lg={12} xs={12}></Grid>
                <Grid item>
                    <AccessibilityNewIcon fontSize="large" />
                </Grid>
                <Grid item>
                    <Typography
                        className={classes.pageHead}
                        variant="h2"
                        component="h2"
                    >
                        Manage my citizens
                    </Typography>
                </Grid>
            </Grid>
            {loading && <LoadingSpinner />}
            {data && citizens.length === 0 && (
                <Typography
                    className={classes.noCitizens}
                    variant="h3"
                    component="h3"
                    gutterBottom
                >
                    You've got no citizens defined :-(
                </Typography>
            )}
            {citizens.length > 0 && (
                <div className={classes.root}>
                    {citizens.map((citizen, idx) => (
                        <div ref={refs[idx]} key={idx}>
                            <Citizen
                                updateActive={updateActive}
                                ref={refs[idx]}
                                empty={empty}
                                expanded={expanded}
                                setExpanded={setExpanded}
                                removeIncomplete={removeIncomplete}
                                idx={idx}
                                selectActive={true}
                                citizen={citizen}
                            />
                        </div>
                    ))}
                </div>
            )}
        </Typography>
    );
};

export default withStyles(styles)(withContext(Citizens));
